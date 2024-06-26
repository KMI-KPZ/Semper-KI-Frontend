import React, { useEffect, useState } from "react";
import { ProcessModelCard } from "./components/Card";
import { Button, Container, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/index";
import { FilterItemProps } from "../Filter/Filter";
import { ProcessModelPreView } from "./components/PreView";
import ProcessModelItem from "./components/Item";
import IconUpload from "@icons/Upload.svg";
import { Heading } from "@component-library/index";
import { Modal } from "@component-library/index";
import { ModelProps } from "./types";
import { select } from "d3";
import { ProcessModelUpload } from "./Upload/Upload";
import useGetModels from "@/api/Service/AdditiveManufacturing/Model/Querys/useGetModels";
import { ServiceManufacturingState } from "@/api/Service/Querys/useGetServices";

interface Props {
  filters: FilterItemProps[];
  models: ModelProps[] | undefined;
  searchText: string;
}

interface State {
  modalOpen: boolean;
  model: ModelProps | undefined;
}

export const ManufacturingModels: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { models, searchText, filters } = props;
  const navigate = useNavigate();
  const modelsQuery = useGetModels(filters);
  const [state, setState] = useState<State>({
    modalOpen: false,
    model: undefined,
  });

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

  const handleOnButtonClickEdit = (index: number) => {
    navigate(
      `edit/${
        models !== undefined && models.length > 0 ? models[index].id : ""
      }`
    );
  };

  return (
    <Container direction="col" width="full">
      {/* {models !== undefined && models.length > 0 ? (
        <Container direction="col" width="full">
          <Heading variant="h2" className="w-full text-left">
            {t("Service.Manufacturing.Model.Model.selected")}
          </Heading>
          <Container width="full" wrap="wrap">
            {models.length > 0
              ? models
                  .filter((model, index) => filterBySearch(model))
                  .map((model: ModelProps, index: number) => {
                    return (
                      <ProcessModelCard
                        model={model}
                        key={index}
                        openModelView={openModelView}
                      >
                        <Container direction="row">
                          <Button
                            variant="secondary"
                            onClick={() => handleOnButtonClickEdit(index)}
                            title={t(
                              "Service.Manufacturing.Model.Upload.Upload.button.edit"
                            )}
                          />
                        </Container>
                      </ProcessModelCard>
                    );
                  })
              : null}
          </Container>
        </Container>
      ) : null} */}

      <Container width="full" direction="col">
        <Heading variant="h2" className="w-full text-left">
          {t("Service.Manufacturing.Model.Model.upload.title")}
        </Heading>
      </Container>
      <ProcessModelUpload />
      <Container width="full" direction="col">
        <Heading variant="h2" className="w-full text-left">
          {t("Service.Manufacturing.Model.Model.available")}
        </Heading>
        <LoadingSuspense query={modelsQuery}>
          {modelsQuery.data !== undefined && modelsQuery.data.length > 0 ? (
            <>
              {modelsQuery.data
                .filter((model, index) => filterBySearch(model))
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
  );
};
