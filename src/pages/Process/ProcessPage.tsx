import { Container, Heading } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProcessInfo from "./components/Info";
import useProcess from "@/hooks/Process/useProcess";
import Service from "./Service/Service";

interface ProcessPageProps {}

const ProcessPage: React.FC<ProcessPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  return (
    <Container direction="col" width="full">
      <Container width="full" className="bg-white p-2">
        <Heading variant="h1">{t("Process.ProcessPage.heading")}</Heading>
      </Container>
      <ProcessInfo process={process} />
      <Service process={process} />
    </Container>
  );
};

export default ProcessPage;
