import React, { useState } from "react";
import { ProcessModelCard } from "./components/Card";
import { Container, Search, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProcessModelPreView } from "./components/PreView";
import { Heading } from "@component-library/index";
import { Modal } from "@component-library/index";
import { ProcessModelUpload } from "./Upload/Upload";
import useGetRepositoryModels, {
  RepositoryModel,
} from "@/api/Service/AdditiveManufacturing/Model/Querys/useGetRepositoryModels";
import useSearch from "@/hooks/useSearch";
import { ProcessModel } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import useModal from "@/hooks/useModal";

interface Props {}

interface State {
  modalOpen: boolean;
  model: ProcessModel | undefined;
}

export const ManufacturingModels: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const navigate = useNavigate();

  const repositoryModels = useGetRepositoryModels();
  const { deleteModal } = useModal();
  const [state, setState] = useState<State>({
    modalOpen: false,
    model: undefined,
  });

  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<RepositoryModel>();

  const { process } = useProcess();
  const { project } = useProject();

  const closeModal = () => {
    deleteModal("ServiceRoutesManufacturingModels");
    navigate(`/projects/${project.projectID}/${process.processID}`);
  };

  const openModelView = (model: ProcessModel) => {
    setState((prevState) => ({ ...prevState, modalOpen: true, model }));
  };

  const closeModelView = () => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
      model: undefined,
    }));
  };

  return (
    <Modal
      modalKey="ServiceRoutesManufacturingModels"
      open={true}
      closeModal={closeModal}
      className=""
    >
      <Container
        width="none"
        direction="col"
        justify="start"
        className="h-full w-screen max-w-6xl p-5 pt-14 "
      >
        {/* <ServiceSearch searchText={searchText} setSearchText={setSearchText} /> */}
        <Container direction="col" width="full">
          <ProcessModelUpload />
          <Container width="full" direction="col">
            <Heading variant="h2" className="w-full text-left">
              {t(
                "Process.components.Service.ServiceEdit.Manufacturing.Model.available"
              )}
            </Heading>
            <Search handleSearchInputChange={handleSearchInputChange} />
            <Container direction="row" wrap="wrap" width="full">
              {repositoryModels.data !== undefined &&
              repositoryModels.data.length > 0 ? (
                <>
                  {repositoryModels.data
                    .filter((model) => filterDataBySearchInput(model))
                    .map((model: RepositoryModel, index: number) => (
                      <ProcessModelCard
                        model={model}
                        key={index}
                        openModelView={openModelView}
                        closeModal={closeModal}
                      />
                    ))}
                </>
              ) : (
                <Text className="w-full text-center">
                  {t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.error.noModels"
                  )}
                </Text>
              )}
            </Container>
          </Container>
          {state.modalOpen === true && state.model !== undefined ? (
            <Modal
              modalKey="ProcessModelPreView"
              open={state.modalOpen === true && state.model !== undefined}
              closeModal={closeModelView}
            >
              {state.model !== undefined ? (
                <ProcessModelPreView
                  model={state.model}
                  closeModelView={closeModelView}
                />
              ) : null}
            </Modal>
          ) : null}
        </Container>
      </Container>
    </Modal>
  );
};
