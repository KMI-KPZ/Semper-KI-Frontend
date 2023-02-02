import "../../../styles.scss";
import "./Model.scss";
import "../ProcessView.scss";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import React, { useEffect, useRef, useState } from "react";
import { IProcess } from "../../../interface/Interface";
import { getFileSizeAsString } from "../../../services/utils";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import { IconDelete, IconUpload } from "../../../config/Icons";
import { Navigate, useNavigate } from "react-router-dom";

interface Props {
  addProcessList: (process: IProcess[]) => void;
  setProgress(path: string): void;
}

export const ModelUpload = ({ addProcessList, setProgress }: Props) => {
  const { t } = useTranslation();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [error, setError] = useState<boolean>(false);
  const navigate = useNavigate();
  useEffect(() => {
    setProgress("upload");
  }, []);

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
    if (e.target.files && e.target.files[0]) {
      addFile(e.target.files[0]);
    }
  };

  const handleClickUploadCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    console.log("Click Card", hiddenFileInput.current);

    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.click();
    }
  };

  const handleDragOnUploadCard = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDropOnUploadCard = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const newFiles: File[] = Array.from(e.dataTransfer.files);
      addFile(newFiles);
    }
  };

  const deleteFile = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>,
    index: number
  ): void => {
    setFileList((prevState) =>
      prevState.filter((file: File, fileIndex: number) => index !== fileIndex)
    );
  };

  const addFile = (inputFile: File | File[]): void => {
    let files: File[];
    files =
      inputFile.constructor === Array
        ? [...inputFile]
        : inputFile instanceof File
        ? [inputFile]
        : [];
    files.forEach((file: File) => {
      new RegExp("(" + dataTypes.join("|").replace(/\./g, "\\.") + ")$").test(
        file.name.toUpperCase()
      )
        ? setFileList((prevState) => [...prevState, file])
        : showError();
    });
  };

  const showError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
  };

  const handleClickNext = () => {
    addProcessList(
      fileList.map((file: File) => ({
        title: file.name,
        model: {
          name: file.name,
          certificate: [""],
          date: "",
          license: "",
          tags: [],
          URI: "",
        },
      }))
    );
    navigate("/process/model");
  };

  return (
    <div className="model-upload">
      {error && <div className="error">{t("model.upload.error")}</div>}
      <div className="model-upload-files">
        {fileList.map((file: File, index: number) => (
          <div key={index} className="model-upload-file">
            <div className="canvas">
              <ViewInArIcon sx={{ fontSize: "90px", margin: "auto" }} />
            </div>
            {file.name}
            <div className="model-upload-file-row">
              {getFileSizeAsString(file.size)}
              <img
                src={IconDelete}
                className="model-delete-icon"
                onClick={(e) => deleteFile(e, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="model-upload-card"
        onClick={handleClickUploadCard}
        onDragEnter={handleDragOnUploadCard}
        onDragLeave={handleDragOnUploadCard}
        onDragOver={handleDragOnUploadCard}
        onDrop={handleDropOnUploadCard}
      >
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChangeHiddenInput}
          style={{ display: "none" }}
        />
        {/* {dragActive && (
          <div
            className="drag-file-element"
            onDragEnter={handleDragOnUploadCard}
            onDragLeave={handleDragOnUploadCard}
            onDragOver={handleDragOnUploadCard}
            onDrop={handleDropOnUploadCard}
          ></div>
        )} */}
        <img src={IconUpload} className="model-upload-icon" />
        <h2>{t("model.upload.card.headline")}</h2>
        {t("model.upload.card.text")}
      </div>
      <Button
        variant="contained"
        className="model-upload-button"
        onClick={handleClickNext}
      >
        {t("model.upload.next")}
      </Button>
    </div>
  );
};
