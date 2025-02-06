import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ActionContainer from "@/components/Process/Container/ActionContainer/ActionContainer";
import React, { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ProcessHeader from "./Header";
import GrayContainer from "@component-library/Container/GrayContainer";

interface ProcessContainerProps {
  id: string;
  className?: string;
  menuChildren?: ReactNode;
  menuButtonTitle: string;
  pageTitle: string;
  start: ProcessStatus;
  end?: ProcessStatus;
  showActionContainer?: boolean;
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
  } = props;

  return (
    <>
      <GrayContainer
        direction="col"
        width="full"
        className={twMerge("relative rounded-md  ", className)}
        id={id}
        headerChildren={
          <ProcessHeader
            menuButtonTitle={menuButtonTitle}
            pageTitle={pageTitle}
          >
            {menuChildren}
          </ProcessHeader>
        }
      >
        {children}
      </GrayContainer>
      <ActionContainer start={start} end={end} />
    </>
  );
};

export default ProcessContainer;
