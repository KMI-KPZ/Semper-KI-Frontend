import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@component-library/index";
import { useTranslation } from "react-i18next";
import { getModelURI } from "@/services/utils";
import { ModelProps } from "../types";
import { Heading } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import useProcess from "@/hooks/Process/useProcess";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";

interface Props {
  model: ModelProps;
  closeModelView(): void;
}

export const ProcessModelPreView: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { model, closeModelView } = props;
  const navigate = useNavigate();
  const { process } = useProcess();
  const updateProcess = useUpdateProcess();
  const getDate = (): string => {
    let date: Date = new Date(model.date);
    return date.toLocaleDateString("uk-Uk");
  };
  const handleOnClickButtonSelect = () => {
    closeModelView();
    updateProcess.mutate({
      processIDs: [process.processID],
      updates: { changes: { serviceDetails: { model } } },
    });
    navigate("../material");
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
      <Heading variant="h2">{model.fileName}</Heading>
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
        {t("Service.Manufacturing.Model.components.PreView.created")}:{" "}
        {getDate()}
      </div>
      <div className="model-view-licens">
        {t("Service.Manufacturing.Model.components.PreView.license")}:{" "}
        {model.licenses}
      </div>
      <div className="model-view-certificates">
        {t("Service.Manufacturing.Model.components.PreView.certificates")}:
        {model.certificates.length > 0
          ? model.certificates.map((title: string, index: number) => (
              <div className="model-view-certificate" key={index}>
                {title}
              </div>
            ))
          : t(
              "Service.Manufacturing.Model.components.PreView.error.noCertificates"
            )}
      </div>
      <Button
        onClick={handleOnClickButtonSelect}
        title={t(
          "Service.Manufacturing.Model.components.PreView.button.select"
        )}
      />
    </div>
  );
};
