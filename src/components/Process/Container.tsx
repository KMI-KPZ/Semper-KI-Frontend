import { Container } from "@component-library/index";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface ProcessContainerProps {
  id: string;
  className?: string;
}

const ProcessContainer: React.FC<PropsWithChildren<ProcessContainerProps>> = (
  props
) => {
  const { children, id, className = "" } = props;
  const { t } = useTranslation();

  return (
    <Container
      direction="col"
      width="full"
      className={twMerge("relative bg-white p-3", className)}
      id={id}
    >
      {children}
    </Container>
  );
};

export default ProcessContainer;
