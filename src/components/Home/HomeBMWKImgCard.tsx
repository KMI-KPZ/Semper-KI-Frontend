import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
}

const HomeBMWKImgCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const { i18n } = useTranslation();

  return (
    <div
      className={`${additionalClassNames} flex flex-row flex-wrap justify-center bg-white`}
    >
      {/* <a
        href="https://kmi-leipzig.de/"
        className="h-1/2 w-1/2 select-none p-5"
        title="KMI Leipzig"
      >
        <img
          className="h-full w-full object-contain duration-300 hover:scale-105"
          src={
            "https://kmi-leipzig.de/wp-content/uploads/2022/07/KMI_Logo_2022-3_Kompetenzzentrum_rgb-Kopie.svg"
          }
        />
      </a>
      <a
        href="https://infai.org/"
        className="h-1/2 w-1/2 select-none p-5"
        title="InfAI"
      >
        <img
          className="h-full w-full object-contain duration-300 hover:scale-105"
          src={
            "https://infai.org/wp-content/uploads/2019/02/InfAI-Logo-mobile-sm.png"
          }
        />
      </a> */}
      <a
        href="https://www.bmwk.de/"
        className="h-1/2 w-1/2 select-none object-contain p-5 "
        title="BMWK"
      >
        <img
          className="h-full w-full object-contain duration-300 hover:scale-105"
          src={require(i18n.language === "de"
            ? "../../assets/images/BMWK_de.png"
            : "../../assets/images/BMWE_en.png")}
        />
      </a>
    </div>
  );
};

export default HomeBMWKImgCard;
