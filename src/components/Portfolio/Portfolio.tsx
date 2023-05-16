import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../General/Button";
import PortfolioItem from "./PortfolioItem";
import { PortfolioItems } from "../../data/PortfolioItems";

interface Props {}

const Portfolio: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center justify-center w-full bg-white p-5 gap-5">
      <h1>{t("Portfolio.Portfolio.header")}</h1>
      {PortfolioItems.map((portfolioItem, index) => (
        <PortfolioItem key={index} portfolioItem={portfolioItem} />
      ))}
      <Button>{t("Portfolio.Portfolio.back")}</Button>
    </div>
  );
};

export default Portfolio;
