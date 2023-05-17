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
    <div className={`${additionalClassNames}`}>
      {i18n.language === "de" ? (
        <img
          className={`object-contain select-none`}
          src={require("../../assets/images/BMWK_de.png")}
        />
      ) : (
        <img
          className={`object-contain select-none`}
          src={require("../../assets/images/BMWE_en.png")}
        />
      )}
    </div>
  );
};

export default HomeBMWKImgCard;
