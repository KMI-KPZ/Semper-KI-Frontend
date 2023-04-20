import React from "react";

import CardView, { ICardItem } from "../CardView/CardView";
import { EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import DashboardCard from "./DashboardCard";
import Badge from "../General/Badge";

import _HomeCards from "./HomeCards.json";
import _AdminCards from "./AdminCards.json";
import _ClientCards from "./ClientCards.json";
import _ManufacturerCards from "./ManufacturerCards.json";
import { IOrderCollectionEvent } from "../../interface/Interface";

const HomeCards = _HomeCards as ICardItem[];
const AdminCards = _AdminCards as ICardItem[];
const ClientCards = _ClientCards as ICardItem[];
const ManufacturerCards = _ManufacturerCards as ICardItem[];
interface Props {
  userType?: EUserType;
  events?: IOrderCollectionEvent[];
}

export const Home: React.FC<Props> = (props) => {
  const { userType, events } = props;
  const { t } = useTranslation();
  const prefix: string =
    userType === EUserType.admin ? "dashboard.admin" : "dashboard";

  const getChangeCount = (): number | undefined => {
    if (events === undefined) return undefined;
    let count = 0;
    events.forEach((orderCollectionEvent) => {
      orderCollectionEvent.orders.forEach((orderEvent) => {
        if (orderEvent.messages !== undefined && orderEvent.messages > 0)
          count += orderEvent.messages;
        if (orderEvent.status !== undefined && orderEvent.status > 0)
          count += orderEvent.status;
      });
    });
    return count;
  };
  const count = getChangeCount();

  if (userType === EUserType.client)
    return (
      <div className="flex flex-col gap-12 justify-start items-center">
        <h1 className="">{t(`${prefix}.title`)}</h1>
        <div className="flex flex-row flex-wrap justify-center gap-5 p-4 md:p-0 items-center">
          {ClientCards.map((cardItem: ICardItem, index: number) => (
            <DashboardCard
              prefix={prefix}
              cardItem={cardItem}
              key={index}
              badge={
                cardItem.title === "orders" && count !== undefined && count > 0
                  ? count
                  : undefined
              }
            />
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
            <DashboardCard
              prefix={prefix}
              cardItem={cardItem}
              key={index}
              badge={
                cardItem.title === "contracts" &&
                count !== undefined &&
                count > 0
                  ? count
                  : undefined
              }
            />
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
