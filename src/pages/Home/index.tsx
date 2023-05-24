import HomeSearchCard from "./components/SearchCard";
import HomeOrderCard from "./components/OrderCard";
import HomeGuideCard from "./components/GuideCard";
import HomePortfolioCard from "./components/PortfolioCard";
import HomeMagazinCard from "./components/MagazinCard";
import HomeNewsCard from "./components/NewsCard";
import HomeBMWKImgCard from "./components/BMWKImgCard";
import { OrderCollectionEvent, UserType } from "@/hooks/useUser";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";

interface Props {
  userType: UserType;
  events?: OrderCollectionEvent[];
  cartCount: number;
}

export interface IHomeItem {
  userTypes: UserType[];
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
    return count > 0 ? count : undefined;
  };
  const count = getChangeCount();

  // if (userType !== UserType.anonym)
  //   return (
  //     <div className="flex flex-col gap-12 justify-start items-center">
  //       <h1 className="">{t("Home.Home.header")}</h1>
  //       <div className="flex flex-row flex-wrap justify-center gap-5 p-4 md:p-0 items-center">
  //         {NavigationItems.filter(
  //           (item) =>
  //             item.userTypes.includes(userType) &&
  //             item.preferred.includes(ENavigationItemPreferred.home)
  //         )
  //           .filter(
  //             (item) =>
  //               (item.title === "data.NavigationItem.continue" &&
  //                 cartCount > 0) ||
  //               item.title !== "data.NavigationItem.continue"
  //           )
  //           .map((item, index) => (
  //             <HomeItem
  //               key={index}
  //               homeItem={item}
  //               badge={calcBadge(item.title)}
  //             />
  //           ))}
  //       </div>
  //     </div>
  //   );

  return (
    <div className="flex h-full w-full flex-grow flex-col items-center justify-start gap-5 md:grid md:grid-cols-3">
      <HomeSearchCard className="w-full bg-white md:order-2 md:col-span-2 md:h-full" />
      <HomeOrderCard
        userType={userType}
        className="w-full bg-white md:order-1 md:row-span-3 md:h-full"
        cartCount={cartCount > 0 ? cartCount : undefined}
        ordersCount={count}
      />
      <HomeGuideCard
        userType={userType}
        className="w-full bg-white md:order-5 md:row-span-2 md:h-full"
      />
      <HomePortfolioCard className="w-full bg-white md:order-4 md:row-span-2 md:h-full" />
      <HomeMagazinCard className="w-full md:order-3 md:h-full" />
      <HomeNewsCard className="w-full  bg-white md:order-5 md:h-full" />
      <HomeBMWKImgCard className="w-full  md:order-6 md:h-full" />
    </div>
  );
};
