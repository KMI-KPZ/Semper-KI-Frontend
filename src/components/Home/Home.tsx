import React from "react";

import CardView, { ICardItem } from "../CardView/CardView";
import { EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";

import _HomeCards from "./HomeCards.json";
import _AdminCards from "./AdminCards.json";
import _UserCards from "./UserCards.json";
// import useStatistics from "../../hooks/useStatistics";
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
  // const { statistics } = useStatistics();
  // const { active, loggedIn } = statistics;
  const prefix: string =
    userType === EUserType.admin ? "dashboard.admin" : "dashboard";

  return isLoggedIn === false ? (
    <CardView path="home" cards={HomeCards} />
  ) : (
    <div className="flex flex-col gap-12 justify-start items-center">
      <h1 className="">{t(`${prefix}.title`)}</h1>
      {/* {infoCard} */}
      <div className="flex flex-row flex-wrap justify-center gap-5 p-4 md:p-0 items-center">
        {(userType === EUserType.admin ? AdminCards : UserCards).map(
          (cardItem: ICardItem, index: number) => (
            <DashboardCard prefix={prefix} cardItem={cardItem} key={index} />
          )
        )}
      </div>
    </div>
  );
};
