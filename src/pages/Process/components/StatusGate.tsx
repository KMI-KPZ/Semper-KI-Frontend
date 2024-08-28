import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import useProcess from "@/hooks/Process/useProcess";
import React, { PropsWithChildren } from "react";

interface ProcessStatusGateProps {
  start?: ProcessStatus;
  end?: ProcessStatus;
}

const ProcessStatusGate: React.FC<PropsWithChildren<ProcessStatusGateProps>> = (
  props
) => {
  const { end, start, children } = props;
  const { process } = useProcess();

  if (end === undefined && start === undefined) return children;
  if (
    end !== undefined &&
    start !== undefined &&
    process.processStatus >= start &&
    process.processStatus <= end
  )
    return children;
  if (
    end === undefined &&
    start !== undefined &&
    process.processStatus >= start
  )
    return children;
  if (end !== undefined && start === undefined && process.processStatus <= end)
    return children;
  return null;
};

export default ProcessStatusGate;
