import React from "react";
import { IModel } from "../../../interface/Interface";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  model: IModel;
  selectModel: (model: IModel) => void;
  closeModelView(): void;
}

export const ModelPreView: React.FC<Props> = (props) => {
  const { model, selectModel, closeModelView } = props;
  const getDate = (): string => {
    let date: Date = new Date(model.date);
    return date.toLocaleDateString("uk-Uk");
  };

  return (
    <div className="flex flex-col gap-5 items-center justify-start bg-white h-screen w-screen xl:w-fit xl:max-h-[90vh] overflow-x-hidden overflow-y-scroll">
      <div className="xl:hidden flex flex-row-reverse w-full">
        <div
          className="hover:bg-gray-300 hover:cursor-pointer p-3"
          onClick={closeModelView}
        >
          <CloseIcon fontSize="large" />
        </div>
      </div>
      <h2 className="">{model.title}</h2>
      <img className="w-full xl:max-w-xl" src={model.URI} alt="Model" />
      <div className="model-view-tags">
        {model.tags.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>
      <div className="model-view-date">Erstellt am: {getDate()}</div>
      <div className="model-view-licens">Lizenz: {model.license}</div>
      <div className="model-view-certificates">
        Zertifikate:{" "}
        {model.certificate.length > 0
          ? model.certificate.map((title: string, index: number) => (
              <div className="model-view-certificate" key={index}>
                {title}
              </div>
            ))
          : "keine"}
      </div>
      <div className="pb-2" onClick={(e) => selectModel(model)}>
        <div className=" text-white flex flex-row justify-center items-center w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer">
          Auswählen
        </div>
      </div>
    </div>
  );
};
