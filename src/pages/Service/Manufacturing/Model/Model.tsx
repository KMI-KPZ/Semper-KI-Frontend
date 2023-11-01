import React, { useEffect, useState } from "react";
import { ServiceManufacturingState } from "../types/types";
import { ProcessModelCard } from "./components/Card";
import { Button } from "@component-library/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import { FilterItemProps } from "../Filter/Filter";
import { ProcessModelPreView } from "./components/PreView";
import ProcessModelItem from "./components/Item";
import IconUpload from "@icons/Upload.svg";
import { Heading } from "@component-library/Typography";
import Modal from "@component-library/Modal";
import { ModelProps } from "./types";
import { useManufacturingModelData } from "./hooks/useModel";
import { select } from "d3";
import { ProcessModelUpload } from "./components/Upload/Upload";

interface Props {
  filters: FilterItemProps[];
  processState: ServiceManufacturingState;
  model: ModelProps | undefined;
}

interface State {
  modalOpen: boolean;
  model: ModelProps | undefined;
}

export const ProcessModel: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { filters, processState, model } = props;
  const { grid, searchText } = processState;
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    modalOpen: false,
    model: undefined,
  });
  const { modelsQuery } = useManufacturingModelData(filters);
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
      model.title.toLocaleLowerCase().includes(searchText) ||
      model.tags.filter((tag) => tag.toLocaleLowerCase().includes(searchText))
        .length > 0 ||
      model.certificates.filter((certificate) =>
        certificate.toLocaleLowerCase().includes(searchText)
      ).length > 0 ||
      model.license.toLocaleLowerCase().includes(searchText)
    )
      return true;
    return false;
  };

  return model === undefined ? (
    <LoadingSuspense query={modelsQuery}>
      <div
        className={`flex gap-y-5 ${
          grid === true
            ? "flex-row flex-wrap justify-between"
            : "flex-col flex-nowrap "
        }`}
      >
        {modelsQuery.data !== undefined && modelsQuery.data.length > 0 ? (
          <>
            <ProcessModelUpload />
            {modelsQuery.data
              .filter((model, index) => filterBySearch(model))
              .map((model: ModelProps, index: number) => (
                <ProcessModelCard
                  grid={processState.grid}
                  model={model}
                  key={index}
                  openModelView={openModelView}
                />
              ))}
            <Modal
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
          </>
        ) : (
          t("Service.Manufacturing.Model.Model.error.noModels")
        )}
      </div>
    </LoadingSuspense>
  ) : (
    <ProcessModelItem model={model} />
  );
};
