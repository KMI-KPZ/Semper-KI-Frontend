import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, Text } from "@component-library/index";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import useProcess from "@/hooks/Process/useProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";
import { useNavigate } from "react-router-dom";
import { Process } from "@/api/Process/Querys/useGetProcess";

interface ServiceConditionProps {}

export const isProcessFinished = (process: Process): boolean => {
  const materialFinished =
    process.serviceDetails !== undefined &&
    process.serviceType === ServiceType.MANUFACTURING &&
    process.serviceDetails.materials !== undefined &&
    process.serviceDetails.materials.length > 0;
  const modelFinished =
    process.serviceDetails !== undefined &&
    process.serviceType === ServiceType.MANUFACTURING &&
    process.serviceDetails.models !== undefined &&
    process.serviceDetails.models.length > 0;
  const allFinished = materialFinished && modelFinished;
  return allFinished;
};

const ServiceCondition: React.FC<ServiceConditionProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();
  const navigate = useNavigate();

  const materialFinished =
    process.serviceDetails !== undefined &&
    process.serviceType === ServiceType.MANUFACTURING &&
    process.serviceDetails.materials !== undefined &&
    process.serviceDetails.materials.length > 0;
  const modelFinished =
    process.serviceDetails !== undefined &&
    process.serviceType === ServiceType.MANUFACTURING &&
    process.serviceDetails.models !== undefined &&
    process.serviceDetails.models.length > 0;
  const allFinished = materialFinished && modelFinished;

  if (allFinished) return undefined;

  return (
    <Container direction="col" align="center" className={`gap-0 `}>
      <Container width="fit" direction="row" className="p-4">
        <Heading variant="h2" className="whitespace-nowrap">
          {t(
            `Process.Service.ServiceDetails.components.manufacturing.${
              allFinished ? "complete" : "incomplete"
            }`
          )}
        </Heading>
      </Container>
      <Container
        width="fit"
        direction="row"
        align="start"
        className="gap-2 p-2"
      >
        {modelFinished ? null : (
          <Container
            width="fit"
            direction="row"
            justify="start"
            className={`self-stretch rounded-md border-2 border-orange-500 p-2 hover:cursor-pointer hover:bg-gray-50`}
            onClick={() => {
              navigate("#ServiceManufacturingModels");
            }}
            tabIndex
          >
            <CancelOutlinedIcon className="text-orange-500" />
            <Text>
              {t(
                `Process.Service.ServiceDetails.components.manufacturing.model.incomplete`
              )}
            </Text>
          </Container>
        )}
        {materialFinished ? null : (
          <Container
            width="fit"
            justify="start"
            direction="row"
            className={`self-stretch rounded-md border-2 border-orange-500 p-2 hover:cursor-pointer hover:bg-gray-50`}
            onClick={() => {
              navigate("#ServiceManufacturingMaterials");
            }}
            tabIndex
          >
            <CancelOutlinedIcon className="text-orange-500" />
            <Text>
              {t(
                `Process.Service.ServiceDetails.components.manufacturing.material.incomplete`
              )}
            </Text>
          </Container>
        )}
      </Container>
    </Container>
  );
};

export default ServiceCondition;
