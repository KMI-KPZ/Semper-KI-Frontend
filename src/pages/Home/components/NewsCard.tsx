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

const HomeNewsCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const { t } = useTranslation();
  const newsList: NewsData[] = [];

  return (
    <div
      className={`${additionalClassNames} p-3 flex flex-col justify-start items-center gap-5 `}
    >
      <h2>{t("Home.HomeNewsCard.header")}</h2>
      <div className="border-t-2 w-full" />
      {newsList.length > 0 ? (
        newsList.map((news) => <HomeNewsCardItem {...news} />)
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
    <div className="flex flex-col justify-start items-start gap-3 p-5 w-full">
      <h3 className="pl-5">{title}</h3>
      <span>{text}</span>
      <Link
        to={link}
        className="hover:text-türkis-950 text-türkis-800 duration-300 text-right w-full"
      >
        {t("Home.HomeNewsCardItem.more")}
      </Link>
    </div>
  );
};

export default HomeNewsCard;
