import ViewInArIcon from "@mui/icons-material/ViewInAr";
import React, { useEffect, useRef, useState } from "react";
import { getFileSizeAsString } from "../../../services/utils";
import { useTranslation } from "react-i18next";
import { IconDelete, IconUpload } from "../../../constants/Icons";
import { useNavigate } from "react-router-dom";
import useModelUpload from "../../../hooks/useModelUpload";
import { IModel } from "../../../interface/Interface";
import LoadingAnimation from "../../Loading/LoadingAnimation";
import Button from "../../General/Button";
import Loading from "../../Loading/Loading";

interface Props {
  setProgress(path: string): void;
  createProcessItem(model?: IModel): void;
}

export const ModelUpload: React.FC<Props> = (props) => {
  const { setProgress, createProcessItem } = props;
  const { t } = useTranslation();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [error, setError] = useState<boolean>(false);

  const { uploadModels } = useModelUpload();
  const { status, error: uploadError } = uploadModels;
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
    if (e.target.files && e.target.files.length > 0) {
      for (let index = 0; index < e.target.files.length; index++) {
        addFile(e.target.files[index]);
      }
    }
  };

  const handleClickUploadCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
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
  };

  const createProcessItems = (modelList: IModel[]) => {
    if (modelList !== undefined && modelList.length > 0) {
      modelList.forEach((model) => createProcessItem(model));
    }
  };

  const handleClickNext = () => {
    if (fileList.length > 0) {
      uploadModels.mutate(fileList, {
        onSuccess(data) {
          createProcessItems(data);
          navigate("/process/model");
        },
      });
    } else {
      showError();
    }
  };

  useEffect(() => {
    if (error === true)
      setTimeout(() => {
        setError(false);
      }, 5000);
  }, [error]);

  return (
    <div className="flex flex-col p-5 gap-5 bg-white justify-center items-center">
      {error && <div className="error">{t("ModelUpload.upload.error")}</div>}
      <Loading
        error={uploadError}
        status={status}
        animation
        text
        loadingText="Upload..."
      >
        <div className="flex flex-row flex-wrap gap-5 justify-center items-center">
          {fileList.map((file: File, index: number) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-2 bg-gray-100 p-2"
            >
              <div className="canvas">
                <ViewInArIcon sx={{ fontSize: "90px", margin: "auto" }} />
              </div>
              {file.name}
              <div className="flex flex-row gap-2 items-center justify-center">
                {getFileSizeAsString(file.size)}
                <img
                  alt="button delete model"
                  src={IconDelete}
                  className="w-6 h-6 hover:cursor-pointer hover:bg-gray-300"
                  onClick={(e) => deleteFile(e, index)}
                />
              </div>
            </div>
          ))}
        </div>
        <div
          className="max-w-2xl bg-gray-100 flex flex-col items-center justify-center gap-2 p-2 hover:cursor-pointer hover:bg-gray-300"
          onClick={handleClickUploadCard}
          onDragEnter={handleDragOnUploadCard}
          onDragLeave={handleDragOnUploadCard}
          onDragOver={handleDragOnUploadCard}
          onDrop={handleDropOnUploadCard}
        >
          <input
            accept={dataTypes.map((type: string) => type).join(",")}
            type="file"
            multiple
            ref={hiddenFileInput}
            onChange={handleChangeHiddenInput}
            className="hidden"
          />
          <img src={IconUpload} className="h-40 w-40" alt="" />
          <h2>{t("ModelUpload.upload.card.headline")}</h2>
          {t("ModelUpload.card.text")}
        </div>
        <Button onClick={handleClickNext}>
          {t("ModelUpload.upload.next")}
        </Button>
      </Loading>
    </div>
  );
};
