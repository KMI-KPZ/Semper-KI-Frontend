import { ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ActionContainer from "@/components/Process/Container/ActionContainer/ActionContainer";
import { Container } from "@component-library/index";
import React, { PropsWithChildren, ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import ProcessHeader from "./Header";

interface ProcessContainerProps {
  id: string;
  className?: string;
  menuChildren?: ReactNode;
  menuButtonTitle: string;
  pageTitle: string;
  start: ProcessStatus;
  end?: ProcessStatus;
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
      <Container
        direction="col"
        width="full"
        className={twMerge("relative   bg-white p-3", className)}
        id={id}
      >
        <ProcessHeader menuButtonTitle={menuButtonTitle} pageTitle={pageTitle}>
          {menuChildren}
        </ProcessHeader>
        {children}
      </Container>
      <ActionContainer start={start} end={end} />
    </>
  );
};

export default ProcessContainer;
