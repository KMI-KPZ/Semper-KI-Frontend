import { Heading, Text } from "@component-library/Typography";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";
import { useTranslation } from "react-i18next";
import logger from "@/hooks/useLogger";

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
      addFiles(Array.from(e.target.files));
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
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const showError = () => {
    setError(true);
  };

  const addFiles = (files: File[]): void => {
    logger("Upload", "addFiles", files);
    mutation(files);
  };

  useEffect(() => {
    if (error === true)
      setTimeout(() => {
        setError(false);
      }, 5000);
  }, [error]);

  return (
    <div
      className={`flex w-full grow flex-col items-center justify-center gap-2  
    rounded-xl border-2 bg-white p-2 text-black transition duration-300
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
      {children === undefined ? (
        <>
          <Text>
            {t("components.Upload.title", { count: multiple === true ? 2 : 1 })}
          </Text>
          <Text>{t("components.Upload.subTitle")}</Text>
        </>
      ) : (
        children
      )}
    </div>
  );
};
