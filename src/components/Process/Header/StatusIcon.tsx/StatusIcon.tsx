import React from "react";
import { IconCheck, IconQuestionMark, IconX } from "../../../../config/Icons";
import { EProcessStatusType } from "../../../../interface/enums";
import { IProcess } from "../../../../interface/Interface";
import "./StatusIcon.scss";

interface Props {
  process?: IProcess;
  statusType?: EProcessStatusType;
}

const StatusIcon: React.FC<Props> = (props) => {
  const { statusType, process } = props;
  let status: number = 0;

  if (process === undefined) status = statusType === undefined ? 0 : statusType;
  else if (
    process.model === undefined ||
    process.material === undefined ||
    process.procedure === undefined ||
    process.manufacturer === undefined ||
    process.postProcessing === undefined ||
    process.additive === undefined
  )
    status = 2;
  else status = 0;

  let className = "ok";
  let img = IconCheck;
  switch (status) {
    case 0:
      className = "ok";
      img = IconCheck;
      break;
    case 1:
      className = "error";
      img = IconX;
      break;
    case 2:
      className = "missing";
      img = IconQuestionMark;
      break;
  }

  return (
    <div className={`status-icon ${className}`}>
      <img className="status-icon-img" src={img} />
    </div>
  );
};

export default StatusIcon;
