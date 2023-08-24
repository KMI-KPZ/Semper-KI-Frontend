import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { getModelURI } from "@/services/utils";
import { ModelProps } from "../types";
import { Heading } from "@component-library/Typography";
import useSubOrder from "@/pages/OrderRoutes/hooks/useSubOrder";

interface Props {
  model: ModelProps;
}

const ProcessModelItem: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { model } = props;
  const { updateSubOrder } = useSubOrder();

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
    updateSubOrder.mutate({ changes: { service: { model: undefined } } });
  };

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h2">{model.title}</Heading>
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
      <Button
        onClick={handleOnClickButtonDeselect}
        title={t("Process.Model.ModelView.button.change")}
      />
    </div>
  );
};

export default ProcessModelItem;
