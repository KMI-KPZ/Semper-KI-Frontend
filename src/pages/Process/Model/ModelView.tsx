import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { IModel } from "../../../interface/Interface";
import { getModelURI } from "../../../services/utils";
import { Button } from "@component-library/Button";

interface Props {
  model: IModel;
  deselectModel(): void;
}

const ModelView: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { model, deselectModel } = props;

  const getDate = (): string => {
    let date: Date = new Date(model.date);
    return date.toLocaleDateString("uk-Uk");
  };

  const convertStringForImage = (input: string): string => {
    let base64 = input;
    base64 = base64.slice(2);
    base64 = base64.slice(0, -1);
    return base64;
  };

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <h2 className="">{model.title}</h2>
      <img className="w-full max-w-xs" src={getModelURI(model)} alt="Model" />
      <div className="model-view-tags">
        {model.tags.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>
      <div className="model-view-date">
        {t("Process.Model.ModelView.created")}: {getDate()}
      </div>
      <div className="model-view-licens">
        {t("Process.Model.ModelView.license")}: {model.license}
      </div>
      <div className="model-view-certificates">
        {t("Process.Model.ModelView.certificates")}:
        {model.certificate.length > 0
          ? model.certificate.map((title: string, index: number) => (
              <div className="model-view-certificate" key={index}>
                {title}
              </div>
            ))
          : t("Process.Model.ModelView.empty")}
      </div>
      <Button onClick={deselectModel}>
        {t("Process.Model.ModelView.button.change")}
      </Button>
    </div>
  );
};

export default ModelView;
