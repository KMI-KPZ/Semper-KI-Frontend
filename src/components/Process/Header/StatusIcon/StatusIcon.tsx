import React from "react";
import {
  IconCheck,
  IconQuestionMark,
  IconX,
} from "../../../../constants/Icons";
import { EProcessStatusType } from "../../../../interface/enums";
import { IProcessItem } from "../../../../interface/Interface";

interface Props {
  process?: IProcessItem;
  statusType?: EProcessStatusType;
}

const StatusIcon: React.FC<Props> = (props) => {
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
  let img = IconCheck;
  switch (status) {
    case 0:
      className = "bg-green-300";
      img = IconCheck;
      break;
    case 1:
      className = "bg-red-300";
      img = IconX;
      break;
    case 2:
      className = "bg-amber-300";
      img = IconQuestionMark;
      break;
  }

  return (
    <div
      className={`flex flex-row justify-center items-center rounded-full h-4 w-4  ${className}`}
      title={className}
    >
      <img className="w-2 h-2" src={img} alt={`status ${className}`} />
    </div>
  );
};

export default StatusIcon;
