import React from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "../../components/Card";
import { ModelProps } from "@/pages/Process/components/Service/ServiceEdit/Manufacturing/Model/types";
import TestImg from "@images/Test2.png";
import {Button, Container, LoadingAnimation, Text} from "@component-library/index";
import { useNavigate } from "react-router-dom";
import useDeleteModel from "@/api/Service/AdditiveManufacturing/Model/Mutations/useDeleteModel";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ProcessStatusGate from "@/pages/Process/components/StatusGate";
import ModelPreview from "@/pages/Test/STLViewer";
import useGetModelDetails from "@/api/Service/AdditiveManufacturing/Model/Querys/useGetModelDetails";

interface ProcessServiceModelCardProps {
  model: ModelProps;
}

const ProcessServiceModelCard: React.FC<ProcessServiceModelCardProps> = (
  props
) => {
  const { model } = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const { project } = useProject();
  const navigate = useNavigate();
  const deleteModel = useDeleteModel();
  // const modelDetailsQuery = useGetModelDetails(process.processID);

  console.log(model);
  console.log("ProcessID + ProjectID + ModelID: ", process.processID, project.projectID, model.id);
  const fileUrl = "http://127.0.0.1:8000/public/files/download/file/" + project.projectID + "/" + process.processID + "/" + model.id;

  console.log("FileURL: ", fileUrl);

  const handleOnButtonClickModel = () => {
    navigate("service/manufacturing/model");
  };
  const handleOnButtonClickDeleteModel = (modelID: string) => {
    deleteModel.mutate({
      processID: process.processID,
      projectID: project.projectID,
      modelID,
    });
  };


  return (
    <ServiceDetailsCard>
      {fileUrl !== "" ? (
          <ModelPreview className="h-[300px] w-[500px]" file={fileUrl} interactive={true}  />
      ) : (
          <LoadingAnimation />
      )}
      {/*<img*/}
      {/*  src={TestImg}*/}
      {/*  className=""*/}
      {/*  alt={t(*/}
      {/*    "Process.Service.ServiceDetails.components.manufacturing.model.img"*/}
      {/*  )}*/}
      {/*/>*/}
      <Container direction="col" width="full" className="" gap={3}>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.model.name"
            )}
          </Text>
          <Text>{model.fileName}</Text>
        </Container>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.model.dimensions"
            )}
          </Text>
          <Text>--x--x-- mm</Text>
        </Container>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.model.surface"
            )}
          </Text>
          <Text>-- mm²</Text>
        </Container>
        <Container direction="row" justify="between" width="full">
          <Text>
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.model.volume"
            )}
          </Text>
          <Text>-- mm³</Text>
        </Container>
      </Container>
      <Container
        direction="col"
        justify="center"
        width="fit"
        gap={3}
        className="p-5"
      >
        <ProcessStatusGate end={ProcessStatus.SERVICE_COMPLETED}>
          <Button
            title={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.editModel"
            )}
            size="sm"
            variant="secondary"
            onClick={handleOnButtonClickModel}
            children={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.edit"
            )}
          />
          <Button
            title={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.deleteModel"
            )}
            size="sm"
            variant="text"
            onClick={() => handleOnButtonClickDeleteModel(model.id)}
            children={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.delete"
            )}
          />
        </ProcessStatusGate>
      </Container>
    </ServiceDetailsCard>
  );
};

export default ProcessServiceModelCard;
