import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { useSearchParams } from "react-router-dom";
import PortfolioItem from "./components/Item";
import { PortfolioItems } from "@/data/portfolio";
import { Heading } from "@component-library/Typography";

interface Props {}

const Portfolio: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const [queryParameters] = useSearchParams();
  const handleOnClickButton = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5"
      data-testid="portfolio"
    >
      <Heading variant="h1">{t("Portfolio.Portfolio.header")}</Heading>
      {PortfolioItems.map((portfolioItem, index) => {
        return (
          <PortfolioItem
            key={index}
            portfolioItem={portfolioItem}
            preOpen={queryParameters.get("name") === portfolioItem}
          />
        );
      })}
      <Button
        testid="portfolio-button"
        onClick={handleOnClickButton}
        title={t("Portfolio.Portfolio.back")}
      />
    </div>
  );
};

export default Portfolio;
