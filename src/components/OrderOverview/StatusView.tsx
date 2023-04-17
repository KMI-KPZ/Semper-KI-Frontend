import React from "react";
import { EOrderState } from "../../interface/enums";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import FactoryIcon from "@mui/icons-material/Factory";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import EmailIcon from "@mui/icons-material/Email";
import { useTranslation } from "react-i18next";

interface Props {
  status: EOrderState;
}

const StatusView: React.FC<Props> = (props) => {
  const { status } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-5 p-5 w-full">
      <div
        className={`flex flex-col items-center justify-center p-3 rounded-xl ${
          status === 0
            ? "bg-orange text-white"
            : status > 0
            ? "bg-slate-200"
            : "bg-slate-100"
        }`}
      >
        <EmailIcon />
        <span>{t("orderview.state.requested")}</span>
      </div>
      <div
        className={`flex flex-col items-center justify-center p-3 rounded-xl ${
          status === 1
            ? "bg-orange text-white"
            : status > 1
            ? "bg-slate-200"
            : "bg-slate-100"
        }`}
      >
        <QuestionMarkIcon />
        <span>{t("orderview.state.verify")}</span>
      </div>
      <div
        className={`flex flex-col items-center justify-center p-3 rounded-xl ${
          status === 2 || status === 3
            ? "bg-orange text-white"
            : status > 3
            ? "bg-slate-200"
            : "bg-slate-100"
        }`}
      >
        {status === EOrderState.rejected ? <CloseIcon /> : <CheckIcon />}
        <span>
          {t(
            status === EOrderState.rejected
              ? "orderview.state.rejected"
              : "orderview.state.confirmed"
          )}
        </span>
      </div>
      <div
        className={`flex flex-col items-center justify-center p-3 rounded-xl ${
          status === 4
            ? "bg-orange text-white"
            : status > 4
            ? "bg-slate-200"
            : "bg-slate-100"
        }`}
      >
        <FactoryIcon />
        <span>{t("orderview.state.production")}</span>
      </div>
      <div
        className={`flex flex-col items-center justify-center p-3 rounded-xl ${
          status === 5
            ? "bg-orange text-white"
            : status > 5
            ? "bg-slate-200"
            : "bg-slate-100"
        }`}
      >
        <LocalShippingIcon />
        <span>{t("orderview.state.delivery")}</span>
      </div>
    </div>
  );
};

export default StatusView;
