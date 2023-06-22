import HomeSearchCard from "./components/SearchCard";
import HomeOrderCard from "./components/OrderCard";
import HomeGuideCard from "./components/GuideCard";
import HomePortfolioCard from "./components/PortfolioCard";
import HomeMagazinCard from "./components/MagazinCard";
import HomeNewsCard from "./components/NewsCard";
import HomeImgCard from "./components/ImgCard";
import { Event, OrderEvent, UserType } from "@/hooks/useUser/types";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import HomeResourcesCard from "./components/ResourcesCard";

interface Props {
  userType: UserType;
  events?: Event[];
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
    events
      .filter((event) => event.eventType === "orderEvent")
      .forEach((_orderEvent) => {
        const orderEvent = _orderEvent as OrderEvent;
        orderEvent.orders.forEach((orderEvent) => {
          if (orderEvent.messages !== undefined && orderEvent.messages > 0)
            count += orderEvent.messages;
          if (orderEvent.status !== undefined && orderEvent.status > 0)
            count += orderEvent.status;
        });
      });
    return count > 0 ? count : undefined;
  };
  const count = getChangeCount();

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
      {userType === UserType.manufacturer ? (
        <HomeResourcesCard className="w-full bg-white md:order-4 md:row-span-2 md:h-full" />
      ) : (
        <HomePortfolioCard className="w-full bg-white md:order-4 md:row-span-2 md:h-full" />
      )}
      <HomeMagazinCard className="w-full md:order-3 md:h-full" />
      <HomeNewsCard className="w-full  bg-white md:order-5 md:h-full" />
      <HomeImgCard className="w-full  md:order-6 md:h-full" />
    </div>
  );
};
