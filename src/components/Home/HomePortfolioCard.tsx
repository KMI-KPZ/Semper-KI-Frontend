import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Props {
  className?: string;
}

type State = {
  user: "client" | "contractor";
};

const HomePortfolioCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const [state, setState] = useState<State>({ user: "client" });
  const { user } = state;
  const { t } = useTranslation();

  const handleOnClickSwitch = () => {
    setState((prevState) => ({
      ...prevState,
      user: prevState.user === "client" ? "contractor" : "client",
    }));
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
              user === "client" ? "-left-[200%]" : "left-0"
            }`}
          >
            <Link
              to="/portfolio?name=use-information"
              className={`py-1 px-3 duration-300 hover:bg-türkis-300`}
            >
              {`>`} {t("Home.HomePortfolioCard.client.information")}
            </Link>
            <Link
              to="/portfolio?name=use-produce"
              className={`py-1 px-3 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.client.produce")}
            </Link>
            <Link
              to="/portfolio?name=use-design"
              className={`py-1 px-3 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.client.design")}
            </Link>
            <Link
              to="/portfolio?name=use-accompany"
              className={`py-1 px-3 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.client.accompany")}
            </Link>
          </div>
          <div
            className={`absolute flex w-full flex-col gap-2 overflow-clip duration-300 ${
              user === "client" ? "left-0" : "left-[200%]"
            }`}
          >
            <Link
              to="/portfolio?name=provide-produce"
              className={`py-1 px-3 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.contractor.produce")}
            </Link>
            <Link
              to="/portfolio?name=provide-design"
              className={`py-1 px-3 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.contractor.design")}
            </Link>
            <Link
              to="/portfolio?name=provide-accompany"
              className={`py-1 px-3 duration-300 hover:bg-türkis-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.contractor.accompany")}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <div className="w-full border-t-2" />
        <div
          className="relative flex select-none flex-row items-center justify-between overflow-clip bg-türkis-300 p-1 hover:cursor-pointer"
          onClick={handleOnClickSwitch}
        >
          <span
            className={`py-1 px-3 duration-300
        ${user === "client" ? "bg-türkis-300" : "bg-türkis-800 text-white"}`}
          >
            {t("Home.HomePortfolioCard.button.client")}
          </span>
          <div
            className={`absolute ${user === "client" ? "left-0" : "right-0"}`}
          />
          <span
            className={`py-1 px-3 duration-300
        ${user === "client" ? "bg-türkis-800 text-white" : "bg-türkis-300"}`}
          >
            {t("Home.HomePortfolioCard.button.contractor")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePortfolioCard;
