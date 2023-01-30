import React from "react";
import { useTranslation } from "react-i18next";
import {
  IconCart,
  IconChecklist,
  IconDocument,
  IconNewDocument,
  IconPerson,
} from "../../../config/Icons";
import { IOrder } from "../../../interface/Interface";
import "./Dashboard.scss";
import DashboardCard from "./DashboardCard";
import DashboardOrderCard from "./DashboardOrderCard";

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

interface Props {}

const Dashboard = (props: Props) => {
  const { t } = useTranslation();

  return (
    <div className="dashboard">
      <h1 className="dashboard-headline">{t("dashboard.headline")}</h1>
      <div className="dashboard-content">
        <div className="dashboard-content-column">
          <DashboardCard
            title="neuer Auftrag"
            icon={IconNewDocument}
            link="/process/new"
          />
          <DashboardCard title="Warenkorb" icon={IconCart} link="/cart" />
          <DashboardCard title="Guides" icon={IconChecklist} link="/guides" />
          <DashboardCard title="Account" icon={IconPerson} link="/account" />
        </div>
        <div className="dashboard-content-column">
          <DashboardCard
            title="Alle Aufträge"
            icon={IconDocument}
            link="/orders"
          />
          {testOrder.map((order: IOrder, index: number) => (
            <DashboardOrderCard order={order} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
