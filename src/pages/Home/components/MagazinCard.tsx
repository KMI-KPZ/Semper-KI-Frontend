import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import BubblesSnipURL from "@images/Bubbles_snip.png";
import { Heading } from "@component-library/Typography";

interface Props {
  className?: string;
}
const HomeMagazinCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const { t } = useTranslation();

  return (
    <Link
      className={` ${additionalClassNames}
        group relative 
        flex select-none
        items-center justify-center bg-türkis-800 p-3 
        duration-500 hover:bg-türkis-700
    `}
      to="https://infai.4imedia.com/"
    >
      <Heading variant="h2">{t("Home.HomeMagazinCard.header")}</Heading>
      <img
        className="felx absolute h-full w-full object-cover opacity-0 duration-500 group-hover:opacity-50"
        src={BubblesSnipURL}
      />
    </Link>
  );
};

export default HomeMagazinCard;
