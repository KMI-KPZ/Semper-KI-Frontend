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
      className={`${additionalClassNames}  p-3 flex flex-col justify-between items-center gap-5`}
    >
      <div className="flex flex-col gap-3 w-full items-center overflow-clip">
        <h2>{t("Home.HomePortfolioCard.header")}</h2>
        <div
          className={`relative flex flex-row gap-5 overflow-clip w-full h-60`}
        >
          <div
            className={`absolute flex flex-col w-full overflow-clip gap-1 duration-300 ${
              user === "client" ? "left-0" : "-left-[200%]"
            }`}
          >
            <Link
              to="/portfolio"
              className={`py-1 px-3 hover:bg-türkis-300 duration-300`}
            >
              {`>`} {t("Home.HomePortfolioCard.client.information")}
            </Link>
            <Link
              to="/portfolio"
              className={`py-1 px-3 hover:bg-türkis-300 duration-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.client.produce")}
            </Link>
            <Link
              to="/portfolio"
              className={`py-1 px-3 hover:bg-türkis-300 duration-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.client.design")}
            </Link>
            <Link
              to="/portfolio"
              className={`py-1 px-3 hover:bg-türkis-300 duration-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.client.accompany")}
            </Link>
          </div>
          <div
            className={`absolute flex flex-col w-full overflow-clip gap-2 duration-300 ${
              user === "client" ? "left-[200%]" : "left-0"
            }`}
          >
            <Link
              to="/portfolio"
              className={`py-1 px-3 hover:bg-türkis-300 duration-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.contractor.produce")}
            </Link>
            <Link
              to="/portfolio"
              className={`py-1 px-3 hover:bg-türkis-300 duration-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.contractor.design")}
            </Link>
            <Link
              to="/portfolio"
              className={`py-1 px-3 hover:bg-türkis-300 duration-300 `}
            >
              {`>`} {t("Home.HomePortfolioCard.contractor.accompany")}
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full items-center gap-2">
        <div className="border-t-2 w-full" />
        <div
          className="relative flex flex-row justify-between items-center bg-türkis-300 hover:cursor-pointer rounded-2xl overflow-clip select-none p-1"
          onClick={handleOnClickSwitch}
        >
          <span
            className={`py-1 px-3 duration-300 rounded-2xl
        ${user === "client" ? "bg-türkis-300" : "bg-türkis-800 text-white"}`}
          >
            {t("Home.HomePortfolioCard.button.client")}
          </span>
          <div
            className={`absolute ${user === "client" ? "left-0" : "right-0"}`}
          />
          <span
            className={`py-1 px-3 duration-300 rounded-2xl
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
