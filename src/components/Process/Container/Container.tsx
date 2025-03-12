import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ActionContainer from "@/components/Process/Container/ActionContainer/ActionContainer";
import React, { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ProcessContainerHeader from "./Header";
import GrayContainer from "@component-library/Container/GrayContainer";

interface ProcessContainerProps {
  id: string;
  className?: string;
  menuChildren?: ReactNode;
  menuButtonTitle: string;
  pageTitle: string;
  start: ProcessStatus;
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
    menuButtonTitle,
    pageTitle,
    start,
    menuChildren,
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
            menuButtonTitle={menuButtonTitle}
            pageTitle={pageTitle}
          >
            {menuChildren}
          </ProcessContainerHeader>
        }
      >
        {children}
      </GrayContainer>
      <ActionContainer start={start} end={end} showDelete={showDelete} />
    </>
  );
};

export default ProcessContainer;
