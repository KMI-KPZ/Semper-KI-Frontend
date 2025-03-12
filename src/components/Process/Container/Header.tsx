import React, { PropsWithChildren, ReactNode } from "react";
import ProcessMenu from "../Menu";
import { Button, Container, Heading } from "@component-library/index";
import BugReportIcon from "@mui/icons-material/BugReport";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { twMerge } from "tailwind-merge";
import { statusWizardItems } from "@/pages/Process/components/StatusWizard/StatusWizard";

interface ProcessHeaderProps {
  menuButtonTitle: string;
  pageTitle: string;
  id: string;
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

const ProcessContainerHeader: React.FC<
  PropsWithChildren<ProcessHeaderProps>
> = (props) => {
  const { children, menuButtonTitle, pageTitle, id, toggleOpen, open } = props;
  const { t } = useTranslation();

  const handleOnClickButtonExpand = () => {
    toggleOpen();
  };

  const handleOnClickButtonEdit = () => {
    console.log("Edit");
  };
  const handleOnClickButtonDelete = () => {
    console.log("Delete");
  };

  return (
    <>
      {children !== undefined ? (
        <ProcessMenu buttonTitle={menuButtonTitle}>{children}</ProcessMenu>
      ) : null}
      <Container
        width="full"
        justify="between"
        className={twMerge(
          "rounded-md rounded-b-none p-3 text-white",
          open ? "pb-1" : ""
        )}
      >
        <Container width="fit" direction="row" className="p-0">
          {getPageIcon(id)}
          <Heading variant="h2" className="text-inherit">
            {pageTitle}
          </Heading>
        </Container>
        <Container width="fit" direction="row" className="p-0">
          <Button
            title={t("general.button.edit")}
            variant="text"
            className="text-white"
            size="md"
            children={<EditIcon />}
            onClick={handleOnClickButtonEdit}
          />
          <Button
            variant="text"
            className="text-white"
            size="md"
            title={t("general.button.delete")}
            children={<DeleteIcon />}
            onClick={handleOnClickButtonDelete}
          />
          <Button
            variant="text"
            className="text-white"
            size="md"
            title={t(
              open ? "general.button.collapse" : "general.button.expand"
            )}
            onClick={handleOnClickButtonExpand}
            children={
              <div
                className={twMerge(
                  "duration-300 ",
                  open ? "rotate-180" : "rotate-0"
                )}
              >
                <ExpandMoreIcon />
              </div>
            }
          />
        </Container>
      </Container>
    </>
  );
};

export default ProcessContainerHeader;
