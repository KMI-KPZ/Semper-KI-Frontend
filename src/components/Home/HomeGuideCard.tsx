import React from "react";
import { Link } from "react-router-dom";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import Button from "../General/Button";

interface Props {
  className?: string;
  userType: EUserType;
}

const HomeGuideCard: React.FC<Props> = (props) => {
  const { className, userType } = props;
  const additionalClassNames = className ?? "";
  const { t } = useTranslation();

  if (userType === EUserType.manufacturer)
    return (
      <div
        className={`${additionalClassNames}  p-3 flex flex-col justify-center items-center gap-3 duration-300`}
      >
        <h2>{t("Home.HomeGuideCard.header")}</h2>
        <div className="border-t-2 w-full" />
        <div className="flex flex-col md:flex-row items-start justify-center gap-5">
          <div className="flex flex-col md:flex-row items-center justify-center gap-5">
            <Link
              to="/guide"
              className={` p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300 text-center`}
            >
              {t("Home.HomeGuideCard.service.provide-produce")}
            </Link>
            <Link
              to="/guide"
              className={` p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300 text-center`}
            >
              {t("Home.HomeGuideCard.service.provide-design")}
            </Link>
            <Link
              to="/guide"
              className={` p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300 text-center`}
            >
              {t("Home.HomeGuideCard.service.provide-accompany")}
            </Link>
          </div>
        </div>
        <Button>{t("Home.HomeGuideCard.button.all")}</Button>
      </div>
    );

  if (userType === EUserType.client)
    return (
      <div
        className={`${additionalClassNames}  p-3 flex flex-col justify-center items-center gap-3 duration-300`}
      >
        <h2>{t("Home.HomeGuideCard.header")}</h2>
        <div className="border-t-2 w-full" />
        <div className="flex flex-col md:flex-row items-start justify-center gap-5">
          <div className="flex flex-col items-center justify-start gap-2">
            <h3>{t("Home.HomeGuideCard.information.header")}</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
              <Link
                to="/guide"
                className={` p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300 text-center`}
              >
                {t("Home.HomeGuideCard.information.beginner")}
              </Link>
              <Link
                to="/guide"
                className={` p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300 text-center`}
              >
                {t("Home.HomeGuideCard.information.advanced")}
              </Link>
              <Link
                to="/guide"
                className={` p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300 text-center`}
              >
                {t("Home.HomeGuideCard.information.expert")}
              </Link>
            </div>
          </div>
          <div className="border-r-2 h-full" />
          <div className="flex flex-col items-center justify-start gap-2">
            <h3>{t("Home.HomeGuideCard.service.header")}</h3>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
              <Link
                to="/guide"
                className={` p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300 text-center`}
              >
                {t("Home.HomeGuideCard.service.use-produce")}
              </Link>
              <Link
                to="/guide"
                className={` p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300 text-center`}
              >
                {t("Home.HomeGuideCard.service.use-design")}
              </Link>
              <Link
                to="/guide"
                className={` p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300 text-center`}
              >
                {t("Home.HomeGuideCard.service.use-accompany")}
              </Link>
            </div>
          </div>
        </div>
        <Button>{t("Home.HomeGuideCard.button.all")}</Button>
      </div>
    );

  return (
    <Link
      to="/guide"
      className={`${additionalClassNames}  p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300`}
    >
      <PsychologyAltIcon fontSize="large" />
      <h2>{t("Home.HomeGuideCard.header")}</h2>
    </Link>
  );
};

export default HomeGuideCard;
