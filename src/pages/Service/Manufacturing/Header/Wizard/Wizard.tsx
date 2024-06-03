import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ServiceManufacturingContext } from "../../Manufacturing";
import ManufacturingWizardItem from "./components/Item";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import ConstructionIcon from "@mui/icons-material/Construction";
import BrushIcon from "@mui/icons-material/Brush";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
interface Props {}

export const ServiceManufacturingWizard: React.FC<Props> = (props) => {
  const {} = props;
  const location = useLocation();
  const { t } = useTranslation();
  const getCount = (): [number, number] => {
    let count = 0;
    let total = 0;
    if (service.models !== undefined) {
      count++;
    }
    if (service.material !== undefined) {
      count++;
    }
    if (service.postProcessings !== undefined) {
      count++;
    }
    total = 3;
    return [count, total];
  };

  const { service } = useContext(ServiceManufacturingContext);
  const getCompletedButtonText = () => {
    const [count, total] = getCount();
    return count === total ? (
      <DoneAllOutlinedIcon />
    ) : (
      <>
        {count} / {total}
      </>
    );
  };

  return (
    <div className="flex flex-col items-center justify-around gap-5 sm:flex-row ">
      {/* <Button
        title={t("Service.Manufacturing.Header.Wizard.Wizard.overview")}
        children={<ArrowBackOutlinedIcon />}
        to="../.."
      /> */}
      <ManufacturingWizardItem
        title={t("Service.Manufacturing.Header.Wizard.Wizard.model")}
        completed={service.models !== undefined}
        icon={<ViewInArIcon />}
        active={location.pathname.includes("model")}
        to="model"
      />
      <ManufacturingWizardItem
        title={t("Service.Manufacturing.Header.Wizard.Wizard.material")}
        active={location.pathname.includes("material")}
        to="material"
        completed={service.material !== undefined}
        icon={<ConstructionIcon />}
      />
      <ManufacturingWizardItem
        title={t("Service.Manufacturing.Header.Wizard.Wizard.postprocessing")}
        active={location.pathname.includes("postprocessing")}
        to="postprocessing"
        completed={true}
        icon={<BrushIcon />}
      />

      {/* <Button
        title={t("Service.Manufacturing.Header.Wizard.Wizard.overview")}
        children={getCompletedButtonText()}
        to="../.."
        active={
          service.material !== undefined &&
          service.model !== undefined &&
          service.postProcessings !== undefined
        }
        variant={
          service.material !== undefined &&
          service.model !== undefined &&
          service.postProcessings !== undefined
            ? "primary"
            : "secondary"
        }
      /> */}
    </div>
  );
};
