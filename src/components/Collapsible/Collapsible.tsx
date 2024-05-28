import { Button, Container, Text } from "@component-library/index";
import React, { PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { twMerge } from "tailwind-merge";

interface CollapsibleProps {
  className?: string;
}

const Collapsible: React.FC<PropsWithChildren<CollapsibleProps>> = (props) => {
  const { children, className } = props;
  const { t } = useTranslation();
  const [expand, setExpand] = useState<boolean>(false);

  return (
    <>
      <Container
        direction="col"
        width="full"
        className={twMerge(
          `gap-2 overflow-clip duration-300 ${
            expand ? " max-h-40" : " max-h-0 "
          }`,
          className
        )}
      >
        {children}
      </Container>
      <Button
        title={t(
          `Process.components.Info.button.${expand ? "collapse" : "expand"}`
        )}
        onClick={() => setExpand(!expand)}
        variant="text"
        className="gap-2"
      >
        <Text variant="body">
          {t(
            `Process.components.Info.button.${expand ? "collapse" : "expand"}`
          )}
        </Text>
        <div className={`duration-300  ${expand ? "rotate-180" : "rotate-0"}`}>
          <ExpandMoreIcon />
        </div>
      </Button>
    </>
  );
};

export default Collapsible;
