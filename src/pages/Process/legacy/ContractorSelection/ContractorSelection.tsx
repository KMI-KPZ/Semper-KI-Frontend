import React, { useReducer } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button, Divider } from "@component-library/index";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Heading, Text } from "@component-library/index";
import { useForm } from "react-hook-form";
import { Container } from "@component-library/index";
import ProjectContractorSelectionItem from "./components/ContractorItem";
import AddressForm from "@/components/Form/AddressForm";
import { Modal } from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { UserAddressProps } from "@/hooks/useUser";
import AddressCard from "@/components/Address/AddressCard";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import { useProject } from "@/hooks/Project/useProject";

interface Props {}

export interface ContractorSelectionFormData {
  processes: {
    process: Process;
    contractorID: string;
  }[];
}

type ContractorSelectionReducerActionType =
  | "SET_DELIVER_ADDRESS"
  | "SET_BILLING_ADDRESS"
  | "SET_ADDRESSES_EQUAL"
  | "SET_EDIT";

interface ActionTemplate<T extends ContractorSelectionReducerActionType, P> {
  type: T;
  payload: P;
}

type SetDeliverAddressAction = ActionTemplate<
  "SET_DELIVER_ADDRESS",
  { address: UserAddressProps }
>;
type SetBillingAddressAction = ActionTemplate<
  "SET_BILLING_ADDRESS",
  { address: UserAddressProps }
>;
type SetAddressesEqualAction = ActionTemplate<
  "SET_ADDRESSES_EQUAL",
  { addressesEqual: boolean }
>;
type SetEditAction = ActionTemplate<"SET_EDIT", { edit: boolean }>;

type ContractorSelectionAction =
  | SetDeliverAddressAction
  | SetBillingAddressAction
  | SetAddressesEqualAction
  | SetEditAction;

interface ContractorSelectionState {
  deliverAddress: UserAddressProps | undefined;
  billingAddress: UserAddressProps | undefined;
  addressesEqual: boolean;
  edit: boolean;
}

const stateReducer = (
  state: ContractorSelectionState,
  action: ContractorSelectionAction
): ContractorSelectionState => {
  switch (action.type) {
    case "SET_DELIVER_ADDRESS":
      return {
        ...state,
        deliverAddress: action.payload.address,
      };
    case "SET_BILLING_ADDRESS":
      return {
        ...state,
        billingAddress: action.payload.address,
      };
    case "SET_ADDRESSES_EQUAL":
      return {
        ...state,
        addressesEqual: action.payload.addressesEqual,
      };
    case "SET_EDIT":
      return {
        ...state,
        edit: action.payload.edit,
      };
    default:
      return state;
  }
};

const ProjectContractorSelection: React.FC<Props> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const { project } = useProject();
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const updateProcess = useUpdateProcess();

  const initialState: ContractorSelectionState = {
    deliverAddress:
      user.details.addresses === undefined
        ? undefined
        : user.details.addresses.find((address) => address.standard === true),
    billingAddress:
      user.details.addresses === undefined
        ? undefined
        : user.details.addresses.find((address) => address.standard === true),
    addressesEqual: true,
    edit: false,
  };

  const [{ addressesEqual, billingAddress, deliverAddress, edit }, dispatch] =
    useReducer(stateReducer, initialState);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContractorSelectionFormData>({
    defaultValues: async () => ({
      processes: [],
    }),
  });

  const onSubmit = (data: ContractorSelectionFormData) => {
    data.processes.forEach((process) => {
      updateProcess.mutate({
        processIDs: [process.process.processID],
        updates: {
          changes: {
            processStatus: ProcessStatus.CONTRACTOR_COMPLETED,
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
    dispatch({
      type: "SET_DELIVER_ADDRESS",
      payload: {
        address: address,
      },
    });
  };

  const handleOnClickCardBillingAddress = (address: UserAddressProps) => {
    dispatch({
      type: "SET_BILLING_ADDRESS",
      payload: {
        address: address,
      },
    });
  };

  const handleOnChangeAddressEqual = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    dispatch({
      type: "SET_ADDRESSES_EQUAL",
      payload: {
        addressesEqual: event.target.checked,
      },
    });
  };

  return (
    <>
      <form className="flex w-full flex-col items-center gap-5">
        <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
          <Heading variant="h1">
            {t(
              "Projects.Project.ContractorSelection.ContractorSelection.heading"
            )}
          </Heading>
        </div>

        <Container className="bg-white p-5" width="full" direction="col">
          <Container direction="auto" justify="between" width="full">
            <Heading variant="h2">
              {t(
                addressesEqual === true
                  ? "Projects.Project.ContractorSelection.ContractorSelection.address.heading"
                  : "Projects.Project.ContractorSelection.ContractorSelection.address.headingDeliver"
              )}
            </Heading>
            <Container>
              <label
                htmlFor="addressEqual"
                className="flex flex-row items-center justify-center gap-3 hover:cursor-pointer"
              >
                <input
                  type="checkbox"
                  id="addressEqual"
                  checked={addressesEqual}
                  className="h-4 w-4"
                  onChange={handleOnChangeAddressEqual}
                />
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
                  dispatch({
                    type: "SET_EDIT",
                    payload: {
                      edit: true,
                    },
                  });
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
            {user.details.addresses !== undefined &&
            user.details.addresses.length > 0 ? (
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
                  "Projects.Project.ContractorSelection.ContractorSelection.address.headingBilling"
                )}
              </Heading>
              <Container direction="auto">
                <Button
                  onClick={() => {
                    dispatch({
                      type: "SET_EDIT",
                      payload: {
                        edit: true,
                      },
                    });
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
            {user.details.addresses !== undefined &&
            user.details.addresses.length > 0 ? (
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
            ? project.processes.map((process, index) => (
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
          dispatch({
            type: "SET_EDIT",
            payload: {
              edit: false,
            },
          });
        }}
      >
        <AddressForm
          closeModal={() => {
            dispatch({
              type: "SET_EDIT",
              payload: {
                edit: false,
              },
            });
          }}
        />
      </Modal>
    </>
  );
};

export default ProjectContractorSelection;
