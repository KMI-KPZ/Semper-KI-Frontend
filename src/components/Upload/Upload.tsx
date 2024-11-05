import { Text } from "@component-library/index";
import { PropsWithChildren, useEffect, useRef, useState } from "react";
import { ReactComponent as UploadIcon } from "@icons/Upload.svg";
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
  const [error, setError] = useState<boolean>(false);

  const handleChangeHiddenInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
    }
  };

  const handleClickUploadCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (hiddenFileInput.current !== null) {
      hiddenFileInput.current.click();
    }
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
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const addFiles = (files: File[]): void => {
    mutation(files);
  };

  useEffect(() => {
    if (error === true)
      setTimeout(() => {
        setError(false);
      }, 5000);
  }, [error]);

  return (
    <>
      <input
        accept={dataTypes.map((type: string) => type).join(",")}
        type="file"
        multiple
        ref={hiddenFileInput}
        onChange={handleChangeHiddenInput}
        className="hidden"
      />
      <a
        className={`flex w-full grow flex-col items-center justify-center gap-2  
      rounded-md border-2 bg-white p-2 text-black transition duration-300
      hover:cursor-pointer  hover:bg-türkis-200 
   ${dragActive ? "bg-türkis-200" : ""}
   
   `}
        onClick={handleClickUploadCard}
        onDragEnter={handleDragOnUploadCard}
        onDragLeave={handleDragOnUploadCard}
        onDragOver={handleDragOnUploadCard}
        onDrop={handleDropOnUploadCard}
        href="#"
        title={t("components.Upload.title")}
      >
        {icon === true ? (
          <UploadIcon className="h-10 w-10 md:h-24 md:w-24" />
        ) : null}
        {children === undefined ? (
          <>
            <Text>
              {t("components.Upload.title", {
                count: multiple === true ? 2 : 1,
              })}
            </Text>
            <Text>{t("components.Upload.subTitle")}</Text>
          </>
        ) : (
          children
        )}
      </a>
    </>
  );
};
