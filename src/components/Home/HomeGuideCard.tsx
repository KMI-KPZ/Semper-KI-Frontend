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
        className={`${additionalClassNames}  p-3 flex flex-col justify-between items-center gap-3`}
      >
        <div className="flex flex-col justify-start items-center gap-3 w-full">
          <h2>{t("Home.HomeGuideCard.header")}</h2>
          <div className="border-t-2 w-full" />
          <div className="flex flex-col gap-1 items-start justify-center w-full  ">
            <Link
              to="/guide"
              className={`py-1 px-3 md:py-2 md:px-3 hover:bg-türkis-300 duration-300 w-full`}
            >
              {`>`} {t("Home.HomeGuideCard.service.provide-produce")}
            </Link>
            <Link
              to="/guide"
              className={`py-1 px-3 md:py-2 md:px-3 hover:bg-türkis-300 duration-300 w-full`}
            >
              {`>`} {t("Home.HomeGuideCard.service.provide-design")}
            </Link>
            <Link
              to="/guide"
              className={`py-1 px-3 md:py-2 md:px-3 hover:bg-türkis-300 duration-300 w-full`}
            >
              {`>`} {t("Home.HomeGuideCard.service.provide-accompany")}
            </Link>
          </div>
        </div>
        <Button>{t("Home.HomeGuideCard.button.all")}</Button>
      </div>
    );

  if (userType === EUserType.client)
    return (
      <div
        className={`${additionalClassNames}  p-3 flex flex-col justify-between items-center gap-3`}
      >
        <div className="flex flex-col justify-start items-center gap-3 w-full">
          <h2>{t("Home.HomeGuideCard.header")}</h2>
          <div className="border-t-2 w-full" />
          <div className="flex flex-col items-start justify-around gap-5 w-full">
            <div className="flex flex-col items-center justify-start gap-2 w-full">
              <h3>{t("Home.HomeGuideCard.information.header")}</h3>
              <div className="flex flex-col gap-1 items-start justify-center w-full">
                <Link
                  to="/guide"
                  className={`py-1 px-3 md:py-2 md:px-3 hover:bg-türkis-300 duration-300 w-full`}
                >
                  {`>`} {t("Home.HomeGuideCard.information.beginner")}
                </Link>
                <Link
                  to="/guide"
                  className={`py-1 px-3 md:py-2 md:px-3 hover:bg-türkis-300 duration-300 w-full`}
                >
                  {`>`} {t("Home.HomeGuideCard.information.advanced")}
                </Link>
                <Link
                  to="/guide"
                  className={`py-1 px-3 md:py-2 md:px-3 hover:bg-türkis-300 duration-300 w-full`}
                >
                  {`>`} {t("Home.HomeGuideCard.information.expert")}
                </Link>
              </div>
            </div>
            <div className="w-full border-t-2 " />
            <div className="flex flex-col items-center justify-start gap-2 w-full">
              <h3>{t("Home.HomeGuideCard.service.header")}</h3>
              <div className="flex flex-col gap-1 items-start justify-center w-full">
                <Link
                  to="/guide"
                  className={`py-1 px-3 md:py-2 md:px-3 hover:bg-türkis-300 duration-300 w-full`}
                >
                  {`>`} {t("Home.HomeGuideCard.service.use-produce")}
                </Link>
                <Link
                  to="/guide"
                  className={`py-1 px-3 md:py-2 md:px-3 hover:bg-türkis-300 duration-300 w-full`}
                >
                  {`>`} {t("Home.HomeGuideCard.service.use-design")}
                </Link>
                <Link
                  to="/guide"
                  className={`py-1 px-3 md:py-2 md:px-3 hover:bg-türkis-300 duration-300 w-full`}
                >
                  {`>`} {t("Home.HomeGuideCard.service.use-accompany")}
                </Link>
              </div>
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
