import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

type NewsData = {
  title: string;
  text: string;
  link: string;
};

const newsData: NewsData[] = [
  {
    link: "https://news.google.com/",
    text:
      "Zugunglück in Chemiefabrik in Ludwigshafen die PVC-Folien, Polyester- und Polypropylen-Granulat herstellt.\n" +
      "Konzern ist Hauptlieferant eines Herstellers von Blutentnahmesystemen.",
    title: "Zugunglück in Chemiefabrik",
  },
];

const HomeNewsCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const { t } = useTranslation();
  const newsList: NewsData[] = newsData;

  return (
    <div
      data-testid="home-news-card"
      className={`${additionalClassNames} flex flex-col items-center justify-start gap-3 overflow-auto p-3 `}
    >
      <Heading variant="h2">{t("Home.HomeNewsCard.header")}</Heading>
      <div className="w-full border-t-2" />
      {newsList.length > 0 ? (
        newsList.map((news, index) => (
          <HomeNewsCardItem key={index} {...news} />
        ))
      ) : (
        <span>{t("Home.HomeNewsCard.no-items")}</span>
      )}
    </div>
  );
};

const HomeNewsCardItem: React.FC<NewsData> = (news) => {
  const { link, text, title } = news;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-start justify-start gap-3 p-2">
      <Heading variant="h3" className="pl-5">
        {title}
      </Heading>
      <span>{text}</span>
      <Link
        to={link}
        className="w-full text-right text-türkis-800 duration-300 hover:text-türkis-950"
      >
        {t("Home.HomeNewsCardItem.more")}
      </Link>
    </div>
  );
};

export default HomeNewsCard;
