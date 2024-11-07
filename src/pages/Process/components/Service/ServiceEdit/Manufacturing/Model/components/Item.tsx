import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";
import { getModelURI } from "@/services/utils";
import { ModelProps } from "../types";
import { Heading } from "@component-library/index";
import useProcess from "@/hooks/Process/useProcess";
import { isProcessAtServiceStatus } from "@/api/Process/Querys/useGetProcess";
import useDeleteModel from "@/api/Service/AdditiveManufacturing/Model/Mutations/useDeleteModel";
import { useProject } from "@/hooks/Project/useProject";

interface Props {
  model: ModelProps;
}

const ProcessModelItem: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { model } = props;
  const { process } = useProcess();
  const { project } = useProject();
  const deleteModel = useDeleteModel();

  const getDate = (): string => {
    let date: Date = new Date(model.date);
    return date.toLocaleDateString("uk-Uk");
  };

  // const convertStringForImage = (input: string): string => {
  //   let base64 = input;
  //   base64 = base64.slice(2);
  //   base64 = base64.slice(0, -1);
  //   return base64;
  // };

  const handleOnClickButtonDeselect = (modelID: string) => {
    deleteModel.mutate({
      processID: process.processID,
      projectID: project.projectID,
      modelID,
    });
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
        {t(
          "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Item.created"
        )}
        : {getDate()}
      </div>
      <div className="model-view-licens">
        {t(
          "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Item.license"
        )}
        : {model.licenses}
      </div>
      <div className="model-view-certificates">
        {t(
          "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Item.certificates"
        )}
        :
        {model.certificates !== undefined && model.certificates.length > 0
          ? model.certificates.map((title: string, index: number) => (
              <div className="model-view-certificate" key={index}>
                {title}
              </div>
            ))
          : t(
              "Process.components.Service.ServiceEdit.Manufacturing.Model.components.Item.error.noCertificates"
            )}
      </div>
      {isProcessAtServiceStatus(process) ? (
        <Button
          onClick={() => handleOnClickButtonDeselect(model.id)}
          title={t("general.button.change")}
        />
      ) : null}
    </div>
  );
};

export default ProcessModelItem;
