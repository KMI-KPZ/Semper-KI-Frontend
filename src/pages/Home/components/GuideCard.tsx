import React from "react";
import { Link } from "react-router-dom";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import { UserType } from "@/hooks/useUser/types";

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
          <Heading variant="h2">{t("Home.HomeGuideCard.header")}</Heading>
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
        <Button title={t("Home.HomeGuideCard.button.all")} />
      </div>
    );

  if (userType === UserType.client)
    return (
      <div
        className={`${additionalClassNames}  flex flex-col items-center justify-between gap-3 p-3`}
      >
        <div className="flex w-full flex-col items-center justify-start gap-3">
          <Heading variant="h2">{t("Home.HomeGuideCard.header")}</Heading>
          <div className="w-full border-t-2" />
          <div className="flex w-full flex-col items-start justify-around gap-5">
            <div className="flex w-full flex-col items-center justify-start gap-2">
              <Button
                title={t("Home.HomeGuideCard.information.header")}
                variant="secondary"
              />
              <Heading variant="h3">
                {t("Home.HomeGuideCard.information.header")}
              </Heading>
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
              <Heading variant="h3">
                {t("Home.HomeGuideCard.service.header")}
              </Heading>
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
        <Button title={t("Home.HomeGuideCard.button.all")} />
      </div>
    );

  return (
    <Link
      to="/guide"
      className={`${additionalClassNames}  flex flex-col items-center justify-center gap-3 p-3 duration-300 hover:bg-türkis-300`}
    >
      <PsychologyAltIcon fontSize="large" />
      <Heading variant="h2">{t("Home.HomeGuideCard.header")}</Heading>
    </Link>
  );
};

export default HomeGuideCard;
