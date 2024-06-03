import {
  ManufactoringProcessProps,
  Process,
} from "@/api/Process/Querys/useGetProcess";
import { ManufacturingServiceProps } from "@/api/Service/Querys/useGetServices";
import { Button, Container, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "./Card";
import TestImg from "@images/Test2.png";
import { ModelProps } from "@/pages/Service/Manufacturing/Model/types";
import { MaterialProps } from "@/pages/Service/Manufacturing/Material/Material";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import AddIcon from "@mui/icons-material/Add";

interface ServiceManufacturingDetailsProps {
  process: ManufactoringProcessProps;
}

const ServiceManufacturingDetails: React.FC<
  ServiceManufacturingDetailsProps
> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const models: ModelProps[] =
    process.serviceDetails.models !== undefined
      ? process.serviceDetails.models
      : [];
  const postProcessings: PostProcessingProps[] =
    process.serviceDetails.postProcessings !== undefined
      ? process.serviceDetails.postProcessings
      : [];

  return (
    <Container
      direction="col"
      justify="center"
      align="start"
      width="full"
      className="p-5"
    >
      <Container direction="row" justify="between" width="full">
        <Container align="center">
          <Heading variant="h3">
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.model.heading"
            )}
          </Heading>
          <Text>
            {models.length > 0
              ? models.length
              : t(
                  "Process.Service.ServiceDetails.components.manufacturing.model.noModels"
                )}
          </Text>
        </Container>
        {models.length === 0 ? (
          <Button
            title={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.addModel"
            )}
            size="sm"
            variant="primary"
            onClick={() => {}}
            startIcon={<AddIcon />}
            children={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.add"
            )}
          />
        ) : null}
      </Container>
      {models.length > 0
        ? models.map((model, index) => (
            <ServiceDetailsCard key={index}>
              <img
                src={TestImg}
                className=""
                alt={t(
                  "Process.Service.ServiceDetails.components.manufacturing.model.img"
                )}
              />
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
            </ServiceDetailsCard>
          ))
        : null}

      <Container direction="row" justify="between" width="full">
        <Container align="center">
          <Heading variant="h3">
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.material.heading"
            )}
          </Heading>
          <Text>
            {process.serviceDetails.material !== undefined
              ? t(
                  "Process.Service.ServiceDetails.components.manufacturing.material.selected"
                )
              : t(
                  "Process.Service.ServiceDetails.components.manufacturing.material.noMaterial"
                )}
          </Text>
        </Container>
        {models.length === 0 ? (
          <Button
            title={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.addMaterial"
            )}
            size="sm"
            variant="primary"
            onClick={() => {}}
            startIcon={<AddIcon />}
            children={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.add"
            )}
          />
        ) : null}
      </Container>
      {process.serviceDetails.material !== undefined ? (
        <ServiceDetailsCard>
          <img
            src={TestImg}
            alt={t(
              "Process.Service.ServiceDetails.components.manufacturing.material.img"
            )}
          />
          <Container direction="col" width="full" className="" gap={3}>
            <Container direction="row" justify="between" width="full">
              <Text>
                {t(
                  "Process.Service.ServiceDetails.components.manufacturing.material.name"
                )}
              </Text>
              <Text>{process.serviceDetails.material.title}</Text>
            </Container>
            <Container direction="row" justify="between" width="full">
              <Text>
                {t(
                  "Process.Service.ServiceDetails.components.manufacturing.material.type"
                )}
              </Text>
              <Text>---</Text>
            </Container>
            <Container direction="row" justify="between" width="full">
              <Text>
                {t(
                  "Process.Service.ServiceDetails.components.manufacturing.material.properties"
                )}
              </Text>
            </Container>
            <ul className="flex w-full list-inside list-disc flex-col items-start justify-start pl-3">
              {process.serviceDetails.material.propList.length > 0 ? (
                process.serviceDetails.material.propList.map((prop, index) => (
                  <li key={index}>{prop}</li>
                ))
              ) : (
                <li>---</li>
              )}
            </ul>
          </Container>
        </ServiceDetailsCard>
      ) : null}

      <Container direction="row" justify="between" width="full">
        <Container align="center">
          <Heading variant="h3">
            {t(
              "Process.Service.ServiceDetails.components.manufacturing.postProcessing.heading"
            )}
          </Heading>
          <Text>
            {postProcessings.length > 0
              ? postProcessings.length
              : t(
                  "Process.Service.ServiceDetails.components.manufacturing.postProcessing.noPostProcessings"
                )}
          </Text>
        </Container>
        {postProcessings.length === 0 ? (
          <Button
            title={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.addPostProcessing"
            )}
            size="sm"
            variant="primary"
            onClick={() => {}}
            startIcon={<AddIcon />}
            children={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.add"
            )}
          />
        ) : null}
      </Container>
      {postProcessings.length > 0
        ? postProcessings.map((postProcessing, index) => (
            <ServiceDetailsCard key={index}>
              <img
                src={TestImg}
                alt={t(
                  "Process.Service.ServiceDetails.components.manufacturing.postProcessing.img"
                )}
              />
              <Container direction="col" width="full" className="" gap={3}>
                <Container direction="row" justify="between" width="full">
                  <Text>
                    {t(
                      "Process.Service.ServiceDetails.components.manufacturing.postProcessing.name"
                    )}
                  </Text>
                  <Text>{postProcessing.title}</Text>
                </Container>
                <Container direction="row" justify="between" width="full">
                  <Text>
                    {t(
                      "Process.Service.ServiceDetails.components.manufacturing.postProcessing.type"
                    )}
                  </Text>
                  <Text>---</Text>
                </Container>
                <Container direction="row" justify="between" width="full">
                  <Text>
                    {t(
                      "Process.Service.ServiceDetails.components.manufacturing.postProcessing.describtion"
                    )}
                  </Text>
                </Container>
                <Container direction="row" justify="between" width="full">
                  <Text>{}</Text>
                </Container>
              </Container>
            </ServiceDetailsCard>
          ))
        : null}
    </Container>
  );
};

export default ServiceManufacturingDetails;
