import React from "react";
import { ReactComponent as CheckIcon } from "@icons/Check.svg";
import { ReactComponent as QuestionMarkIcon } from "@icons/QuestionMark.svg";
import { ReactComponent as CloseIcon } from "@icons/X.svg";
import { EProcessStatusType } from "../types";
import { IProcessItem } from "../../types";

interface Props {
  process?: IProcessItem;
  statusType?: EProcessStatusType;
}

const ProcessHeaderStatusIcon: React.FC<Props> = (props) => {
  const { statusType, process } = props;
  let status: number = 0;

  if (process === undefined) status = statusType === undefined ? 0 : statusType;
  else if (
    process.model === undefined ||
    process.material === undefined ||
    process.postProcessings === undefined
  )
    status = 2;
  else status = 0;

  let className = "ok";
  let img = <CheckIcon />;
  switch (status) {
    case 0:
      className = "bg-green-300";
      img = <CheckIcon />;
      break;
    case 1:
      className = "bg-red-300";
      img = <CloseIcon />;
      break;
    case 2:
      className = "bg-amber-300";
      img = <QuestionMarkIcon />;
      break;
  }

  return (
    <div
      className={`flex h-4 w-4 flex-row items-center justify-center rounded-full  ${className}`}
      title={className}
    >
      {img}
    </div>
  );
};

export default ProcessHeaderStatusIcon;
