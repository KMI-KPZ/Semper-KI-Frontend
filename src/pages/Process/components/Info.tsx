import { Project } from "@/api/Project/Querys/useGetProject";
import { Button, Container, Modal, Text } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import Collapsible from "@/components/Collapsible/Collapsible";
import ProcessMenu from "@/components/Process/Menu";
import ProcessTitleForm from "./TitleForm";
import useUpdateProcess from "@/api/Process/Mutations/useUpdateProcess";
import EditIcon from "@mui/icons-material/Edit";

interface ProcessInfoProps {
  process: Process;
}

const ProcessInfo: React.FC<ProcessInfoProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const [titleEdit, setTitleEdit] = React.useState<boolean>(false);

  const handleOnClickButtonEditTitle = () => {
    setTitleEdit(!titleEdit);
  };

  return (
    <Container
      id="processInfo"
      width="full"
      direction="col"
      className="relative gap-2 rounded-xl bg-white p-5"
    >
      <ProcessMenu
        buttonTitle={t("Project.components.Info.button.menu")}
      ></ProcessMenu>
      <Container direction="row" width="full" justify="start" className="gap-0">
        <Container className="w-1/3 md:w-1/3" justify="start">
          <Text variant="strong" className="w-40">
            {t("Process.components.Info.name")}
          </Text>
          <Text>{process.processDetails.title}</Text>
          <Button
            title={t("Process.components.Info.button.editTitle")}
            stopPropagation={false}
            variant="secondary"
            size="xs"
            onClick={handleOnClickButtonEditTitle}
            children={<EditIcon />}
          />
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
            <Text>
              {t(
                `enum.ProcessStatus.${
                  ProcessStatus[
                    process.processStatus
                  ] as keyof typeof ProcessStatus
                }`
              )}
              {` (${process.processStatus})`}
            </Text>
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
