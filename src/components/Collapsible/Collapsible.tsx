import { Button, Container, Text } from "@component-library/index";
import React, { PropsWithChildren, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { twMerge } from "tailwind-merge";

interface CollapsibleProps {
  className?: string;
}

const Collapsible: React.FC<PropsWithChildren<CollapsibleProps>> = (props) => {
  const { children, className } = props;
  const { t } = useTranslation();
  const collapsibleRef = useRef<null | HTMLDivElement>(null);
  const [expand, setExpand] = useState<boolean>(false);

  const handleOnClickButton = () => {
    if (collapsibleRef !== null && collapsibleRef.current !== null) {
      collapsibleRef.current.style.maxHeight = expand
        ? "0px"
        : collapsibleRef.current.scrollHeight + "px";
      setExpand(!expand);
    } else return;
  };

  return (
    <>
      <div
        ref={collapsibleRef}
        className={twMerge(
          ` flex max-h-0 w-full flex-col gap-2 overflow-hidden  duration-300`,
          className
        )}
      >
        {children}
      </div>
      <Button
        title={t(
          `Process.components.Info.button.${expand ? "collapse" : "expand"}`
        )}
        onClick={handleOnClickButton}
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
