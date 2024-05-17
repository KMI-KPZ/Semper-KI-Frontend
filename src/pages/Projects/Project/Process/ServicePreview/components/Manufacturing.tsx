import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { PostProcessingProps } from "@/pages/Service/Manufacturing/PostProcessing/PostProcessing";
import { Button } from "@component-library/index";
import { Container } from "@component-library/index";
import { Modal } from "@component-library/index";
import { Text } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ManufactoringProcessProps,
  isProcessAtServiceStatus,
} from "@/pages/Projects/hooks/useProcess";
import Card from "@component-library/Card/Card";
import { useNavigate } from "react-router-dom";
import ModelDetails from "./ModelDetails";
import useGeneralProcess from "@/pages/Projects/hooks/useGeneralProcess";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";

interface ProcessServiceManufacturingProps {
  process: ManufactoringProcessProps;
}

const ProcessServiceManufacturing: React.FC<
  ProcessServiceManufacturingProps
> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { getNavigationPrefix } = useGeneralProcess();
  const updateProcess = useUpdateProcess();

  const closeModal = () => {
    setOpen(false);
  };

  const handleOnClickButtonOpen = () => {
    setOpen(true);
  };

  const handleOnChangeInputAmount = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = parseInt(e.target.value);
    const inputNumber = Math.max(isNaN(inputValue) ? 1 : inputValue, 1);

    if (process.processDetails.amount !== inputNumber)
      updateProcess.mutate({
        processIDs: [process.processID],
        updates: {
          changes: {
            processDetails: { amount: inputNumber },
          },
        },
      });
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    card: "model" | "material" | "postprocessing"
  ) => {
    e.preventDefault();
    switch (card) {
      case "model":
        navigate(
          `${getNavigationPrefix(process.processID)}service/manufacturing/model`
        );
        break;
      case "material":
        navigate(
          `${getNavigationPrefix(
            process.processID
          )}service/manufacturing/material`
        );
        break;
      case "postprocessing":
        navigate(
          `${getNavigationPrefix(
            process.processID
          )}service/manufacturing/postprocessing`
        );
        break;
    }
  };

  return (
    <Container width="full" direction="col">
      <Container
        direction="auto"
        justify="around"
        className="flex-wrap items-center md:items-start"
        width="full"
      >
        <Container direction="col" className="w-full md:w-fit">
          <Card
            className={`w-full flex-row flex-wrap md:w-fit ${
              process.serviceDetails.model === undefined
                ? "border-yellow-500"
                : "border-green-500"
            }`}
            onClick={(e) => handleOnClickCard(e, "model")}
          >
            <Text variant="body">
              {t(
                "Projects.Project.Process.ServicePreview.components.Manufacturing.model"
              )}
            </Text>
            <Text variant="body">
              {process.serviceDetails.model === undefined
                ? t(
                    "Projects.Project.Process.ServicePreview.components.Manufacturing.notSelected"
                  )
                : process.serviceDetails.model.fileName}
            </Text>
          </Card>
          {process.serviceDetails.model !== undefined ? (
            <PermissionGate element={"ProcessButtonModelPreView"}>
              <Button
                size="sm"
                onClick={handleOnClickButtonOpen}
                title={t(
                  "Projects.Project.Process.ServicePreview.components.Manufacturing.buttons.modelPreView"
                )}
              />
            </PermissionGate>
          ) : null}
        </Container>
        <Card
          className={`w-full flex-row flex-wrap md:w-fit ${
            process.serviceDetails.material === undefined
              ? "border-yellow-500"
              : "border-green-500"
          }`}
          onClick={(e) => handleOnClickCard(e, "material")}
        >
          <Text variant="body">
            {t(
              "Projects.Project.Process.ServicePreview.components.Manufacturing.material"
            )}
          </Text>
          <Text variant="body">
            {process.serviceDetails.material === undefined
              ? t(
                  "Projects.Project.Process.ServicePreview.components.Manufacturing.notSelected"
                )
              : process.serviceDetails.material.title}
          </Text>
        </Card>
        <Card
          className="w-full flex-row flex-wrap border-green-500 md:w-fit"
          onClick={(e) => handleOnClickCard(e, "postprocessing")}
        >
          <Text variant="body">
            {t(
              "Projects.Project.Process.ServicePreview.components.Manufacturing.postProcessings"
            )}
          </Text>
          <Text variant="body">
            {process.serviceDetails.postProcessings === undefined
              ? t(
                  "Projects.Project.Process.ServicePreview.components.Manufacturing.notSelected"
                )
              : process.serviceDetails.postProcessings.map(
                  (postProcessing: PostProcessingProps) => postProcessing.title
                )}
          </Text>
        </Card>
      </Container>
      <Container
        width="full"
        align="center"
        justify="center"
        direction="row"
        className="flex-wrap"
      >
        <Text>
          {t(
            "Projects.Project.Process.ServicePreview.components.Manufacturing.amount"
          )}
        </Text>
        {isProcessAtServiceStatus(process) ? (
          <input
            onChange={handleOnChangeInputAmount}
            type="number"
            value={process.processDetails.amount}
            className=" rounded-md border border-gray-300 p-2 text-center"
          />
        ) : (
          <Text>{process.processDetails.amount}</Text>
        )}
      </Container>
      <Modal
        modalKey="ModelPreview"
        open={open}
        closeModal={closeModal}
        className="h-full max-w-7xl bg-white"
      >
        <ModelDetails process={process} />
      </Modal>
    </Container>
  );
};

export default ProcessServiceManufacturing;
