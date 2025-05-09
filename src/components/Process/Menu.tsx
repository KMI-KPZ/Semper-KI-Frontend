import { Button, Container } from "@component-library/index";
import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Collapsible from "../Collapsible/Collapsible";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";

interface ProcessMenuProps {
  buttonTitle?: string;
}

const ProcessMenu: React.FC<PropsWithChildren<ProcessMenuProps>> = (props) => {
  const { buttonTitle, children } = props;
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const handleOnClickButton = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOnClickCollapsible = () => {
    setMenuOpen(false);
  };

  return (
    <div className=" absolute right-3 top-3 z-20 flex w-fit flex-col items-end gap-2">
      <Button
        active={children !== undefined}
        width="fit"
        title={
          buttonTitle !== undefined
            ? buttonTitle
            : t("components.Process.Menu.button.open")
        }
        variant="text"
        onClick={handleOnClickButton}
      >
        <MoreHorizIcon />
      </Button>
      <Collapsible expand={menuOpen && children !== undefined} logName="Menu">
        <Container
          onClick={handleOnClickCollapsible}
          className=" gap-3 rounded-md border-2 bg-white p-2"
          direction="col"
        >
          {children}
          <Button
            title={t("components.Process.Menu.button.close")}
            variant="text"
            size="sm"
            width="full"
            onClick={handleOnClickButton}
            children={<ExpandLessIcon />}
          />
        </Container>
      </Collapsible>
    </div>
  );
};

export default ProcessMenu;
