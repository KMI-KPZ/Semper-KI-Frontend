import { ManufactoringProcessProps } from "@/api/Process/Querys/useGetProcess";
import { Button, Container, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import ServiceDetailsCard from "./Card";
import TestImg from "@images/Test2.png";
import { ModelProps } from "@/pages/Service/Manufacturing/Model/types";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import useDeleteModel from "@/api/Process/Mutations/useDeleteModel";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";

interface ServiceManufacturingDetailsProps {
  process: ManufactoringProcessProps;
}

const ServiceManufacturingDetails: React.FC<
  ServiceManufacturingDetailsProps
> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const models: ModelProps[] =
    process.serviceDetails.models !== undefined
      ? process.serviceDetails.models
      : [];
  const postProcessings: PostProcessingProps[] =
    process.serviceDetails.postProcessings !== undefined
      ? process.serviceDetails.postProcessings
      : [];
  const updateProcess = useUpdateProcess();

  const handleOnButtonClickModel = () => {
    navigate("service/manufacturing/model");
  };
  const handleOnButtonClickMaterial = () => {
    navigate("service/manufacturing/material");
  };
  const handleOnButtonClickPostProcessing = () => {
    navigate("service/manufacturing/postprocessing");
  };

  const handleOnButtonClickDeleteModel = () => {
    // updateProcess.mutate({
    //   processIDs: [process.processID],
    //   updates: {
    //     changes: {
    //       serviceDetails: {
    //         models: [],
    //       },
    //     },
    //   },
    // });
  };
  const handleOnButtonClickDeleteMaterial = () => {
    navigate("service/manufacturing/postprocessing");
  };
  const handleOnButtonClickDeletePostProcessing = () => {
    navigate("service/manufacturing/postprocessing");
  };

  return (
    <Container
      direction="col"
      justify="center"
      align="start"
      width="full"
      className="p-5"
    >
      <Container direction="row" justify="between" width="full">
        <Container align="end">
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
            onClick={handleOnButtonClickModel}
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
              <Container
                direction="col"
                justify="center"
                width="fit"
                gap={3}
                className="p-5"
              >
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
                  onClick={handleOnButtonClickDeleteModel}
                  children={t(
                    "Process.Service.ServiceDetails.components.manufacturing.button.delete"
                  )}
                />
              </Container>
            </ServiceDetailsCard>
          ))
        : null}
      {models.length > 0 ? (
        <Button
          title={t(
            "Process.Service.ServiceDetails.components.manufacturing.button.addModel"
          )}
          size="sm"
          variant="primary"
          onClick={handleOnButtonClickModel}
          startIcon={<AddIcon />}
          children={t(
            "Process.Service.ServiceDetails.components.manufacturing.button.add"
          )}
        />
      ) : null}

      <Container direction="row" justify="between" width="full">
        <Container align="end">
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
        {process.serviceDetails.material === undefined ? (
          <Button
            title={t(
              "Process.Service.ServiceDetails.components.manufacturing.button.addMaterial"
            )}
            size="sm"
            variant="primary"
            onClick={handleOnButtonClickMaterial}
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
            className="w-full object-cover"
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
          <Container
            direction="col"
            justify="center"
            width="fit"
            gap={3}
            className="p-5"
          >
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.editMaterial"
              )}
              size="sm"
              variant="secondary"
              onClick={handleOnButtonClickMaterial}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.edit"
              )}
            />
            <Button
              title={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.deleteMaterial"
              )}
              size="sm"
              variant="text"
              onClick={handleOnButtonClickDeleteMaterial}
              children={t(
                "Process.Service.ServiceDetails.components.manufacturing.button.delete"
              )}
            />
          </Container>
        </ServiceDetailsCard>
      ) : null}

      <Container direction="row" justify="between" width="full">
        <Container align="end">
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
            onClick={handleOnButtonClickPostProcessing}
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
              <Container
                direction="col"
                justify="center"
                width="fit"
                gap={3}
                className="p-5"
              >
                <Button
                  title={t(
                    "Process.Service.ServiceDetails.components.manufacturing.button.editPostProcessing"
                  )}
                  size="sm"
                  variant="secondary"
                  onClick={handleOnButtonClickPostProcessing}
                  children={t(
                    "Process.Service.ServiceDetails.components.manufacturing.button.edit"
                  )}
                />
                <Button
                  title={t(
                    "Process.Service.ServiceDetails.components.manufacturing.button.deletePostProcessing"
                  )}
                  size="sm"
                  variant="text"
                  onClick={handleOnButtonClickDeletePostProcessing}
                  children={t(
                    "Process.Service.ServiceDetails.components.manufacturing.button.delete"
                  )}
                />
              </Container>
            </ServiceDetailsCard>
          ))
        : null}
      {postProcessings.length > 0 ? (
        <Button
          title={t(
            "Process.Service.ServiceDetails.components.manufacturing.button.addPostProcessing"
          )}
          size="sm"
          variant="primary"
          onClick={handleOnButtonClickPostProcessing}
          startIcon={<AddIcon />}
          children={t(
            "Process.Service.ServiceDetails.components.manufacturing.button.add"
          )}
        />
      ) : null}
    </Container>
  );
};

export default ServiceManufacturingDetails;
