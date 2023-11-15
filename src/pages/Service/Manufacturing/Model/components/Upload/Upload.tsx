import ViewInArIcon from "@mui/icons-material/ViewInAr";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";
import { ReactComponent as DeleteIcon } from "@icons/Delete.svg";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@component-library/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LoadingAnimation } from "@component-library/Loading";
import { getFileSizeAsString } from "@/services/utils";
import { Heading } from "@component-library/Typography";
import useModelUpload from "../../hooks/useModelUpload";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";
import { set } from "react-hook-form";
import Container from "@component-library/Container";
import Modal from "@component-library/Modal";
import logger from "@/hooks/useLogger";
import ManufacturingModelUploadForm from "./components/Form";

interface Props {}

export const ProcessModelUpload: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File>();

  const [formOpen, setFormOpen] = useState<boolean>(false);

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
    if (e.target.files && e.target.files.length > 0) {
      addFile(e.target.files[0]);
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
    const newFile: File = e.dataTransfer.files[0];
    addFile(newFile);
  };

  const deleteFile = (e: React.MouseEvent<SVGSVGElement, MouseEvent>): void => {
    setFile(undefined);
  };

  const addFile = (inputFile: File): void => {
    setFile(inputFile);
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
      />
      {formOpen ? (
        <Modal
          title="ManufacturingModelUploadForm"
          open={formOpen}
          closeModal={closeForm}
          children={
            file === undefined ? null : (
              <ManufacturingModelUploadForm file={file} />
            )
          }
        />
      ) : null}
    </>
  );
};
