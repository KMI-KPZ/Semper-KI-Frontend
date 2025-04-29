import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Modal, Text } from "@component-library/index";
import GrayContainer from "@component-library/Container/GrayContainer";
import { Process, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
import ActionContainerTodos from "@/components/Process/Container/ActionContainer/components/Todos";
import ProcessImagePreview from "@/components/Process/ImagePreview";
import EditIcon from "@mui/icons-material/Edit";
import ProcessTitleForm from "../Info/TitleForm";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface ProcessHaederProps {
  process: Process;
}

const ProcessHaeder: React.FC<ProcessHaederProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const [titleEdit, setTitleEdit] = React.useState(false);

  const handleOnClickButton = () => {
    setTitleEdit((prevState) => !prevState);
  };

  return (
    <Container width="full" justify="start">
      <GrayContainer
        width="full"
        className="flex-row gap-5 self-stretch"
        direction="row"
        justify="start"
      >
        <Container
          width="fit"
          direction="row"
          className=" self-stretch rounded-md bg-white"
          justify="start"
        >
          <Container width="fit" direction="col" items="end" className="py-3">
            <Container
              width="full"
              direction="col"
              className="gap-0 rounded-r-md bg-gradient-to-l from-teal-600 to-teal-400 p-2 text-white"
              items="end"
            >
              <Container
                width="full"
                direction="row"
                justify="end"
                className="gap-1"
              >
                <Text variant="strong">{process.processDetails.title}</Text>
                <PermissionGate element="ProcessEditTitle">
                  <Button
                    size="xs"
                    className="p-0"
                    variant="text"
                    title={t("general.button.edit")}
                    onClick={handleOnClickButton}
                    children={
                      <EditIcon className="text-white" fontSize="small" />
                    }
                  />
                </PermissionGate>
              </Container>
              <Text className="whitespace-nowrap">
                {t("general.createdWhen")}
                {": "}
                {process.createdWhen.toLocaleDateString()}
              </Text>
            </Container>
            <Container
              width="full"
              direction="col"
              className=" gap-0 rounded-r-md bg-gradient-to-l from-teal-600 to-teal-400 p-2 text-white"
              items="end"
            >
              <Text variant="strong">
                {t(
                  `enum.ProcessStatus.${
                    ProcessStatus[
                      process.processStatus
                    ] as keyof typeof ProcessStatus
                  }`
                )}
              </Text>
              <Text className="whitespace-nowrap">
                {t("general.updatedWhen")}
                {": "}
                {process.updatedWhen.toLocaleDateString()}
              </Text>
            </Container>
          </Container>
          <ProcessImagePreview process={process} />
        </Container>
        <ActionContainerTodos
          actionClassName=" rounded-md bg-white grow self-stretch "
          process={process}
          className="row w-full grow self-stretch rounded-md bg-white"
        />
      </GrayContainer>
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

export default ProcessHaeder;
