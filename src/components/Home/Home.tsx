import React from "react";

import CardView, { ICardItem } from "../CardView/CardView";
import { EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";

import "./Home.scss";

import _HomeCards from "./HomeCards.json";
import _AdminCards from "./AdminCards.json";
import _UserCards from "./UserCards.json";
import useStatistics from "../../hooks/useStatistics";
const HomeCards = _HomeCards as ICardItem[];
const AdminCards = _AdminCards as ICardItem[];
const UserCards = _UserCards as ICardItem[];

interface Props {
  isLoggedIn: boolean;
  userType: EUserType;
}

export const Home: React.FC<Props> = (props) => {
  const { userType, isLoggedIn } = props;
  const { t } = useTranslation();
  const { statistics } = useStatistics();
  const { active, loggedIn } = statistics;
  const prefix: string =
    userType === EUserType.admin ? "dashboard.admin" : "dashboard";

  const infoCard = (
    <div className="info-card unselectable">
      <h2>Aktive Benutzer:</h2>
      <h2>{active}</h2>
      <h2>Angemeldete Benutzer:</h2>
      <h2>{loggedIn}</h2>
    </div>
  );

  return isLoggedIn === false ? (
    <CardView path="home" cards={HomeCards}>
      {infoCard}
    </CardView>
  ) : (
    <div className="dashboard">
      <h1 className="dashboard-headline">{t(`${prefix}.title`)}</h1>
      {infoCard}
      <div className="dashboard-cards">
        {(userType === EUserType.admin ? AdminCards : UserCards).map(
          (cardItem: ICardItem, index: number) => (
            <DashboardCard prefix={prefix} cardItem={cardItem} key={index} />
          )
        )}
      </div>
    </div>
  );
};
