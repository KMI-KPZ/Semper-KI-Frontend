import React, { PropsWithChildren } from "react";
import { Container, Divider, Text } from "@component-library/index";
import { useTranslation } from "react-i18next";
import { Heading } from "@component-library/index";
// import ModelPreview from "@/pages/Test/STLViewer";
// import useGetModelFile from "@/api/Process/Files/Querys/useGetFile";
import { RepositoryModel } from "@/api/Service/AdditiveManufacturing/Model/Querys/useGetModels";
import { ProcessModel } from "@/api/Process/Querys/useGetProcess";

interface Props {
  model: RepositoryModel;
  openModelView(model: ProcessModel): void;
}

export const ProcessModelCard: React.FC<PropsWithChildren<Props>> = (props) => {
  const { t } = useTranslation();
  const { model, children } = props;

  return (
    <Container
      className="w-fit min-w-[350px] max-w-[45%] gap-0 rounded-md border-2 bg-white"
      direction="col"
    >
      <img src={model.preview} className="h-fit w-full object-contain" />
      <Divider />
      <Container direction="col" className="p-5">
        <Heading variant="h3">{model.name}</Heading>
        <Container direction="row" width="full" items="start">
          <Container direction="col" justify="start" items="start">
            <Text>
              {`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.components.Card.license`
              )}`}
            </Text>
          </Container>
          <Container direction="col" justify="start" items="start">
            <Text>{model.license}</Text>
          </Container>
        </Container>

        {children}
      </Container>
    </Container>
  );
};
