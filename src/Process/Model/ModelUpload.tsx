import "../../styles.scss";
import "./Model.scss";
import "../ProcessView.scss";
import BackupIcon from "@mui/icons-material/Backup";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import React, { useRef, useState } from "react";
import { Process, ProcessState } from "../../Interface";
import { getFileSizeAsString } from "../../utils";
import { useTranslation } from "react-i18next";

interface Props {
  state: ProcessState;
  addProcessList: (process: Process[]) => void;
  setProgressState: (progressStateIndex: number) => void;
  selectProcess: (id: number) => void;
}

export const ModelUpload = ({
  state,
  addProcessList,
  setProgressState,
  selectProcess,
}: Props) => {
  const { t } = useTranslation();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [error, setError] = useState<boolean>(false);

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

  const handleChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      addFile(e.target.files[0]);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };

  const handleDrag = function (e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = function (e: React.DragEvent<HTMLDivElement>) {
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
    setTimeout(() => {
      setError(false);
    }, 5000);
  };

  const handleClickNext = () => {
    let processList: Process[] = [];
    fileList.forEach((file: File, index: number) => {
      processList.push({
        processId: state.nextID + index,
        model: { file: file },
      });
    });
    if (processList.length > 0) {
      addProcessList(processList);
      selectProcess(processList[0].processId);
      setProgressState(1);
    } else {
      showError();
    }
  };

  return (
    <div className="process-content-container">
      <div className="headline dark">{t("model.upload.headline")}</div>
      {error && <div className="error">{t("model.upload.error")}</div>}
      {fileList.map((file: File, index: number) => (
        <div key={index} className="file normal">
          <div className="canvas">
            <ViewInArIcon sx={{ fontSize: "90px", margin: "auto" }} />
          </div>
          {file.name}
          <br />( {getFileSizeAsString(file.size)} )
          <DeleteIcon
            className="delete-button"
            onClick={(e) => deleteFile(e, index)}
            sx={{ fontSize: "40px" }}
          />
        </div>
      ))}
      <div
        className="upload normal"
        onClick={handleClick}
        onDragEnter={handleDrag}
      >
        <input
          type="file"
          ref={hiddenFileInput}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        {dragActive && (
          <div
            className="drag-file-element"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          ></div>
        )}
        <BackupIcon sx={{ fontSize: 90 }} />
        <div className="header">{t("model.upload.card.headline")}</div>
        {t("model.upload.card.text")}
      </div>
      <div className="next-button dark" onClick={handleClickNext}>
        {t("model.upload.next")}
      </div>
    </div>
  );
};
