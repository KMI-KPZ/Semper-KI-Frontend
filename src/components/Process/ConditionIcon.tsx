import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

interface ProcessConditionIconProps {
  error: boolean;
}

const ProcessConditionIcon: React.FC<ProcessConditionIconProps> = (props) => {
  const { error } = props;

  return error ? (
    <CancelOutlinedIcon className="text-orange-500" />
  ) : (
    <CheckCircleOutlineIcon className="text-green-500" />
  );
};

export default ProcessConditionIcon;
