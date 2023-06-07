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
    <a
      className={` ${additionalClassNames}
        group relative 
        flex select-none
        items-center justify-center bg-türkis-800 p-5 
        duration-500 hover:bg-türkis-700
    `}
      href="https://magazin.semper-ki.org/"
      target="_blank"
    >
      <Heading
        variant="h2"
        className="z-10 text-4xl tracking-widest text-white md:text-5xl md:font-bold"
      >
        {t("Home.HomeMagazinCard.header")}
      </Heading>
      <img
        className="absolute flex h-full w-full object-cover opacity-0 duration-500 group-hover:opacity-50"
        src={BubblesSnipURL}
      />
    </a>
  );
};

export default HomeMagazinCard;
