import React from "react";
import { useTranslation } from "react-i18next";
import BMWKdeURL from "@images/BMWK_de.png";
import BMWKenURL from "@images/BMWE_en.png";

interface Props {
  className?: string;
}

const HomeImages: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const { i18n } = useTranslation();

  return (
    <div
      data-testid="home-img-card"
      className={`${additionalClassNames} flex flex-row flex-wrap justify-center bg-white`}
    >
      <a
        href="https://www.bmwk.de/"
        className="h-full w-full select-none object-contain p-5 "
        title="BMWK"
      >
        <img
          className="h-40 w-40 object-contain duration-300 hover:scale-105"
          src={i18n.language === "de" ? BMWKdeURL : BMWKenURL}
        />
      </a>
    </div>
  );
};

export default HomeImages;
