import { Button, Text } from "@component-library/index";
import React, { PropsWithChildren, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { twMerge } from "tailwind-merge";

interface CollapsibleProps {
  className?: string;
  expand?: boolean;
  setExpand?: (expand: boolean) => void;
  initialOpen?: boolean;
  showButton?: boolean;
  logName?: string;
}

const Collapsible: React.FC<PropsWithChildren<CollapsibleProps>> = (props) => {
  const {
    children,
    className,
    expand: outsideExpand,
    setExpand: setOutsideExpand,
    initialOpen = false,
    showButton = false,
  } = props;
  const { t } = useTranslation();
  const [localExpand, setLocalExpand] = useState<boolean>(initialOpen);
  const expand = outsideExpand !== undefined ? outsideExpand : localExpand;

  const toggleExpand = (expand: boolean) => {
    if (setOutsideExpand !== undefined) {
      setOutsideExpand(!expand);
    } else {
      setLocalExpand(expand);
    }
  };
  const handleOnClickButton = () => {
    toggleExpand(!expand);
  };

  useEffect(() => {
    if (outsideExpand !== undefined) {
      toggleExpand(outsideExpand);
    }
  }, [outsideExpand]);

  useEffect(() => {
    if (initialOpen !== undefined && initialOpen === true) {
      toggleExpand(true);
    }
  }, [initialOpen]);

  return (
    <>
      <div
        className={twMerge(
          `w-full flex-col gap-2 overflow-hidden`,
          expand ? `h-fit` : "h-0",
          className
        )}
      >
        {children}
      </div>
      {showButton && (
        <Button
          title={t(`general.button.${expand ? "collapse" : "expand"}`)}
          onClick={handleOnClickButton}
          variant="text"
          className="gap-2 pt-3"
        >
          <Text variant="body">
            {t(`general.button.${expand ? "collapse" : "expand"}`)}
          </Text>
          <div className={`duration-300 ${expand ? "rotate-180" : "rotate-0"}`}>
            <ExpandMoreIcon />
          </div>
        </Button>
      )}
    </>
  );
};

export default Collapsible;
