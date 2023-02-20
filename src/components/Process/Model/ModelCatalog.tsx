import "../../../styles.scss";
import "./../ProcessView.scss";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IModel } from "../../../interface/Interface";
import LoadingAnimation from "../../LoadingAnimation/LoadingAnimation";
import { IProcessState } from "../ProcessView";
import { ModelCard } from "./ModelCard";
import PopUp from "../../PopUp/PopUp";
import { ModelView } from "./ModelView";

interface Props {
  models: IModel[];
  processState: IProcessState;
  selectModel(model: IModel): void;
  setProgress(path: string): void;
}

interface State {
  popUp: boolean;
  model: IModel | undefined;
}

export const ModelCatalog: React.FC<Props> = (props) => {
  const { models, processState, selectModel, setProgress } = props;
  const [state, setState] = useState<State>({ popUp: false, model: undefined });
  const { t } = useTranslation();
  useEffect(() => {
    setProgress("model");
  }, []);
  const openModelView = (model: IModel) => {
    setState((prevState) => ({ ...prevState, popUp: true, model }));
  };
  const closeModelView = () => {
    setState((prevState) => ({ ...prevState, popUp: false, model: undefined }));
  };
  const classNameList: string = processState.grid === true ? "" : "list";
  return (
    <div className={`model-catalog ${classNameList}`}>
      {models.length > 0 ? (
        <>
          {models.map((model: IModel, index: number) => (
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
              <ModelView model={state.model} selectModel={selectModel} />
            ) : null}
          </PopUp>
        </>
      ) : (
        "keine Modelle gefunden"
      )}
    </div>
  );
};
