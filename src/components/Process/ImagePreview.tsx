import React from "react";
import { Button, Container } from "@component-library/index";
import { Process } from "@/api/Process/Querys/useGetProcess";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface ProcessImagePreviewProps {
  process: Process;
  size?: "sm" | "md";
  className?: string;
}

const ProcessImagePreview: React.FC<ProcessImagePreviewProps> = (props) => {
  const { process, size = "sm", className } = props;
  const { t } = useTranslation();

  const [currentImage, setCurrentImage] = React.useState<number>(0);

  const handleOnClickNext = () => {
    setCurrentImage(
      (prev) => (prev + 1) % process.processDetails.imagePath.length
    );
  };

  const handleOnClickPrevious = () => {
    setCurrentImage(
      (prev) =>
        (prev - 1 + process.processDetails.imagePath.length) %
        process.processDetails.imagePath.length
    );
  };

  return (
    <Container
      width="fit"
      direction="col"
      className={twMerge(
        `relative  ${size === "sm" ? "w-40" : "w-60"} p-3`,
        className
      )}
    >
      {process.processDetails.imagePath.length > 1 ? (
        <Button
          title={t("general.previous")}
          variant="secondary"
          size="xs"
          className="absolute -left-1 rounded-full p-1"
          children={<KeyboardArrowLeftOutlinedIcon />}
          onClick={handleOnClickNext}
        />
      ) : null}
      <img
        src={process.processDetails.imagePath[currentImage]}
        alt=""
        className={`aspect-square ${
          size === "sm" ? "w-40" : "w-60"
        } rounded-md border-2 object-cover`}
      />
      {process.processDetails.imagePath.length > 1 ? (
        <Button
          title={t("general.next")}
          variant="secondary"
          size="xs"
          onClick={handleOnClickPrevious}
          className="absolute -right-1 rounded-full p-1"
          children={<KeyboardArrowRightOutlinedIcon />}
        />
      ) : null}
    </Container>
  );
};

export default ProcessImagePreview;
