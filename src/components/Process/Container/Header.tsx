import React, { ReactNode } from "react";
import { Button, Container, Heading } from "@component-library/index";
import BugReportIcon from "@mui/icons-material/BugReport";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { twMerge } from "tailwind-merge";
import { statusWizardItems } from "@/pages/Process/components/StatusWizard/StatusWizard";
import useStatusButtons, {
  StatusButtonProps,
} from "@/hooks/Project/useStatusButtons";
import useProcess from "@/hooks/Process/useProcess";
import { ProcessOrigin } from "@/api/Process/Querys/useGetProcess";
import logger from "@/hooks/useLogger";

interface ProcessHeaderProps {
  titleAddition: string;
  id: ProcessOrigin;
  open: boolean;
  toggleOpen(): void;
}

export const getPageIcon = (id: string): ReactNode => {
  const item = statusWizardItems.find((item) => item.targetID === id);
  if (item) {
    return item.icon;
  }
  return <BugReportIcon />;
};

const ProcessContainerHeader: React.FC<ProcessHeaderProps> = (props) => {
  const { titleAddition, id, toggleOpen, open } = props;
  const { t } = useTranslation();
  const { getStatusButtons, handleOnClickButton } = useStatusButtons();
  const { process } = useProcess();

  const handleOnClickButtonExpand = () => {
    toggleOpen();
  };

  const handleOnClickButtonEdit = (button: StatusButtonProps) => {
    window.confirm(
      t("components.Process.Container.Header.editConfirm") +
        "\n" +
        t("components.Process.Container.Header.editConfirm2")
    ) === true
      ? handleOnClickButton(button, process.processID)
      : logger("delete canceled");
  };
  const handleOnClickButtonDelete = (button: StatusButtonProps) => {
    window.confirm(
      t("components.Process.Container.Header.deleteConfirm") +
        "\n" +
        t("components.Process.Container.Header.deleteConfirm2")
    ) === true
      ? handleOnClickButton(button, process.processID)
      : logger("delete canceled");
  };

  const statusButtons = getStatusButtons(process, true, id);
  const deleteButton = statusButtons.find(
    (button) => button.title === "DELETE"
  );
  const editButton = statusButtons.find((button) => button.title === "EDIT");

  return (
    <Container
      width="full"
      justify="between"
      className={twMerge(
        "rounded-md rounded-b-none p-3 text-white",
        open ? "pb-0" : ""
      )}
    >
      <Container width="fit" direction="row" className="p-0 pl-2">
        {getPageIcon(id)}
        <Heading variant="h2" className="text-inherit">
          {`${t(`types.ProcessOrigin.${id}`)}${
            titleAddition === "" ? "" : ": " + titleAddition
          }`}
        </Heading>
      </Container>
      <Container width="fit" direction="row" className="p-0">
        {editButton !== undefined ? (
          <Button
            title={t("general.button.edit")}
            variant="text"
            className="text-white"
            size="md"
            children={<EditIcon />}
            onClick={() => handleOnClickButtonEdit(editButton)}
          />
        ) : null}
        {deleteButton !== undefined ? (
          <Button
            variant="text"
            className="text-white"
            size="md"
            title={t("general.button.delete")}
            children={<DeleteIcon />}
            onClick={() => handleOnClickButtonDelete(deleteButton)}
          />
        ) : null}
        <Button
          variant="text"
          className="text-white"
          size="md"
          title={t(open ? "general.button.collapse" : "general.button.expand")}
          onClick={handleOnClickButtonExpand}
          children={
            <div
              className={twMerge(
                "duration-300 ",
                open ? "rotate-180" : "rotate-0"
              )}
            >
              <ExpandMoreIcon fontSize="large" />
            </div>
          }
        />
      </Container>
    </Container>
  );
};

export default ProcessContainerHeader;
