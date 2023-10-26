import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { useTranslation } from "react-i18next";
import { ServiceManufacturingContext } from "../../Manufacturing";
import { Text } from "@component-library/Typography";
import Container from "@component-library/Container";
import logger from "@/hooks/useLogger";
import useService from "@/pages/Service/hooks/useService";
import ManufacturingWizardItem from "./components/Item";
interface Props {}

export const ServiceManufacturingWizard: React.FC<Props> = (props) => {
  const {} = props;
  const location = useLocation();
  const { t } = useTranslation();

  const { service } = useContext(ServiceManufacturingContext);
  // logger("ServiceManufacturingWizard | service", service);
  const { isServiceComplete } = useService();

  const { getCurrentProcess } = useProcess();
  return (
    <div className="flex flex-col items-center justify-around gap-5 sm:flex-row ">
      <ManufacturingWizardItem
        title={t("Service.Manufacturing.Header.Wizard.Wizard.model")}
        active={location.pathname.includes("model")}
        to="model"
      >
        <Container direction="col">
          <Text variant="body">
            {t("Service.Manufacturing.Header.Wizard.Wizard.model")}
          </Text>
          <Text variant="body">
            {t(
              service.model !== undefined
                ? service.model.title
                : "Service.Manufacturing.Header.Wizard.Wizard.empty"
            )}
          </Text>
        </Container>
      </ManufacturingWizardItem>
      <ManufacturingWizardItem
        title={t("Service.Manufacturing.Header.Wizard.Wizard.material")}
        active={location.pathname.includes("material")}
        to="material"
      >
        <Container direction="col">
          <Text variant="body">
            {t("Service.Manufacturing.Header.Wizard.Wizard.material")}
          </Text>
          <Text variant="body">
            {service.material !== undefined
              ? service.material.title
              : t("Service.Manufacturing.Header.Wizard.Wizard.empty")}
          </Text>
        </Container>
      </ManufacturingWizardItem>
      <ManufacturingWizardItem
        title={t("Service.Manufacturing.Header.Wizard.Wizard.postprocessing")}
        active={location.pathname.includes("postprocessing")}
        to="postprocessing"
      >
        <Container direction="col">
          <Text variant="body">
            {t("Service.Manufacturing.Header.Wizard.Wizard.material")}
          </Text>
          <Text variant="body">
            {service.postProcessings === undefined
              ? 0
              : service.postProcessings.length}
          </Text>
        </Container>
      </ManufacturingWizardItem>
      <ManufacturingWizardItem
        title={t("Service.Manufacturing.Header.Wizard.Wizard.overview")}
        to="../.."
      >
        <Container direction="col">
          <Text variant="body">
            {t("Service.Manufacturing.Header.Wizard.Wizard.overview")}
          </Text>
          <Text variant="body">
            {t(
              isServiceComplete(getCurrentProcess()!.processID)
                ? "Service.Manufacturing.Header.Wizard.Wizard.ready"
                : "Service.Manufacturing.Header.Wizard.Wizard.notReady"
            )}
          </Text>
        </Container>
      </ManufacturingWizardItem>
    </div>
  );
};
