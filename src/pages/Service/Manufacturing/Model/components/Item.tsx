import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, LoadingAnimation } from "@component-library/index";
import { getModelURI } from "@/services/utils";
import { ModelProps } from "../types";
import { Heading } from "@component-library/index";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { isProcessAtServiceStatus } from "@/pages/Projects/hooks/useGeneralProcess";
import ModelPreview from "@/pages/Test/STLViewer";
import { ServiceType } from "@/pages/Service/hooks/useService";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";

interface Props {
  model: ModelProps;
}

const ProcessModelItem: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { model } = props;
  const { process, deleteModel, downloadFile } = useProcess();
  const [fileUrl, setFileUrl] = React.useState<string>("");
  const navigate = useNavigate();

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

  useEffect(() => {
    if (
      process.serviceType === ServiceType.MANUFACTURING &&
      process.serviceDetails !== undefined &&
      process.serviceDetails.model !== undefined &&
      process.files.length > 0 &&
      process.files.find(
        (file) =>
          process.serviceDetails.model !== undefined &&
          file.id === process.serviceDetails.model.id
      ) !== undefined
    ) {
      downloadFile(
        process.serviceDetails.model.id,

        {
          onSuccess(data) {
            const url = window.URL.createObjectURL(data);
            setFileUrl(url);
          },
        }
      );
    } else return;
  }, []);

  const handleOnClickButtonDeselect = () => {
    logger("Process | deleteModel |", model);
    setFileUrl("");
    deleteModel();
  };

  const handleOnClickButtonMaterials = () => {
    navigate("../material");
  };

  const handleOnClickButtonPostProcessing = () => {
    navigate("../postprocessing");
  };

  return (
    <div className="flex h-fit w-full  flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h2">{model.fileName}</Heading>
      {/* <img className="w-full max-w-xs" src={getModelURI(model)} alt="Model" /> */}
      {fileUrl === "" ? (
        <LoadingAnimation />
      ) : (
        <ModelPreview file={fileUrl} className="h-80" />
      )}
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

      <Container>
        <Button
          onClick={handleOnClickButtonDeselect}
          title={t("Service.Manufacturing.Model.components.Item.button.change")}
        />
        <Button
          variant="primary"
          onClick={handleOnClickButtonMaterials}
          title={t(
            "Service.Manufacturing.Model.components.Item.button.materials"
          )}
        />
        <Button
          variant="primary"
          onClick={handleOnClickButtonPostProcessing}
          title={t(
            "Service.Manufacturing.Model.components.Item.button.postprocessing"
          )}
        />
      </Container>
    </div>
  );
};

export default ProcessModelItem;
