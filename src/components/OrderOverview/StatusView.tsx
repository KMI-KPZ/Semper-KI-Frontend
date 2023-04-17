import React, { ReactNode } from "react";
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

interface StatusData {
  key: EOrderState;
  icon: ReactNode;
  text: string;
}

const statusData: StatusData[] = [
  {
    key: EOrderState.requested,
    icon: <EmailIcon />,
    text: "orderview.state.requested",
  },
  {
    key: EOrderState.verify,
    icon: <QuestionMarkIcon />,
    text: "orderview.state.verify",
  },
  {
    key: EOrderState.rejected,
    icon: <CloseIcon />,
    text: "orderview.state.rejected",
  },
  {
    key: EOrderState.confirmed,
    icon: <CheckIcon />,
    text: "orderview.state.confirmed",
  },
  {
    key: EOrderState.production,
    icon: <FactoryIcon />,
    text: "orderview.state.production",
  },
  {
    key: EOrderState.delivery,
    icon: <LocalShippingIcon />,
    text: "orderview.state.delivery",
  },
];

const StatusView: React.FC<Props> = (props) => {
  const { status } = props;
  const { t } = useTranslation();

  const renderStatusItem = (statusData: StatusData, index: number) => {
    if (
      (status === EOrderState.rejected &&
        statusData.key === EOrderState.confirmed) ||
      (status === EOrderState.confirmed &&
        statusData.key === EOrderState.rejected) ||
      (status !== EOrderState.rejected &&
        status !== EOrderState.confirmed &&
        statusData.key === EOrderState.rejected)
    )
      return;
    return (
      <React.Fragment key={index}>
        {index !== 0 ? (
          <div
            className={`border-l-2 h-2 md:border-t-2 md:w-5  ${
              status >= statusData.key
                ? "border-orange-200"
                : "border-slate-100"
            } `}
          />
        ) : null}
        <div
          className={`flex flex-col items-center justify-center p-3 rounded-xl ${
            status === statusData.key
              ? "bg-orange text-white"
              : status > statusData.key
              ? "bg-orange-200"
              : "bg-slate-100"
          }`}
        >
          {statusData.icon}
          <span className="text-center">{t(statusData.text)}</span>
        </div>
      </React.Fragment>
    );
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center p-5 w-full">
      {statusData.map((statusData: StatusData, index) =>
        renderStatusItem(statusData, index)
      )}
    </div>
  );
};

export default StatusView;
