import React, { ReactNode } from "react";
import { ENavigationItemPreferred, EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import { IOrderCollectionEvent } from "../../interface/Interface";
import HomeItem from "./HomeItem";
import { NavigationItems } from "../../data/NavigationItems";

interface Props {
  userType: EUserType;
  events?: IOrderCollectionEvent[];
  cartCount: number;
}

export interface IHomeItem {
  userTypes: EUserType[];
  title: string;
  link: string;
  icon: ReactNode;
}

export const Home: React.FC<Props> = (props) => {
  const { userType, events, cartCount } = props;
  const { t } = useTranslation();

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

  const calcBadge = (title: string): number | undefined => {
    if (
      count !== undefined &&
      count > 0 &&
      (title === "data.NavigationItem.contracts" ||
        title === "data.NavigationItem.orders")
    )
      return getChangeCount();
    if (
      cartCount > 0 &&
      (title === "data.NavigationItem.cart" ||
        title === "data.NavigationItem.continue")
    )
      return cartCount;
    return undefined;
  };

  return (
    <div className="flex flex-col gap-12 justify-start items-center">
      <h1 className="">{t("Home.Home.header")}</h1>
      <div className="flex flex-row flex-wrap justify-center gap-5 p-4 md:p-0 items-center">
        {NavigationItems.filter(
          (item) =>
            item.userTypes.includes(userType) &&
            item.preferred.includes(ENavigationItemPreferred.home)
        )
          .filter(
            (item) =>
              (item.title === "data.NavigationItem.continue" &&
                cartCount > 0) ||
              item.title !== "data.NavigationItem.continue"
          )
          .map((item, index) => (
            <HomeItem
              key={index}
              homeItem={item}
              badge={calcBadge(item.title)}
            />
          ))}
      </div>
    </div>
  );
};
