import React from "react";
import { useTranslation } from "react-i18next";
import BubblesSnipURL from "@images/Bubbles_snip.png";
import { Heading } from "@component-library/index";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
}
const HomeMagazin: React.FC<Props> = (props) => {
  const { className } = props;
  const { t } = useTranslation();

  return (
    <a
      data-testid="home-anonym-magazin"
      className={twMerge(
        ` group relative flex  w-full 
          select-none items-center
          justify-center overflow-hidden bg-türkis-800 p-5
          duration-500 hover:bg-türkis-700`,
        className
      )}
      href="https://magazin.semper-ki.org/"
      target="_blank"
    >
      <Heading
        variant="h2"
        className="z-10 text-4xl tracking-widest  md:text-5xl md:font-bold"
      >
        {t("Home.components.Magazin.heading")}
      </Heading>
      <img
        className="absolute flex h-full w-full object-cover opacity-0 duration-500 group-hover:opacity-50 "
        src={BubblesSnipURL}
      />
    </a>
  );
};

export default HomeMagazin;
