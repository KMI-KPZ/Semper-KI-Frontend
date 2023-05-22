import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Button from "../General/Button";
import PortfolioItem from "./PortfolioItem";
import { PortfolioItems } from "../../data/PortfolioItems";
import { useSearchParams } from "react-router-dom";

interface Props {}

const Portfolio: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const [queryParameters] = useSearchParams();
  const handleOnClickButton = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <h1>{t("Portfolio.Portfolio.header")}</h1>
      {PortfolioItems.map((portfolioItem, index) => {
        return (
          <PortfolioItem
            key={index}
            portfolioItem={portfolioItem}
            preOpen={queryParameters.get("name") === portfolioItem}
          />
        );
      })}
      <Button onClick={handleOnClickButton}>
        {t("Portfolio.Portfolio.back")}
      </Button>
    </div>
  );
};

export default Portfolio;
