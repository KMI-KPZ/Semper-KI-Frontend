import { Project } from "@/api/Project/Querys/useGetProject";
import { Button, Container, Modal, Text } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Process } from "@/api/Process/Querys/useGetProcess";
import Collapsible from "@/components/Collapsible/Collapsible";
import CardMenu from "@/components/CardMenu/CardMenu";
import ProcessTitleForm from "./TitleForm";

interface ProcessInfoProps {
  process: Process;
}

const ProcessInfo: React.FC<ProcessInfoProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const [titleEdit, setTitleEdit] = React.useState<boolean>(
    process.processDetails.title === undefined ||
      process.processDetails.title === ""
      ? true
      : false
  );

  const handleOnClickButtonEditTitle = () => {
    setTitleEdit(!titleEdit);
  };

  return (
    <Container
      width="full"
      direction="col"
      className="relative gap-2 bg-white p-5"
    >
      <CardMenu title={t("Project.components.Info.button.menu")}>
        <Button
          title={t("Process.components.Info.button.editTitle")}
          stopPropagation={false}
          variant="secondary"
          size="sm"
          onClick={handleOnClickButtonEditTitle}
        />
      </CardMenu>
      <Container direction="row" width="full" justify="start" className="gap-0">
        <Container className="w-1/3 md:w-1/3" justify="start">
          <Text variant="strong" className="w-40">
            {t("Process.components.Info.name")}
          </Text>
          <Text>{process.processDetails.title}</Text>
        </Container>
        <Container className="w-1/3 md:w-1/3" justify="start">
          <Text variant="strong" className="w-40">
            {t("Process.components.Info.updated")}
          </Text>
          <Text>{process.updatedWhen.toLocaleString()}</Text>
        </Container>
      </Container>
      <Collapsible>
        <Container
          direction="row"
          justify="start"
          width="full"
          className="gap-0"
        >
          <Container className="w-1/3 md:w-1/3" justify="start">
            <Text variant="strong" className="w-40">
              {t("Process.components.Info.status")}
            </Text>
            <Text>{process.processStatus}</Text>
          </Container>
          <Container className="w-1/3 md:w-1/3" justify="start">
            <Text variant="strong" className="w-40">
              {t("Process.components.Info.created")}
            </Text>
            <Text>{process.createdWhen.toLocaleString()}</Text>
          </Container>
        </Container>
      </Collapsible>
      <Modal
        modalKey="processTitleEdit"
        open={titleEdit}
        closeModal={() => {
          setTitleEdit(false);
        }}
      >
        <ProcessTitleForm
          title={process.processDetails.title}
          close={() => {
            setTitleEdit(false);
          }}
          processID={process.processID}
        />
      </Modal>
    </Container>
  );
};

export default ProcessInfo;
