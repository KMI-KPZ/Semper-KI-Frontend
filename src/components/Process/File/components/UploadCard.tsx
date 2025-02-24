import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading } from "@component-library/index";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";

interface ProcessUploadCardProps {
  addFiles: (files: File[]) => void;
  title?: string;
  subTitle?: string;
  icon?: React.ReactNode;
  showIcon?: boolean;
  fileTypes?: string[];
}

const ProcessUploadCard: React.FC<ProcessUploadCardProps> = (props) => {
  const { t } = useTranslation();
  const {
    addFiles,
    title = t("components.Process.File.components.UploadCard.heading"),
    subTitle = t("components.Process.File.components.UploadCard.subHeading"),
    icon = <UploadIcon className="h-20 w-20" />,
    showIcon = true,
    fileTypes = ["*"],
  } = props;
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleChangeHiddenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      const files: File[] = Array.from(e.target.files);
      addFiles(files);
    }
  };

  const handleDropOnUploadCard = function (
    e: React.DragEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files: File[] = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const handleClickUploadCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    // logger("Click on Upload Card");
    hiddenFileInput.current?.click();
  };

  const handleDragOnUploadCard = function (
    e: React.DragEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  return (
    <Container width="full">
      <a
        className={`flex w-full grow flex-col items-center justify-center
                    gap-2 rounded-md  border-2 bg-white
                    p-2 text-black transition duration-300
                    hover:cursor-pointer  hover:bg-türkis-200 md:max-w-xl
                    ${dragActive ? "bg-türkis-200" : ""}
                    `}
        onClick={handleClickUploadCard}
        onDragEnter={handleDragOnUploadCard}
        onDragLeave={handleDragOnUploadCard}
        onDragOver={handleDragOnUploadCard}
        onDrop={handleDropOnUploadCard}
        title={t("components.Process.File.components.UploadCard.heading")}
        href="#"
      >
        {showIcon ? icon : null}
        <Heading variant="h2">{title}</Heading>
        {subTitle}
      </a>
      <input
        accept={fileTypes.map((type: string) => type).join(",")}
        type="file"
        ref={hiddenFileInput}
        onChange={handleChangeHiddenInput}
        className="hidden"
        multiple
      />
    </Container>
  );
};

export default ProcessUploadCard;
