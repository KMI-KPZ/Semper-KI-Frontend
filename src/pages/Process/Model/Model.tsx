import React, { useEffect, useState } from "react";
import { IProcessState } from "../types";
import { ProcessModelCard } from "./components/Card";
import { Button } from "@component-library/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useModelData } from "../hooks/useProcessData";
import { LoadingSuspense } from "@component-library/Loading";
import { IFilterItem } from "../Filter/Filter";
import { ProcessModelPreView } from "./components/PreView";
import ProcessModelItem from "./components/Item";
import IconUpload from "@icons/Upload.svg";
import { Heading } from "@component-library/Typography";
import Modal from "@component-library/Modal";
import { IModel } from "./types";

interface Props {
  filters: IFilterItem[];
  processState: IProcessState;
  selectedModel: IModel | undefined;
  selectModel(model: IModel): void;
  deselectModel(): void;
  setProgress(path: string): void;
}

interface State {
  modalOpen: boolean;
  model: IModel | undefined;
}

export const ProcessModel: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    filters,
    processState,
    selectModel,
    setProgress,
    selectedModel,
    deselectModel,
  } = props;
  const { grid, searchText } = processState;
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    modalOpen: false,
    model: undefined,
  });
  const { modelsQuery } = useModelData(filters);
  useEffect(() => {
    setProgress("model");
  }, []);
  const openModelView = (model: IModel) => {
    setState((prevState) => ({ ...prevState, modalOpen: true, model }));
  };
  const closeModelView = () => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
      model: undefined,
    }));
  };
  const filterBySearch = (model: IModel): boolean => {
    if (searchText === "") {
      return true;
    }
    if (
      model.title.toLocaleLowerCase().includes(searchText) ||
      model.tags.filter((tag) => tag.toLocaleLowerCase().includes(searchText))
        .length > 0 ||
      model.certificate.filter((certificate) =>
        certificate.toLocaleLowerCase().includes(searchText)
      ).length > 0 ||
      model.license.toLocaleLowerCase().includes(searchText)
    )
      return true;
    return false;
  };

  const handleOnClickCardUpload = () => {
    navigate("upload");
  };

  const renderUplaodCart = () => (
    <div
      className={`flex  items-center justify-between overflow-hidden bg-white hover:cursor-pointer hover:bg-gray-300 ${
        grid === true
          ? "basis-[48%] flex-col sm:basis-[32%] md:basis-[23.5%]"
          : "w-full flex-row"
      }`}
      onClick={handleOnClickCardUpload}
    >
      <img
        className={`p-5 ${
          grid === true
            ? "h-44 min-w-full max-w-[200%]"
            : "max-h-44 min-h-full w-44 pl-10 "
        }`}
        src={IconUpload}
        alt={t("Process.Model.ModelCatalog.button.upload")}
      />
      <Heading variant="h2">{t("Process.Model.ModelCatalog.upload")}</Heading>
      <div className={`flex items-center justify-center gap-2 p-3`}>
        <Button
          onClick={handleOnClickCardUpload}
          title={t("Process.Model.ModelCatalog.button.select")}
        />
      </div>
    </div>
  );

  return selectedModel === undefined ? (
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
            {renderUplaodCart()}
            {modelsQuery.data
              .filter((model, index) => filterBySearch(model))
              .map((model: IModel, index: number) => (
                <ProcessModelCard
                  grid={processState.grid}
                  selectModel={selectModel}
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
                  selectModel={selectModel}
                  closeModelView={closeModelView}
                />
              ) : null}
            </Modal>
          </>
        ) : (
          t("Process.Model.ModelCatalog.empty")
        )}
      </div>
    </LoadingSuspense>
  ) : (
    <ProcessModelItem model={selectedModel} deselectModel={deselectModel} />
  );
};
