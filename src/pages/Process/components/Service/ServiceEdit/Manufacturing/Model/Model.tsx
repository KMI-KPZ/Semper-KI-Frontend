import React, { useState } from "react";
import { ProcessModelCard } from "./components/Card";
import { Button, Container, Search, Text } from "@component-library/index";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ProcessModelPreView } from "./components/PreView";
import { Heading } from "@component-library/index";
import { Modal } from "@component-library/index";
import { ProcessModelUpload } from "./Upload/Upload";
import useGetModels, {
  RepositoryModel,
} from "@/api/Service/AdditiveManufacturing/Model/Querys/useGetModels";
import useSearch from "@/hooks/useSearch";
import useDownloadFile from "@/api/Process/Files/Mutations/useDownloadFile";
import { ProcessModel } from "@/api/Process/Querys/useGetProcess";
// import useUploadModels from "@/api/Service/AdditiveManufacturing/Model/Mutations/useUploadModels";
// import useDownloadExternalFile from "@/api/Process/Files/Mutations/useDownloadExternalFile";

interface Props {}

interface State {
  modalOpen: boolean;
  model: ProcessModel | undefined;
}

export const ManufacturingModels: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const navigate = useNavigate();

  const modelsQuery = useGetModels();
  // const uploadModel = useUploadModels();
  const [state, setState] = useState<State>({
    modalOpen: false,
    model: undefined,
  });

  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<RepositoryModel>();

  const downloadFile = useDownloadFile();
  // const downloadExternalFile = useDownloadExternalFile();

  const { projectID, processID } = useParams();

  const closeModal = () => {
    navigate(`/projects/${projectID}/${processID}`);
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

  const handleOnClickButtonSelect = (file: string) => {
    downloadFile.mutate(
      file
      //{
      // onSuccess(data) {
      //   uploadModel.mutate({
      //     projectID,
      //     processID,
      //     origin: "Service",
      //     models: [
      //       {
      //         file: data,
      //         details: { certificates: [], licenses: [], tags: [] },
      //       },
      //     ],
      //   });
      // },
      // }
    );
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
              {modelsQuery.data !== undefined && modelsQuery.data.length > 0 ? (
                <>
                  {modelsQuery.data
                    .filter((model) => filterDataBySearchInput(model))
                    .map((model: RepositoryModel, index: number) => (
                      <ProcessModelCard
                        model={model}
                        key={index}
                        openModelView={openModelView}
                      >
                        <Button
                          title={t("general.button.select")}
                          variant="primary"
                          size="sm"
                          onClick={() => handleOnClickButtonSelect(model.file)}
                        />
                      </ProcessModelCard>
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
