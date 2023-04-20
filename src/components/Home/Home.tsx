import React from "react";

import CardView, { ICardItem } from "../CardView/CardView";
import { EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";

import _HomeCards from "./HomeCards.json";
import _AdminCards from "./AdminCards.json";
import _ClientCards from "./ClientCards.json";
import _ManufacturerCards from "./ManufacturerCards.json";
// import useStatistics from "../../hooks/useStatistics";
const HomeCards = _HomeCards as ICardItem[];
const AdminCards = _AdminCards as ICardItem[];
const ClientCards = _ClientCards as ICardItem[];
const ManufacturerCards = _ManufacturerCards as ICardItem[];

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

  if (userType === EUserType.client)
    return (
      <div className="flex flex-col gap-12 justify-start items-center">
        <h1 className="">{t(`${prefix}.title`)}</h1>
        <div className="flex flex-row flex-wrap justify-center gap-5 p-4 md:p-0 items-center">
          {ClientCards.map((cardItem: ICardItem, index: number) => (
            <DashboardCard prefix={prefix} cardItem={cardItem} key={index} />
          ))}
        </div>
      </div>
    );
  if (userType === EUserType.manufacturer)
    return (
      <div className="flex flex-col gap-12 justify-start items-center">
        <h1 className="">{t(`${prefix}.title`)}</h1>
        <div className="flex flex-row flex-wrap justify-center gap-5 p-4 md:p-0 items-center">
          {ManufacturerCards.map((cardItem: ICardItem, index: number) => (
            <DashboardCard prefix={prefix} cardItem={cardItem} key={index} />
          ))}
        </div>
      </div>
    );
  if (userType === EUserType.admin)
    return (
      <div className="flex flex-col gap-12 justify-start items-center">
        <h1 className="">{t(`${prefix}.title`)}</h1>
        <div className="flex flex-row flex-wrap justify-center gap-5 p-4 md:p-0 items-center">
          {AdminCards.map((cardItem: ICardItem, index: number) => (
            <DashboardCard prefix={prefix} cardItem={cardItem} key={index} />
          ))}
        </div>
      </div>
    );

  return <CardView path="home" cards={HomeCards} />;
};
