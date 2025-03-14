import React from "react";
import ProcessContainer from "@/components/Process/Container/Container";
import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";

interface ProcessCompletedProps {}

const ProcessCompleted: React.FC<ProcessCompletedProps> = (props) => {
  const {} = props;

  return (
    <ProcessContainer
      id="Completed"
      titleAddition=""
      start={ProcessStatus.DELIVERY_COMPLETED}
    ></ProcessContainer>
  );
};

export default ProcessCompleted;
