import ViewInArIcon from "@mui/icons-material/ViewInAr";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";
import { Button, Container, Heading, Text } from "@component-library/index";
import { Modal } from "@component-library/index";
import logger from "@/hooks/useLogger";
import useUploadModels from "@/api/Service/AdditiveManufacturing/Model/Mutations/useUploadModels";
import useProcess from "@/hooks/Process/useProcess";
import { useProject } from "@/hooks/Project/useProject";
import ManufacturingModelUploadForms from "./components/Forms";

interface Props {}

export const ProcessModelUpload: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  const [formOpen, setFormOpen] = useState<boolean>(false);

  const { process } = useProcess();
  const { project } = useProject();
  const uploadModels = useUploadModels();
  const sendFiles = () => {
    uploadModels.mutate({
      processID: process.processID,
      projectID: project.projectID,
      models: files.map((file) => ({
        file: file,
        details: {
          tags: [],
          licenses: [],
          certificates: [],
          date: new Date(),
        },
      })),
    });
    setFormOpen(false);
  };

  const dataTypes: string[] = [
    ".STEP",
    ".STP",
    ".SLDPRT",
    ".STL",
    ".SAT",
    ".3DXML",
    ".3MF",
    ".PRT",
    ".IPT",
    ".CATPART",
    ".X_T",
    ".PTC",
    ".X_B",
    ".DXF",
  ];

  const handleChangeHiddenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleClickUploadCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    logger("Click on Upload Card");
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

  const handleDropOnUploadCard = function (
    e: React.DragEvent<HTMLAnchorElement>
  ) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const files: File[] = Array.from(e.dataTransfer.files);
    addFiles(files);
  };

  const deleteFile = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    setFiles([]);
  };

  const addFiles = (inputFiles: File[]): void => {
    setFiles(inputFiles);
    setFormOpen(true);
  };

  const closeForm = () => {
    logger("closeForm");
    setFormOpen(false);
  };

  return (
    <>
      <a
        className={`flex w-full grow flex-col items-center justify-center gap-2  
                     bg-white p-2 text-black transition
                    duration-300  hover:cursor-pointer hover:bg-türkis-200
                    ${dragActive ? "bg-türkis-200" : ""}
                    `}
        onClick={handleClickUploadCard}
        onDragEnter={handleDragOnUploadCard}
        onDragLeave={handleDragOnUploadCard}
        onDragOver={handleDragOnUploadCard}
        onDrop={handleDropOnUploadCard}
        title={t("Service.Manufacturing.Model.Upload.Upload.card.title")}
        href="#"
      >
        <UploadIcon className="h-40 w-40" />
        <Heading variant="h2">
          {t("Service.Manufacturing.Model.Upload.Upload.card.title")}
        </Heading>
        {t("Service.Manufacturing.Model.Upload.Upload.card.text")}
      </a>
      <input
        accept={dataTypes.map((type: string) => type).join(",")}
        type="file"
        ref={hiddenFileInput}
        onChange={handleChangeHiddenInput}
        className="hidden"
        multiple
      />
      {formOpen && files.length > 0 ? (
        <Modal modalKey="ManufacturingModelUploadForm" open={formOpen}>
          <ManufacturingModelUploadForms files={files} />
        </Modal>
      ) : null}
    </>
  );
};
