import React from "react";
import { Link } from "react-router-dom";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { UserType } from "@/hooks/useUser";

interface Props {
  className?: string;
  userType: UserType;
}

const HomeGuideCard: React.FC<Props> = (props) => {
  const { className, userType } = props;
  const additionalClassNames = className ?? "";
  const { t } = useTranslation();

  if (userType === UserType.manufacturer)
    return (
      <div
        className={`${additionalClassNames}  flex flex-col items-center justify-between gap-3 p-3`}
      >
        <div className="flex w-full flex-col items-center justify-start gap-3">
          <h2>{t("Home.HomeGuideCard.header")}</h2>
          <div className="w-full border-t-2" />
          <div className="flex w-full flex-col items-start justify-center gap-1  ">
            <Link
              to="/guide"
              className={`w-full px-3 py-1 duration-300 hover:bg-türkis-300 md:px-3 md:py-2`}
            >
              {`>`} {t("Home.HomeGuideCard.service.provide-produce")}
            </Link>
            <Link
              to="/guide"
              className={`w-full px-3 py-1 duration-300 hover:bg-türkis-300 md:px-3 md:py-2`}
            >
              {`>`} {t("Home.HomeGuideCard.service.provide-design")}
            </Link>
            <Link
              to="/guide"
              className={`w-full px-3 py-1 duration-300 hover:bg-türkis-300 md:px-3 md:py-2`}
            >
              {`>`} {t("Home.HomeGuideCard.service.provide-accompany")}
            </Link>
          </div>
        </div>
        <Button>{t("Home.HomeGuideCard.button.all")}</Button>
      </div>
    );

  if (userType === UserType.client)
    return (
      <div
        className={`${additionalClassNames}  flex flex-col items-center justify-between gap-3 p-3`}
      >
        <div className="flex w-full flex-col items-center justify-start gap-3">
          <h2>{t("Home.HomeGuideCard.header")}</h2>
          <div className="w-full border-t-2" />
          <div className="flex w-full flex-col items-start justify-around gap-5">
            <div className="flex w-full flex-col items-center justify-start gap-2">
              <h3>{t("Home.HomeGuideCard.information.header")}</h3>
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <Link
                  to="/guide"
                  className={`w-full px-3 py-1 duration-300 hover:bg-türkis-300 md:px-3 md:py-2`}
                >
                  {`>`} {t("Home.HomeGuideCard.information.beginner")}
                </Link>
                <Link
                  to="/guide"
                  className={`w-full px-3 py-1 duration-300 hover:bg-türkis-300 md:px-3 md:py-2`}
                >
                  {`>`} {t("Home.HomeGuideCard.information.advanced")}
                </Link>
                <Link
                  to="/guide"
                  className={`w-full px-3 py-1 duration-300 hover:bg-türkis-300 md:px-3 md:py-2`}
                >
                  {`>`} {t("Home.HomeGuideCard.information.expert")}
                </Link>
              </div>
            </div>
            <div className="w-full border-t-2 " />
            <div className="flex w-full flex-col items-center justify-start gap-2">
              <h3>{t("Home.HomeGuideCard.service.header")}</h3>
              <div className="flex w-full flex-col items-start justify-center gap-1">
                <Link
                  to="/guide"
                  className={`w-full px-3 py-1 duration-300 hover:bg-türkis-300 md:px-3 md:py-2`}
                >
                  {`>`} {t("Home.HomeGuideCard.service.use-produce")}
                </Link>
                <Link
                  to="/guide"
                  className={`w-full px-3 py-1 duration-300 hover:bg-türkis-300 md:px-3 md:py-2`}
                >
                  {`>`} {t("Home.HomeGuideCard.service.use-design")}
                </Link>
                <Link
                  to="/guide"
                  className={`w-full px-3 py-1 duration-300 hover:bg-türkis-300 md:px-3 md:py-2`}
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
      className={`${additionalClassNames}  flex flex-col items-center justify-center gap-3 p-3 duration-300 hover:bg-türkis-300`}
    >
      <PsychologyAltIcon fontSize="large" />
      <h2>{t("Home.HomeGuideCard.header")}</h2>
    </Link>
  );
};

export default HomeGuideCard;
