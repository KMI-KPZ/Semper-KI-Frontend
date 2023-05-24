import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserSwitch } from "@component-library/Input";
import { EUserType } from "@/interface/enums";

interface Props {
  className?: string;
}

const HomePortfolioCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const [userType, setUserType] = useState<EUserType>(EUserType.client);
  const { t } = useTranslation();

  const handleOnClickSwitch = (userType: EUserType) => {
    setUserType(userType);
  };

  return (
    <div
      className={`${additionalClassNames}  flex flex-col items-center justify-between gap-5 p-3`}
    >
      <div className="flex w-full flex-col items-center gap-3 overflow-clip">
        <h2>{t("Home.HomePortfolioCard.header")}</h2>
        <div className="w-full border-t-2" />
        <div
          className={`relative flex h-60 w-full flex-row gap-5 overflow-clip`}
        >
          <div
            className={`absolute flex w-full flex-col gap-1 overflow-clip duration-300 ${
              userType === EUserType.client ? "-left-[200%]" : "left-0"
            }`}
          >
            <Link
              to="/portfolio?name=use-information"
              className={`px-3 py-1 duration-300 hover:bg-türkis-300`}
            >
              {`>`} {t("Home.HomePortfolioCard.client.information")}
            </Link>
            <Link
              to="/portfolio?name=use-produce"
              className={`px-3 py-1 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.client.produce")}
            </Link>
            <Link
              to="/portfolio?name=use-design"
              className={`px-3 py-1 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.client.design")}
            </Link>
            <Link
              to="/portfolio?name=use-accompany"
              className={`px-3 py-1 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.client.accompany")}
            </Link>
          </div>
          <div
            className={`absolute flex w-full flex-col gap-2 overflow-clip duration-300 ${
              userType === EUserType.client ? "left-0" : "left-[200%]"
            }`}
          >
            <Link
              to="/portfolio?name=provide-produce"
              className={`px-3 py-1 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.contractor.produce")}
            </Link>
            <Link
              to="/portfolio?name=provide-design"
              className={`px-3 py-1 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.contractor.design")}
            </Link>
            <Link
              to="/portfolio?name=provide-accompany"
              className={`px-3 py-1 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.contractor.accompany")}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <div className="w-full border-t-2" />
        <UserSwitch onClick={handleOnClickSwitch} userType={userType} />
      </div>
    </div>
  );
};

export default HomePortfolioCard;
