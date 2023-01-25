import "../ProcessView.scss";
import "./Additive.scss";
import React, { useRef } from "react";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { IAdditive, IProcess } from "../../../interface/Interface";
import { useTranslation } from "react-i18next";

interface Props {
  processList: IProcess[];
  selectAdditive: (additive: IAdditive) => void;
}

export const AdditiveView = ({ selectAdditive, processList }: Props) => {
  const { t } = useTranslation();
  const refUpload = useRef<HTMLInputElement>(null);

  const handleUploadClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (refUpload.current) {
      refUpload.current.click();
    }
  };

  const handleClickNext = () => {};

  return (
    <div className="process-content-container">
      <div className="content-box">
        <div className="additive-headline">{t("additive.upload-headline")}</div>
        <div className="additive-upload" onClick={handleUploadClick}>
          <UploadFileIcon className="additive-upload-icon" />
        </div>
        <input type="file" ref={refUpload} hidden />
      </div>
      <div className="content-box">
        <div className="additive-headline">
          {t("additive.additional-text.headline")}
        </div>
        <textarea
          placeholder={t("additive.additional-text.placeholder")}
          className="additive-text-input"
        />
      </div>
      <div className="next-button dark" onClick={handleClickNext}>
        {t("additive.next")}
      </div>
    </div>
  );
};
