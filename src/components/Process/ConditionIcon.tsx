import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface ProcessConditionIconProps {
  error: boolean;
  info?: boolean;
}

const ProcessConditionIcon: React.FC<ProcessConditionIconProps> = (props) => {
  const { error, info = false } = props;

  if (info) return <InfoOutlinedIcon className="text-blue-500" />;
  return error ? (
    <CancelOutlinedIcon className="text-orange-500" />
  ) : (
    <CheckCircleOutlineIcon className="text-green-500" />
  );
};

export default ProcessConditionIcon;
