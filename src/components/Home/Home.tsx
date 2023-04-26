import React, { ReactNode } from "react";
import { EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import { IOrderCollectionEvent } from "../../interface/Interface";
import HomeItem from "./HomeItem";
import { HomeItemsData } from "./HomeData";

interface Props {
  userType: EUserType;
  events?: IOrderCollectionEvent[];
  cartCount: number;
}

export interface IHomeItem {
  users: EUserType[];
  title: string;
  link: string;
  icon: ReactNode;
}

export const Home: React.FC<Props> = (props) => {
  const { userType, events, cartCount } = props;
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

  const getHomeItems = (userType: EUserType): IHomeItem[] => {
    return HomeItemsData.filter((homeItem) =>
      homeItem.users.includes(userType)
    );
  };

  const calcBadge = (title: string): number | undefined => {
    if (
      count !== undefined &&
      count > 0 &&
      (title === "HomeData.contracts" || title === "HomeData.orders")
    )
      return getChangeCount();
    if (cartCount > 0 && title === "HomeData.order") return cartCount;
    return undefined;
  };

  return (
    <div className="flex flex-col gap-12 justify-start items-center">
      <h1 className="">{t(`${prefix}.title`)}</h1>
      <div className="flex flex-row flex-wrap justify-center gap-5 p-4 md:p-0 items-center">
        {getHomeItems(userType).map((homeItem, index) => (
          <HomeItem
            key={index}
            homeItem={homeItem}
            badge={calcBadge(homeItem.title)}
          />
        ))}
      </div>
    </div>
  );
};
