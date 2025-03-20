import {
  ProcessOrigin,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import ActionContainer from "@/components/Process/Container/ActionContainer/ActionContainer";
import React, { PropsWithChildren } from "react";
import { twMerge } from "tailwind-merge";
import ProcessContainerHeader from "./Header";
import GrayContainer from "@component-library/Container/GrayContainer";

interface ProcessContainerProps {
  id: ProcessOrigin;
  className?: string;
  start: ProcessStatus;
  titleAddition?: string;
  end?: ProcessStatus;
  showDelete?: boolean;
}

const ProcessContainer: React.FC<PropsWithChildren<ProcessContainerProps>> = (
  props
) => {
  const {
    children,
    id,
    className = "",
    end,
    titleAddition = "",
    start,
    showDelete = false,
  } = props;

  const [open, setOpen] = React.useState(true);

  const toggleOpen = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <GrayContainer
        open={open}
        direction="col"
        width="full"
        className={twMerge("relative rounded-md  ", className)}
        id={id}
        headerChildren={
          <ProcessContainerHeader
            id={id}
            open={open}
            toggleOpen={toggleOpen}
            titleAddition={titleAddition}
          />
        }
      >
        {children}
      </GrayContainer>
      <ActionContainer start={start} end={end} showDelete={showDelete} />
    </>
  );
};

export default ProcessContainer;
