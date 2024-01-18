import React from "react";
import { useTranslation } from "react-i18next";
import BMWKdeURL from "@images/BMWK_de.png";
import BMWKenURL from "@images/BMWE_en.png";
import { Heading, Text } from "@component-library/Typography";
import HomeContainer from "./Container";

interface Props {
  className?: string;
}

const HomeImages: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const { i18n } = useTranslation();

  return (
    <HomeContainer className={`bg-slate-500`}>
      <Heading variant="h2" className="text-violet basis-1/3">
        Innovation klappt nur als Team. Wir arbeiten eng zusammen und freuen uns
        über neue Partner in Forschung und Entwicklung.
      </Heading>
      <div className="flex flex-grow flex-row overflow-auto">
        <a
          href="https://www.bmwk.de/"
          className="h-full w-full select-none  p-5 "
          title="BMWK"
        >
          <img
            className="h-60 w-60 object-contain duration-300 hover:scale-105"
            src={i18n.language === "de" ? BMWKdeURL : BMWKenURL}
          />
        </a>
        <a
          href="https://www.bmwk.de/"
          className="h-full w-full select-none object-contain p-5 "
          title="BMWK"
        >
          <img
            className="h-60 w-60 object-contain duration-300 hover:scale-105"
            src={i18n.language === "de" ? BMWKdeURL : BMWKenURL}
          />
        </a>
        <a
          href="https://www.bmwk.de/"
          className="h-full w-full select-none object-contain p-5 "
          title="BMWK"
        >
          <img
            className="h-60 w-60 object-contain duration-300 hover:scale-105"
            src={i18n.language === "de" ? BMWKdeURL : BMWKenURL}
          />
        </a>
        <a
          href="https://www.bmwk.de/"
          className="h-full w-full select-none object-contain p-5 "
          title="BMWK"
        >
          <img
            className="h-60 w-60 object-contain duration-300 hover:scale-105"
            src={i18n.language === "de" ? BMWKdeURL : BMWKenURL}
          />
        </a>
        <a
          href="https://www.bmwk.de/"
          className="h-full w-full select-none object-contain p-5 "
          title="BMWK"
        >
          <img
            className="h-60 w-60 object-contain duration-300 hover:scale-105"
            src={i18n.language === "de" ? BMWKdeURL : BMWKenURL}
          />
        </a>
      </div>
    </HomeContainer>
  );
};

export default HomeImages;
