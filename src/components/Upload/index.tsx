import useModelUpload from "@/pages/Service/Manufacturing/Model/hooks/useModelUpload";
import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import { UseMutationResult } from "@tanstack/react-query";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";
import { ReactComponent as DeleteIcon } from "@icons/Delete.svg";
import { LoadingAnimation } from "@component-library/index";
import { useTranslation } from "react-i18next";

interface Props {
  multiple?: boolean;
  dataTypes?: string[];
  icon?: boolean;
  mutation(files: File[]): void;
}

export const Upload: React.FC<PropsWithChildren<Props>> = (props) => {
  const {
    children,
    dataTypes = [],
    multiple = false,
    mutation,
    icon = false,
  } = props;
  const { t } = useTranslation();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const [error, setError] = useState<boolean>(false);

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

  const showError = () => {
    setError(true);
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

  useEffect(() => {
    if (error === true)
      setTimeout(() => {
        setError(false);
      }, 5000);
  }, [error]);

  const handleClickNext = () => {};

  return (
    <div
      className={`flex w-full grow flex-col items-center justify-center gap-2  
    rounded-xl border-2 bg-white p-2 text-slate-800 transition duration-300
   hover:cursor-pointer  hover:bg-türkis-200 
   ${dragActive ? "bg-türkis-200" : ""}
   
   `}
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
      {icon === true ? (
        <UploadIcon className="h-10 w-10 md:h-32 md:w-32" />
      ) : null}
      {children}
    </div>
  );
};
