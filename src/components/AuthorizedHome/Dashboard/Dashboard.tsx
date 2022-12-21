import React from "react";
import { useTranslation } from "react-i18next";

interface Props {}

const Dashboard = (props: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="authorized-home-headline">{t("dashboard.headline")}</h1>
      <div className="authorized-home-content horizontal">
        <div className="authorized-home-content-box vertical full-height">
          <h2>{t("dashboard.proceedings")}</h2>
        </div>
        <div className="authorized-home-content-box vertical full-height">
          <h2>{t("dashboard.contracts")}</h2>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
