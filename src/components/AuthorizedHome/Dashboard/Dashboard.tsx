import React from "react";
import { useTranslation } from "react-i18next";
import {
  IconCart,
  IconChecklist,
  IconDocument,
  IconNewDocument,
  IconPerson,
} from "../../../config/Icons";
import { EUserType } from "../../../interface/enums";
import { IOrder } from "../../../interface/Interface";
import "./Dashboard.scss";
import DashboardCard from "./DashboardCard";
import DashboardOrderCard from "./DashboardOrderCard";
import { ICardItem } from "../../CardView/CardView";

import _AdminCards from "./AdminCards.json";
import _UserCards from "./UserCards.json";
const AdminCards = _AdminCards as ICardItem[];
const UserCards = _UserCards as ICardItem[];

const testOrder: IOrder[] = [
  {
    date: new Date(),
    orderId: Math.round(Math.random() * 100000),
    processList: [{}],
    orderState: 0,
  },
  {
    date: new Date(),
    orderId: Math.round(Math.random() * 100000),
    processList: [{}],
    orderState: 1,
  },
  {
    date: new Date(),
    orderId: Math.round(Math.random() * 100000),
    processList: [{}],
    orderState: 2,
  },
  {
    date: new Date(),
    orderId: Math.round(Math.random() * 100000),
    processList: [{}],
    orderState: 3,
  },
  {
    date: new Date(),
    orderId: Math.round(Math.random() * 100000),
    processList: [{}],
    orderState: 4,
  },
  {
    date: new Date(),
    orderId: Math.round(Math.random() * 100000),
    processList: [{}],
    orderState: 5,
  },
];

interface Props {
  userType: EUserType;
}

const Dashboard: React.FC<Props> = ({ userType }) => {
  const { t } = useTranslation();

  const prefix: string =
    userType === EUserType.admin ? "dashboard.admin" : "dashboard";

  return (
    <div className="dashboard">
      <h1 className="dashboard-headline">{t(`${prefix}.title`)}</h1>
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

export default Dashboard;
