import {
  ManufactoringProcessProps,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ProcessConditionIcon from "@/components/Process/ConditionIcon";
import { ManufacturingServiceProps } from "@/api/Service/Querys/useGetServices";
import ProcessServiceModelCard from "./ModelCard";
import ProcessStatusGate from "@/pages/Process/components/StatusGate";
import ProcessServiceMaterialCard from "./MaterialCard";
import ProcessSericePostProcessingCard from "./PostProcessingCard";

interface ServiceManufacturingDetailsProps {
  process: ManufactoringProcessProps;
  service: ManufacturingServiceProps;
  activeGroup: number;
}

const ServiceManufacturingDetails: React.FC<
  ServiceManufacturingDetailsProps
> = (props) => {
  const { service, activeGroup } = props;
  const { models = [], material = undefined, postProcessings = [] } = service;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnButtonClickMaterial = () => {
    navigate(`service/manufacturing/${activeGroup}/material`);
  };
  const handleOnButtonClickPostProcessing = () => {
    navigate(`service/manufacturing/${activeGroup}/postprocessing`);
  };
  const handleOnButtonClickModel = () => {
    navigate(`service/manufacturing/${activeGroup}/model`);
  };

  return (
    <Container
      direction="col"
      justify="center"
      align="start"
      width="full"
      className="gap-0 rounded-md border-2 p-0"
    >
      <Container
        width="fit"
        direction="row"
        justify="start"
        className="p-5 pb-2"
      >
        <Heading variant="h3">
          {t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.heading.main"
          )}
        </Heading>
      </Container>
      <Container width="full" direction="col" className="gap-0 p-2">
        <Text>
          {t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.pageDescription1"
          )}
        </Text>
        <Text>
          {t(
            "Process.components.Service.ServiceDetails.components.Manufacturing.pageDescription2"
          )}
        </Text>
      </Container>
      <Divider />
      <Container
        justify="center"
        width="full"
        direction="col"
        gap={5}
        className="p-5"
        id="Service-ADDITIVE_MANUFACTURING-models"
      >
        <Container width="fit" className={`gap-2 rounded-md p-0 pt-2 `}>
          <ProcessConditionIcon error={models.length === 0} />
          <Heading variant="h4" className="text-xl">
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.heading.model"
            )}
          </Heading>
        </Container>
        {models.length === 0 ? (
          <Text className="">
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.noModels"
            )}
          </Text>
        ) : (
          models.map((model, index) => (
            <ProcessServiceModelCard
              model={model}
              key={index}
              groupID={activeGroup}
            />
          ))
        )}
        <ProcessStatusGate endExclude end={ProcessStatus.SERVICE_COMPLETED}>
          <Button
            title={t(
              `Process.components.Service.ServiceDetails.components.Manufacturing.button.${
                models.length === 0 ? "addModel" : "addMore"
              }`
            )}
            size={models.length === 0 ? "sm" : "xs"}
            variant={models.length === 0 ? "primary" : "secondary"}
            onClick={handleOnButtonClickModel}
            startIcon={<AddIcon />}
            children={t(
              `Process.components.Service.ServiceDetails.components.Manufacturing.button.${
                models.length === 0 ? "addModel" : "addMore"
              }`
            )}
          />
          <Button
            size="xs"
            variant="text"
            title={t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.button.noModel"
            )}
            to={`service/manufacturing/${activeGroup}/model/descriptive`}
          />
        </ProcessStatusGate>
      </Container>
      <Divider />
      <Container
        justify="center"
        width="full"
        direction="col"
        className="p-5"
        id="Service-ADDITIVE_MANUFACTURING-material"
      >
        <Container width="fit" className={`gap-2 rounded-md  p-0 pt-2`}>
          <ProcessConditionIcon error={material === undefined} />
          <Heading variant="h4" className="text-xl">
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.heading.material"
            )}
          </Heading>
        </Container>
        {material === undefined ? (
          <Text className="">
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.noMaterials"
            )}
          </Text>
        ) : (
          <ProcessServiceMaterialCard
            material={material}
            groupID={activeGroup}
          />
        )}
        <ProcessStatusGate endExclude end={ProcessStatus.SERVICE_COMPLETED}>
          <Button
            title={t(
              `Process.components.Service.ServiceDetails.components.Manufacturing.button.${
                material === undefined ? "addMaterial" : "addMore"
              }`
            )}
            size={material === undefined ? "sm" : "xs"}
            variant={material === undefined ? "primary" : "secondary"}
            onClick={handleOnButtonClickMaterial}
            startIcon={<AddIcon />}
            children={t(
              `Process.components.Service.ServiceDetails.components.Manufacturing.button.${
                material === undefined ? "addMaterial" : "addMore"
              }`
            )}
          />
        </ProcessStatusGate>
      </Container>
      <Divider />
      <Container
        justify="center"
        width="full"
        direction="col"
        className="p-5"
        id="ServiceManufacturingPostProcessings"
      >
        <Container width="fit" className={`gap-2 p-0 pt-2`}>
          <ProcessConditionIcon error={false} />
          <Heading variant="h4" className="whitespace-nowrap text-xl">
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.heading.post-processing"
            )}
          </Heading>
        </Container>
        {postProcessings.length === 0 ? (
          <Text className="">
            {t(
              "Process.components.Service.ServiceDetails.components.Manufacturing.noPostProcessings"
            )}
          </Text>
        ) : (
          postProcessings.map((postProcessing, index) => (
            <ProcessSericePostProcessingCard
              groupID={activeGroup}
              postProcessing={postProcessing}
              key={index}
            />
          ))
        )}
        <ProcessStatusGate endExclude end={ProcessStatus.SERVICE_COMPLETED}>
          <Button
            title={t(
              `Process.components.Service.ServiceDetails.components.Manufacturing.button.${
                postProcessings.length === 0 ? "addPostProcessing" : "addMore"
              }`
            )}
            size={postProcessings.length === 0 ? "sm" : "xs"}
            variant={postProcessings.length === 0 ? "primary" : "secondary"}
            onClick={handleOnButtonClickPostProcessing}
            startIcon={<AddIcon />}
            children={t(
              `Process.components.Service.ServiceDetails.components.Manufacturing.button.${
                postProcessings.length === 0 ? "addPostProcessing" : "addMore"
              }`
            )}
          />
        </ProcessStatusGate>
      </Container>
    </Container>
  );
};

export default ServiceManufacturingDetails;
