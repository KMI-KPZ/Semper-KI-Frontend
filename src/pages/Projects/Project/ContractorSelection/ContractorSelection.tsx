import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Divider } from "@component-library/index";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Heading, Text } from "@component-library/index";
import useService, { ServiceType } from "@/pages/Service/hooks/useService";
import useContractor from "../../../../api/Project/useContractorQuerys";
import useProcess, {
  ProcessProps,
  ProcessStatus,
} from "../../hooks/useProcess";
import { useProject } from "../../hooks/useProject";
import { useForm } from "react-hook-form";
import { ProjectContext } from "../../context/ProjectContext";
import ProcessInfoCard from "../components/ProcessInfoCard";
import { Container } from "@component-library/index";
import useCheckedProcesses from "../hooks/useCheckedProcesses";
import { twMerge } from "tailwind-merge";
import useGeneralProcess from "../../hooks/useGeneralProcess";
import ProjectContractorSelectionItem from "./components/ContractorItem";
import logger from "@/hooks/useLogger";
import AddressForm from "@/components/Form/AddressForm";
import { Modal } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { UserAddressProps } from "@/hooks/useUser";
import AddressCard from "@/components/Address/AddressCard";

interface Props {}

export interface ContractorSelectionFormData {
  processes: {
    process: ProcessProps;
    contractorID: string;
  }[];
}

const ProjectContractorSelection: React.FC<Props> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const { project, checkedProcesses } = useContext(ProjectContext);
  const { t } = useTranslation();
  const { isServiceComplete } = useService();
  const { user } = useAuthorizedUser();
  const { updateProcess } = useGeneralProcess();

  const [edit, setEdit] = useState(false);
  const [deliverAddress, setDeliverAddress] = useState(
    user.details.addresses.find((address) => address.standard === true)
  );
  const [billingAddress, setBillingAddress] = useState(
    user.details.addresses.find((address) => address.standard === true)
  );
  const [addressesEqual, setAddressesEqual] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ContractorSelectionFormData>({
    defaultValues: async () => ({
      processes:
        project.processes.length === 0
          ? []
          : project.processes
              .filter((process) =>
                isServiceComplete(process.serviceType, process.serviceDetails)
              )
              .map((process) => {
                return {
                  process: process,
                  contractorID: "",
                };
              }),
    }),
  });

  const onSubmit = (data: ContractorSelectionFormData) => {
    logger("onSubmit", data);

    data.processes
      .filter((process) => checkedProcesses.includes(process.process.processID))
      .forEach((process, index, allProcesses) => {
        updateProcess({
          processIDs: [process.process.processID],
          updates: {
            changes: {
              processStatus: ProcessStatus.CONTRACTOR_SELECTED,
              provisionalContractor: process.contractorID,
              processDetails: {
                clientDeliverAddress: deliverAddress,
                clientBillingAddress: addressesEqual
                  ? deliverAddress
                  : billingAddress,
              },
            },
          },
        });
      });
    navigate("..");
  };

  const handleOnClickCardDeliverAddress = (address: UserAddressProps) => {
    logger("Delivery", address);
    setDeliverAddress(address);
  };

  const handleOnClickCardBillingAddress = (address: UserAddressProps) => {
    logger("Billing", address);
    setBillingAddress(address);
  };

  const handleOnChangeAddressEqual = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressesEqual(event.target.checked);
  };

  return (
    <>
      <form className="flex w-full flex-col items-center gap-5">
        <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
          <Heading variant="h1">
            {t(
              "Projects.Project.ContractorSelection.ContractorSelection.title"
            )}
          </Heading>
        </div>

        <Container className="bg-white p-5" width="full" direction="col">
          <Container direction="auto" justify="between" width="full">
            <Heading variant="h2">
              {t(
                addressesEqual === true
                  ? "Projects.Project.ContractorSelection.ContractorSelection.address.title"
                  : "Projects.Project.ContractorSelection.ContractorSelection.address.titleDeliver"
              )}
            </Heading>
            <Container>
              <input
                type="checkbox"
                id="addressEqual"
                checked={addressesEqual}
                className="h-4 w-4"
                onChange={handleOnChangeAddressEqual}
              />
              <label htmlFor="addressEqual">
                <Text>
                  {t(
                    "Projects.Project.ContractorSelection.ContractorSelection.address.sameAddress"
                  )}
                </Text>
              </label>
            </Container>
            <Container direction="auto">
              <Button
                onClick={() => {
                  setEdit(true);
                }}
                size="sm"
                variant="secondary"
                title={t(
                  "Projects.Project.ContractorSelection.ContractorSelection.address.button.new"
                )}
              />
            </Container>
          </Container>
          <Divider />
          <Container direction="row" width="full">
            {user.details.addresses.length > 0 ? (
              user.details.addresses.map((address, index) => (
                <AddressCard
                  key={index}
                  address={address}
                  select={{
                    checked: deliverAddress?.id === address.id,
                    handleOnClickCard: handleOnClickCardDeliverAddress,
                  }}
                />
              ))
            ) : (
              <Text>
                {t(
                  "Projects.Project.ContractorSelection.ContractorSelection.address.noAddress"
                )}
              </Text>
            )}
          </Container>
        </Container>
        {addressesEqual === false ? (
          <Container className="bg-white p-5" width="full" direction="col">
            <Container direction="auto" justify="between" width="full">
              <Heading variant="h2">
                {t(
                  "Projects.Project.ContractorSelection.ContractorSelection.address.titleBilling"
                )}
              </Heading>
              <Container direction="auto">
                <Button
                  onClick={() => {
                    setEdit(true);
                  }}
                  size="sm"
                  variant="secondary"
                  title={t(
                    "Projects.Project.ContractorSelection.ContractorSelection.address.button.new"
                  )}
                />
              </Container>
            </Container>
            <Divider />
            {user.details.addresses.length > 0 ? (
              user.details.addresses.map((address, index) => (
                <AddressCard
                  key={index}
                  address={address}
                  select={{
                    checked: billingAddress?.id === address.id,
                    handleOnClickCard: handleOnClickCardBillingAddress,
                  }}
                />
              ))
            ) : (
              <Text>
                {t(
                  "Projects.Project.ContractorSelection.ContractorSelection.address.noAddress"
                )}
              </Text>
            )}
          </Container>
        ) : null}

        <div className="flex w-full flex-col items-center justify-start gap-5">
          {project.processes.length > 0
            ? project.processes
                .filter(
                  (process) =>
                    isServiceComplete(
                      process.serviceType,
                      process.serviceDetails
                    ) && process.processStatus === ProcessStatus.SERVICE_READY
                )
                .map((process, index) => (
                  <ProjectContractorSelectionItem
                    key={index}
                    process={process}
                    index={index}
                    register={register}
                    errors={errors}
                  />
                ))
            : null}
        </div>
        <Container className="bg-white p-5" width="full">
          <Button
            to=".."
            startIcon={<ArrowBackIcon />}
            title={t(
              "Projects.Project.ContractorSelection.ContractorSelection.button.overview"
            )}
          />
          <Button
            onClick={handleSubmit(onSubmit)}
            endIcon={<ArrowForwardIcon />}
            variant="primary"
            title={t(
              "Projects.Project.ContractorSelection.ContractorSelection.button.submit"
            )}
          />
        </Container>
      </form>
      <Modal
        modalKey="ProjectInfo"
        open={edit}
        closeModal={() => {
          setEdit(false);
        }}
      >
        <AddressForm
          closeModal={() => {
            setEdit(false);
          }}
        />
      </Modal>
    </>
  );
};

export default ProjectContractorSelection;
