import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";
import { useSearchParams } from "react-router-dom";
import PortfolioItem from "./components/Item";
import { Heading } from "@component-library/index";

interface Props {}

export type PortfolioItemType =
  | "use-information"
  | "use-produce"
  | "use-design"
  | "use-accompany"
  | "provide-produce"
  | "provide-design"
  | "provide-accompany";

export const PortfolioItems: PortfolioItemType[] = [
  "use-information",
  "use-produce",
  "use-design",
  "use-accompany",
  "provide-produce",
  "provide-design",
  "provide-accompany",
];

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
      <Heading variant="h1">{t("Portfolio.header")}</Heading>
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
        title={t("Portfolio.back")}
      />
    </div>
  );
};

export default Portfolio;
