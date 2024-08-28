import React, { useState } from "react";
import { ProcessModelCard } from "./components/Card";
import { Container, Text } from "@component-library/index";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/index";
import { ProcessModelPreView } from "./components/PreView";
import { Heading } from "@component-library/index";
import { Modal } from "@component-library/index";
import { ModelProps } from "./types";
import { ProcessModelUpload } from "./Upload/Upload";
import useGetModels from "@/api/Service/AdditiveManufacturing/Model/Querys/useGetModels";
import ServiceSearch from "../Search/Search";

interface Props {}

interface State {
  modalOpen: boolean;
  model: ModelProps | undefined;
}

export const ManufacturingModels: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const navigate = useNavigate();

  const modelsQuery = useGetModels();
  const [searchText, setSearchText] = useState<string>("");
  const [state, setState] = useState<State>({
    modalOpen: false,
    model: undefined,
  });

  const { projectID, processID } = useParams();

  const closeModal = () => {
    navigate(`/projects/${projectID}/${processID}`);
  };

  const openModelView = (model: ModelProps) => {
    setState((prevState) => ({ ...prevState, modalOpen: true, model }));
  };

  const closeModelView = () => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
      model: undefined,
    }));
  };

  const filterBySearch = (model: ModelProps): boolean => {
    if (searchText === "") {
      return true;
    }
    if (
      model.fileName.toLocaleLowerCase().includes(searchText) ||
      model.tags.filter((tag) => tag.toLocaleLowerCase().includes(searchText))
        .length > 0 ||
      model.certificates.filter((certificate) =>
        certificate.toLocaleLowerCase().includes(searchText)
      ).length > 0 ||
      model.licenses.filter((certificate) =>
        certificate.toLocaleLowerCase().includes(searchText)
      ).length > 0
    )
      return true;
    return false;
  };

  // const handleOnButtonClickEdit = (index: number) => {
  //   navigate(
  //     `edit/${
  //       models !== undefined && models.length > 0 ? models[index].id : ""
  //     }`
  //   );
  // };

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
        <ServiceSearch searchText={searchText} setSearchText={setSearchText} />
        <Container direction="col" width="full">
          <ProcessModelUpload />
          <Container width="full" direction="col">
            <Heading variant="h2" className="w-full text-left">
              {t("Service.Manufacturing.Model.Model.available")}
            </Heading>
            <LoadingSuspense query={modelsQuery}>
              {modelsQuery.data !== undefined && modelsQuery.data.length > 0 ? (
                <>
                  {modelsQuery.data
                    .filter((model) => filterBySearch(model))
                    .map((model: ModelProps, index: number) => (
                      <ProcessModelCard
                        model={model}
                        key={index}
                        openModelView={openModelView}
                      />
                    ))}
                </>
              ) : (
                <Text className="w-full text-center">
                  {t("Service.Manufacturing.Model.Model.error.noModels")}
                </Text>
              )}
            </LoadingSuspense>
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
