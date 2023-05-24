import ViewInArIcon from "@mui/icons-material/ViewInAr";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";
import { ReactComponent as DeleteIcon } from "@icons/Delete.svg";
import { useNavigate } from "react-router-dom";
import { Button } from "@component-library/Button";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { LoadingAnimation } from "@component-library/Loading";
import useModelUpload from "@/hooks/useModelUpload";
import { IModel } from "@/interface/Interface";
import { getFileSizeAsString } from "@/services/utils";

interface Props {
  setProgress(path: string): void;
  createProcessItemFromModels(models: IModel[], index: number): void;
  activeItemIndex: number;
}

export const ModelUpload: React.FC<Props> = (props) => {
  const { setProgress, createProcessItemFromModels, activeItemIndex } = props;
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
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
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
    console.log(fileList, modelList);

    createProcessItemFromModels(modelList, activeItemIndex);
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
    <div className="flex flex-col items-center justify-center gap-5 bg-white p-5">
      {error && (
        <div className="error">{t("Process.Model.ModelUpload.error")}</div>
      )}

      <div className="flex flex-row flex-wrap items-center justify-center gap-5">
        {fileList.map((file: File, index: number) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center gap-2 bg-gray-100 p-2"
          >
            <div className="canvas">
              <ViewInArIcon sx={{ fontSize: "90px", margin: "auto" }} />
            </div>
            {file.name}
            <div className="flex flex-row items-center justify-center gap-2">
              {getFileSizeAsString(file.size)}
              <DeleteIcon
                className="h-6 w-6 hover:cursor-pointer hover:bg-gray-300"
                onClick={(e) => deleteFile(e, index)}
              />
            </div>
          </div>
        ))}
      </div>
      {status === "loading" ? (
        <div className="pt-5">
          <LoadingAnimation />
          <span>{t("Process.Model.ModelUpload.loading")}</span>
        </div>
      ) : (
        <div
          className="flex max-w-2xl flex-col items-center justify-center gap-2 bg-gray-100 p-2 hover:cursor-pointer hover:bg-gray-300"
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
          <UploadIcon className="h-40 w-40" />
          <h2>{t("Process.Model.ModelUpload.card.header")}</h2>
          {t("Process.Model.ModelUpload.card.text")}
        </div>
      )}

      <Button onClick={handleClickNext} icon={<FileUploadIcon />}>
        {t("Process.Model.ModelUpload.button.upload")}
      </Button>
    </div>
  );
};
