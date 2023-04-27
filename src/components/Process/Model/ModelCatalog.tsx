import React, { useEffect, useState } from "react";
import { IModel } from "../../../interface/Interface";
import { IProcessState } from "../ProcessView";
import { ModelCard } from "./ModelCard";
import PopUp from "../../PopUp/PopUp";
import { ModelPreView } from "./ModelPreView";
import ModelView from "./ModelView";
import { IconUpload } from "../../../constants/Icons";
import Button from "../../General/Button";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  processState: IProcessState;
  models: IModel[];
  selectedModel: IModel | undefined;
  selectModel(model: IModel): void;
  deselectModel(): void;
  setProgress(path: string): void;
}

interface State {
  popUp: boolean;
  model: IModel | undefined;
}

export const ModelCatalog: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    models,
    processState,
    selectModel,
    setProgress,
    selectedModel,
    deselectModel,
  } = props;
  const { grid, searchText } = processState;
  const navigate = useNavigate();
  const [state, setState] = useState<State>({ popUp: false, model: undefined });
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
      className={`flex justify-between items-center bg-white overflow-hidden hover:cursor-pointer hover:bg-gray-300 ${
        grid === true
          ? "flex-col basis-[48%] sm:basis-[32%] md:basis-[23.5%]"
          : "w-full flex-row"
      }`}
      onClick={handleOnClickCardUpload}
    >
      <img
        className={`p-5 ${
          grid === true
            ? "min-w-full max-w-[200%] h-44"
            : "pl-10 w-44 max-h-44 min-h-full "
        }`}
        src={IconUpload}
        alt={t("Process.Model.ModelCatalog.button.upload")}
      />
      <h2 className="">{t("Process.Model.ModelCatalog.upload")}</h2>
      <div className={`flex justify-center items-center p-3 gap-2`}>
        <Button onClick={handleOnClickCardUpload}>
          {t("Process.Model.ModelCatalog.button.select")}
        </Button>
      </div>
    </div>
  );

  return selectedModel === undefined ? (
    <div
      className={`flex gap-y-5 ${
        grid === true
          ? "flex-row flex-wrap justify-between"
          : "flex-col flex-nowrap "
      }`}
    >
      {models.length > 0 ? (
        <>
          {renderUplaodCart()}
          {models
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
  ) : (
    <ModelView model={selectedModel} deselectModel={deselectModel} />
  );
};
