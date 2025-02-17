import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import React, { PropsWithChildren } from "react";

interface ProcessStatusGateProps {
  start?: ProcessStatus;
  end?: ProcessStatus;
  startExclude?: boolean;
  endExclude?: boolean;
}

const ProcessStatusGate: React.FC<PropsWithChildren<ProcessStatusGateProps>> = (
  props
) => {
  const {
    end,
    start,
    children,
    endExclude = false,
    startExclude = false,
  } = props;
  const { process } = useProcess();

  const isWithinRange = (status: ProcessStatus) => {
    const isAfterStart = startExclude ? status > start! : status >= start!;
    const isBeforeEnd = endExclude ? status < end! : status <= end!;

    if (start !== undefined && end !== undefined) {
      return isAfterStart && isBeforeEnd;
    }
    if (start !== undefined) {
      return isAfterStart;
    }
    if (end !== undefined) {
      return isBeforeEnd;
    }
    return true;
  };

  return isWithinRange(process.processStatus) ? children : null;
};

export default ProcessStatusGate;
