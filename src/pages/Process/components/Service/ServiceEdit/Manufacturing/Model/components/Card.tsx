import React, { PropsWithChildren } from "react";
import { Container, Divider, Text } from "@component-library/index";
import { useTranslation } from "react-i18next";
import { ModelProps } from "../types";
import { Heading } from "@component-library/index";
// import ModelPreview from "@/pages/Test/STLViewer";
// import useGetModelFile from "@/api/Process/Files/Querys/useGetFile";
import { RepositoryModel } from "@/api/Service/AdditiveManufacturing/Model/Querys/useGetModels";

interface Props {
  model: RepositoryModel;
  openModelView(model: ModelProps): void;
}

export const ProcessModelCard: React.FC<PropsWithChildren<Props>> = (props) => {
  const { t } = useTranslation();
  const { model, children } = props;
  // const modelFile = useGetModelFile(model.id);
  // const getFileURL = (blob: Blob) => {
  //   return URL.createObjectURL(blob);
  // };

  return (
    <Container
      className="w-fit min-w-[350px] max-w-[45%] gap-0 rounded-xl border-2 bg-white"
      direction="col"
    >
      {/* {modelFile.isLoading || modelFile.data === undefined ? (
        <LoadingAnimation />
      ) : (
        <ModelPreview
          interactive={false}
          file={getFileURL(modelFile.data)}
          className="h-60 w-full border-0"
        />
      )} */}
      <img src={model.preview} className="h-fit w-full object-contain" />
      <Divider />
      <Container direction="col" className="p-5">
        <Heading variant="h3">{model.name}</Heading>
        <Container direction="row" width="full" align="start">
          <Container direction="col" justify="start" align="start">
            {/* <Text>{`${t(
              `Service.Manufacturing.Model.Upload.components.Form.size`
            )}`}</Text>
            <Text>{`${t(
              `Service.Manufacturing.Model.Upload.components.Form.date`
            )}`}</Text>
            <Text>
              {`${t(
                `Service.Manufacturing.Model.Upload.components.Form.certificate`
              )}`}
            </Text> */}
            <Text>
              {`${t(
                `Service.Manufacturing.Model.Upload.components.Form.license`
              )}`}
            </Text>
            {/* <Text>
              {`${t(
                `Service.Manufacturing.Model.Upload.components.Form.tags`
              )}`}
            </Text> */}
          </Container>
          <Container direction="col" justify="start" align="start">
            {/* <Text>{new Date().toLocaleDateString()}</Text>
            <Text>{model.certificates}</Text> */}
            <Text>{model.license}</Text>
            {/* <Text>{model.tags}</Text> */}
          </Container>
        </Container>

        {children}
      </Container>
    </Container>
  );
};
