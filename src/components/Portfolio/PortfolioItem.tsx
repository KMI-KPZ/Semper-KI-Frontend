import React, { useRef, useState } from "react";
import Button from "../General/Button";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { PortfolioItemType } from "../../data/PortfolioItems";
import { useTranslation } from "react-i18next";

interface Props {
  portfolioItem: PortfolioItemType;
}

const PortfolioItem: React.FC<Props> = (props) => {
  const { portfolioItem } = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const handleOnClickButton = () => {
    setOpen((prevState) => !prevState);
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center w-full">
      <div className="flex flex-row justify-between items-center w-full px-10">
        <h2>{t(portfolioItem.title)}</h2>
        <Button
          onClick={handleOnClickButton}
          icon={
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
        className={`flex w-full flex-col gap 2transition-all duration-300 overflow-clip ${
          open ? `flex` : "hidden"
        }`}
      >
        <span className="text-left px-5 py-2">{t(portfolioItem.text)}</span>
        <div className="w-full border-t-2" />
      </div>
    </div>
  );
};

export default PortfolioItem;
