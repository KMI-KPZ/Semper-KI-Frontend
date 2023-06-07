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
        <div className="flex  w-1/2 flex-col items-center justify-center p-2">
          <Button
            style="secondary"
            size="full"
            to="/resources/printers"
            hrefText="/resources/printers"
            title={t("Home.HomeResourcesCard.link.printer")}
          >
            <div className="flex flex-col items-center justify-center gap-3 p-1">
              <PrinterIcon fill="" />
              <Text variant="body">
                {t("Home.HomeResourcesCard.link.printer")}
              </Text>
            </div>
          </Button>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center p-2">
          <Button
            style="secondary"
            size="full"
            to="/resources/materials"
            hrefText="/resources/materials"
            title={t("Home.HomeResourcesCard.link.material")}
          >
            <div className="flex flex-col items-center justify-center gap-3 p-1">
              <MetalIcon />
              <Text variant="body">
                {t("Home.HomeResourcesCard.link.material")}
              </Text>
            </div>
          </Button>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center p-2">
          <Button
            style="secondary"
            size="full"
            to="/resources/postprocessings"
            hrefText="/resources/postprocessings"
            title={t("Home.HomeResourcesCard.link.postprocessing")}
          >
            <div className="flex flex-col items-center justify-center gap-3 p-1">
              <BrushIcon />
              <Text variant="body">
                {t("Home.HomeResourcesCard.link.postprocessing")}
              </Text>
            </div>
          </Button>
        </div>
        <div className="flex w-1/2 flex-col items-center justify-center p-2">
          <Button
            style="secondary"
            size="full"
            to="/resources"
            hrefText="/resources"
            title={t("Home.HomeResourcesCard.link.overview")}
          >
            <div className="flex flex-col items-center justify-center gap-3 p-1">
              <HomeRepairServiceIcon />
              <Text variant="body">
                {t("Home.HomeResourcesCard.link.overview")}
              </Text>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HomeResourcesCard;
