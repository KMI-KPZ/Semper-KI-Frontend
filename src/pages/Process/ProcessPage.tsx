import { Container, Heading } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ProcessInfo from "./components/Info";
import useProcess from "@/hooks/Process/useProcess";
import Service from "./Service/Service";
import StatusWizard from "./StatusWizard/StatusWizard";

interface ProcessPageProps {}

const ProcessPage: React.FC<ProcessPageProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { process } = useProcess();

  return (
    <Container direction="col" width="full" className="relative">
      <Container width="full" className="bg-white p-2">
        <Heading variant="h1">{t("Process.ProcessPage.heading")}</Heading>
      </Container>
      <ProcessInfo process={process} />
      <Container width="full" direction="row" align="start">
        <StatusWizard process={process} />
        <Container direction="col" width="full">
          <Service process={process} />
        </Container>
      </Container>
    </Container>
  );
};

export default ProcessPage;
