import { Button, Container, Text } from "@component-library/index";
import React, { PropsWithChildren, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { twMerge } from "tailwind-merge";
import { use } from "i18next";
import logger from "@/hooks/useLogger";

interface CollapsibleProps {
  className?: string;
  open?: boolean;
  initialOpen?: boolean;
  showButton?: boolean;
}

const Collapsible: React.FC<PropsWithChildren<CollapsibleProps>> = (props) => {
  const { children, className, open, initialOpen, showButton = false } = props;
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

  useEffect(() => {
    if (
      collapsibleRef !== null &&
      collapsibleRef.current !== null &&
      open !== undefined
    ) {
      collapsibleRef.current.style.maxHeight =
        open === false ? "0px" : collapsibleRef.current.scrollHeight + "px";
      setExpand(!expand);
    }
  }, [open]);

  useEffect(() => {
    if (
      collapsibleRef !== null &&
      collapsibleRef.current !== null &&
      initialOpen !== undefined &&
      initialOpen === true
    ) {
      collapsibleRef.current.style.maxHeight =
        collapsibleRef.current.scrollHeight + "px";
      setExpand(true);
    }
  }, [initialOpen]);

  return (
    <>
      <div
        ref={collapsibleRef}
        className={twMerge(
          `max-h-0 w-full flex-col gap-2 overflow-hidden duration-300 ease-in-out `,
          className
        )}
      >
        {children}
      </div>
      {showButton ? (
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
          <div
            className={`duration-300  ${expand ? "rotate-180" : "rotate-0"}`}
          >
            <ExpandMoreIcon />
          </div>
        </Button>
      ) : null}
    </>
  );
};

export default Collapsible;
