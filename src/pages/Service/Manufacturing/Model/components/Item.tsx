import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";
import { getModelURI } from "@/services/utils";
import { ModelProps } from "../types";
import { Heading } from "@component-library/index";
import useProcess from "@/pages/Projects/hooks/useProcess";

interface Props {
  model: ModelProps;
}

const ProcessModelItem: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { model } = props;
  const { updateProcess } = useProcess();

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

  const handleOnClickButtonDeselect = () => {
    updateProcess({ deletions: { serviceDetails: ["model"] } });
  };

  return (
    <div className="flex h-fit w-full  flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h2">{model.fileName}</Heading>
      <img className="w-full max-w-xs" src={getModelURI(model)} alt="Model" />
      <div className="model-view-tags">
        {model.tags.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>
      <div className="model-view-date">
        {t("Service.Manufacturing.Model.components.Item.created")}: {getDate()}
      </div>
      <div className="model-view-licens">
        {t("Service.Manufacturing.Model.components.Item.license")}:{" "}
        {model.licenses}
      </div>
      <div className="model-view-certificates">
        {t("Service.Manufacturing.Model.components.Item.certificates")}:
        {model.certificates !== undefined && model.certificates.length > 0
          ? model.certificates.map((title: string, index: number) => (
              <div className="model-view-certificate" key={index}>
                {title}
              </div>
            ))
          : t(
              "Service.Manufacturing.Model.components.Item.error.noCertificates"
            )}
      </div>
      <Button
        onClick={handleOnClickButtonDeselect}
        title={t("Service.Manufacturing.Model.components.Item.button.change")}
      />
    </div>
  );
};

export default ProcessModelItem;
