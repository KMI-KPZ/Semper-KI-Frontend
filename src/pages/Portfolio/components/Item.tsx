import React, { useContext, useRef, useState } from "react";
import { Button } from "@component-library/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useTranslation } from "react-i18next";
import { AppContext } from "@/pages/App";
import { Heading } from "@component-library/Typography";

interface Props {
  preOpen: boolean;
  portfolioItem: string;
}

const PortfolioItem: React.FC<Props> = (props) => {
  const { portfolioItem, preOpen } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const { appState } = useContext(AppContext);
  const [open, setOpen] = useState<boolean>(preOpen);
  const handleOnClickButton = () => {
    setOpen((prevState) => !prevState);
  };

  if (preOpen === true && ref !== null && ref.current !== null) {
    ref.current.scrollIntoView();
  }
  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-3"
      ref={ref}
    >
      <div className="flex w-full flex-row items-center justify-between px-10">
        <Heading variant="h2">
          {t(`Portfolio.PortfolioItem.${portfolioItem}.header`)}
        </Heading>
        <Button
          onClick={handleOnClickButton}
          title={t(
            `Portfolio.PortfolioItem.button.${
              open === true ? "collapse" : "expand"
            }`
          )}
          children={
            <div
              className={`transition-all duration-300 ${
                open ? "rotate-180" : "rotate-0"
              }`}
            >
              <ExpandMoreIcon />
            </div>
          }
        />
      </div>
      <div className="w-full border-t-2" />
      <div
        className={`gap 2transition-all flex w-full flex-col overflow-clip duration-300 ${
          open ? `flex` : "hidden"
        }`}
      >
        <span className="px-5 py-2 text-left">
          {t(`Portfolio.PortfolioItem.${portfolioItem}.text`)}
        </span>
        <div className="w-full border-t-2" />
      </div>
    </div>
  );
};

export default PortfolioItem;
