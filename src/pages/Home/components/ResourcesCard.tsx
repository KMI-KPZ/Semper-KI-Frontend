import { Divider } from "@component-library/Divider";
import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { ReactComponent as PrinterIcon } from "@icons/3DPrinter.svg";
import { ReactComponent as MetalIcon } from "@icons/Metal.svg";
import BrushIcon from "@mui/icons-material/Brush";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import { Button } from "@component-library/Button";

interface HomeResourcesProps {
  className?: string;
}

const HomeResourcesCard: React.FC<HomeResourcesProps> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <div
      className={`flex flex-col items-center justify-start gap-5 p-3 ${className}`}
    >
      <Heading variant="h2">{t("Home.HomeResourcesCard.header")}</Heading>
      <Divider />
      <div className="flex flex-row flex-wrap items-start justify-center">
        <div className="flex w-full flex-col items-center justify-center p-2 lg:w-1/2">
          <Button
            width="full"
            variant="secondary"
            to="/resources/printers"
            startIcon={<PrinterIcon />}
            title={t("Home.HomeResourcesCard.link.printer")}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center p-2 lg:w-1/2">
          <Button
            width="full"
            variant="secondary"
            to="/resources/materials"
            startIcon={<MetalIcon />}
            title={t("Home.HomeResourcesCard.link.material")}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center p-2 lg:w-fit">
          <Button
            width="full"
            variant="secondary"
            to="/resources/postprocessings"
            startIcon={<BrushIcon />}
            title={t("Home.HomeResourcesCard.link.postprocessing")}
          />
        </div>
      </div>
      <Button
        width="full"
        startIcon={<HomeRepairServiceIcon />}
        variant="primary"
        to="/resources"
        title={t("Home.HomeResourcesCard.link.overview")}
      />
    </div>
  );
};

export default HomeResourcesCard;
