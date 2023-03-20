import "../../../styles.scss";
import React, { useEffect, useState } from "react";
import { IModel } from "../../../interface/Interface";
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
  const { grid } = processState;
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
  return (
    <div
      className={`flex gap-y-5 ${
        grid === true
          ? "flex-row flex-wrap justify-between"
          : "flex-col flex-nowrap "
      }`}
    >
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
              <ModelView
                model={state.model}
                selectModel={selectModel}
                closeModelView={closeModelView}
              />
            ) : null}
          </PopUp>
        </>
      ) : (
        "keine Modelle gefunden"
      )}
    </div>
  );
};
