import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@component-library/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Heading, Text } from "@component-library/Typography";
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
import Container from "@component-library/Container";
import useCheckedProcesses from "../hooks/useCheckedProcesses";
import { twMerge } from "tailwind-merge";
import useGeneralProcess from "../../hooks/useGeneralProcess";
import ProjectContractorSelectionItem from "./components/Item";
import logger from "@/hooks/useLogger";
import AddressForm from "@component-library/Form/AddressForm/AddressForm";
import Modal from "@component-library/Modal";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";

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
  const [edit, setEdit] = useState(false);

  const { updateProcess } = useGeneralProcess();

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
            },
          },
        });
      });
    navigate("..");
  };

  return (
    <form className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
        <Heading variant="h1">
          {t("Projects.Project.ContractorSelection.ContractorSelection.title")}
        </Heading>
      </div>

      <div className="flex w-full flex-col items-start  justify-start gap-5 bg-white p-5">
        <Container direction="auto" justify="between" width="full">
          <Heading variant="h2">
            {t(
              "Projects.Project.ContractorSelection.ContractorSelection.address.title"
            )}
          </Heading>
          <Button
            onClick={() => {
              setEdit(true);
            }}
            size="sm"
            variant="secondary"
            title={t(
              "Projects.Project.ContractorSelection.ContractorSelection.address.button.edit"
            )}
          />
        </Container>
        <div className="w-full border-t-2" />
        <Container direction="row" justify="start" className="flex-wrap">
          <Text className="min-w-[100px]">
            {t(
              "Projects.Project.ContractorSelection.ContractorSelection.address.name"
            )}
            :
          </Text>
          <Text>
            {user.details.address === undefined
              ? "---"
              : user.details.address.firstName +
                " " +
                user.details.address.lastName}
          </Text>
        </Container>
        <Container direction="row" justify="start" className="flex-wrap">
          <Text className="min-w-[100px]">
            {t(
              "Projects.Project.ContractorSelection.ContractorSelection.address.company"
            )}
            :
          </Text>
          <Text>
            {user.details.address === undefined
              ? "---"
              : user.details.address.company !== undefined &&
                user.details.address.company !== ""
              ? user.details.address.company
              : "  ---"}
          </Text>
        </Container>
        <Container direction="row" justify="start" className="flex-wrap">
          <Text className="min-w-[100px]">
            {t(
              "Projects.Project.ContractorSelection.ContractorSelection.address.address"
            )}
            :
          </Text>
          <Text>
            {user.details.address === undefined
              ? "---"
              : user.details.address.street +
                " " +
                user.details.address.houseNumber +
                ", " +
                user.details.address.zipcode +
                " ," +
                user.details.address.city +
                " ," +
                user.details.address.country}
          </Text>
        </Container>
      </div>

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
      <Modal
        title="ProjectInfo"
        open={edit || user.details.address === undefined}
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
    </form>
  );
};

export default ProjectContractorSelection;
