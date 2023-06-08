import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@component-library/Button";
import { useTranslation } from "react-i18next";
import { getModelURI } from "@/services/utils";
import { IModel } from "..";
import { Heading } from "@component-library/Typography";

interface Props {
  model: IModel;
  selectModel: (model: IModel) => void;
  closeModelView(): void;
}

export const ModelPreView: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { model, selectModel, closeModelView } = props;
  const getDate = (): string => {
    let date: Date = new Date(model.date);
    return date.toLocaleDateString("uk-Uk");
  };
  const handleOnClickButtonSelect = () => {
    closeModelView();
    selectModel(model);
  };
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-start gap-5 overflow-y-auto overflow-x-hidden bg-white xl:max-h-[90vh] xl:w-fit xl:min-w-[700px]">
      <div className="flex w-full flex-row-reverse xl:hidden">
        <div
          className="p-3 hover:cursor-pointer hover:bg-gray-300"
          onClick={closeModelView}
        >
          <CloseIcon fontSize="large" />
        </div>
      </div>
      <Heading variant="h2">{model.title}</Heading>
      <img
        className="w-full xl:max-w-xl"
        src={getModelURI(model)}
        alt="Model"
      />
      <div className="model-view-tags">
        {model.tags.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>
      <div className="model-view-date">
        {t("Process.Model.ModelPreView.created")}: {getDate()}
      </div>
      <div className="model-view-licens">
        {t("Process.Model.ModelPreView.license")}: {model.license}
      </div>
      <div className="model-view-certificates">
        {t("Process.Model.ModelPreView.certificates")}:
        {model.certificate.length > 0
          ? model.certificate.map((title: string, index: number) => (
              <div className="model-view-certificate" key={index}>
                {title}
              </div>
            ))
          : t("Process.Model.ModelPreView.noCertificates")}
      </div>
      <Button
        onClick={handleOnClickButtonSelect}
        title={t("Process.Model.ModelPreView.button.select")}
      />
    </div>
  );
};
