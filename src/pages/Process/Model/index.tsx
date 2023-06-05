import React, { useEffect, useState } from "react";
import { IProcessState } from "..";
import { ModelCard } from "./components/card";
import { Button } from "@component-library/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useModelData } from "../hooks/useProcessData";
import { LoadingSuspense } from "@component-library/Loading";
import PopUp from "@/components/PopUp";
import { IFilterItem } from "../Filter";
import { ModelPreView } from "./components/preView";
import ModelView from "./components/view";
import IconUpload from "@icons/Upload.svg";

interface Props {
  filters: IFilterItem[];
  processState: IProcessState;
  selectedModel: IModel | undefined;
  selectModel(model: IModel): void;
  deselectModel(): void;
  setProgress(path: string): void;
}

interface State {
  popUp: boolean;
  model: IModel | undefined;
}

export interface IModel {
  id: string;
  title: string;
  tags: string[];
  date: string;
  license: string;
  certificate: string[];
  URI: string;
  createdBy: string;
}

export enum EModelType {
  "kiss",
  "user",
}

export const ModelCatalog: React.FC<Props> = (props) => {
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
  const [state, setState] = useState<State>({ popUp: false, model: undefined });
  const { modelsQuery } = useModelData(filters);
  useEffect(() => {
    setProgress("model");
  }, []);
  const openModelView = (model: IModel) => {
    setState((prevState) => ({ ...prevState, popUp: true, model }));
  };
  const closeModelView = () => {
    setState((prevState) => ({ ...prevState, popUp: false, model: undefined }));
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
    navigate("/process/upload");
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
      <h2 className="">{t("Process.Model.ModelCatalog.upload")}</h2>
      <div className={`flex items-center justify-center gap-2 p-3`}>
        <Button onClick={handleOnClickCardUpload}>
          {t("Process.Model.ModelCatalog.button.select")}
        </Button>
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
                <ModelCard
                  grid={processState.grid}
                  selectModel={selectModel}
                  model={model}
                  key={index}
                  openModelView={openModelView}
                />
              ))}
            <PopUp
              open={state.popUp === true && state.model !== undefined}
              onOutsideClick={closeModelView}
            >
              {state.model !== undefined ? (
                <ModelPreView
                  model={state.model}
                  selectModel={selectModel}
                  closeModelView={closeModelView}
                />
              ) : null}
            </PopUp>
          </>
        ) : (
          t("Process.Model.ModelCatalog.empty")
        )}
      </div>
    </LoadingSuspense>
  ) : (
    <ModelView model={selectedModel} deselectModel={deselectModel} />
  );
};
