import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";
import ProcessContainer from "@/components/Process/Container";
import {
  ModelFileDescriptionProps,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";

import useProcess from "@/hooks/Process/useProcess";
import OwnerGate from "@/components/OwnerGate/OwnerGate";
import ProcessFileTable from "./components/FileTable";
import ProcessUploadCard from "@/components/Process/UploadCard";

interface ProcessContractProps {}

const ProcessContract: React.FC<ProcessContractProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [files, setFiles] = React.useState<File[]>([]);
  const { process } = useProcess();

  const addFiles = (newFiles: File[]) => {
    setFiles((prevState) => [...prevState, ...newFiles]);
  };

  const convertFiles = (files: File[]): ModelFileDescriptionProps[] =>
    files.map(
      (file): ModelFileDescriptionProps => ({
        fileName: file.name,
        date: new Date(),
        createdBy: "User",
        certificates: [],
        id: "",
        licenses: [],
        path: "",
        tags: [],
        title: "",
        URI: "",
      })
    );

  return (
    <ProcessContainer
      id="offer"
      menuButtonTitle={t("Process.components.Contract.Contract.button.menu")}
      pageTitle={`${t("Process.components.Contract.Contract.title")}:`}
      start={ProcessStatus.CONFIRMED_BY_CONTRACTOR}
      end={ProcessStatus.REJECTED_BY_CONTRACTOR}
    >
      <OwnerGate type="organization">
        <Container width="full" direction="col">
          <Text>{t("Process.components.Contract.Contract.text")}</Text>
        </Container>
        <ProcessFileTable files={process.files} type="current" />
        <ProcessFileTable files={convertFiles(files)} type="upload" />

        <ProcessUploadCard addFiles={addFiles} />
      </OwnerGate>
    </ProcessContainer>
  );
};

export default ProcessContract;
