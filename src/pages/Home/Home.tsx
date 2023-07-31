import HomeSearchCard from "./components/Search";
import HomeOrderCard from "./components/Order";
import HomeGuideCard from "./components/Guide";
import HomePortfolioCard from "./components/Portfolio";
import HomeMagazinCard from "./components/Magazin";
import HomeNewsCard from "./components/News";
import HomeImgCard from "./components/Images";
import { UserType } from "@/hooks/useUser/types";
import { Event, OrderEvent } from "@/pages/App/types";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import HomeResourcesCard from "./components/Resources";
import { getOrderEventAmount } from "../App/hooks/useEvents";
import { Heading, Text } from "@component-library/Typography";
import AnonymHome from "./Anonym/Home";

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

  // if (userType === UserType.anonym)
  return <AnonymHome />;

  return (
    <div
      className="flex h-full w-full flex-grow flex-col items-center justify-start gap-5 md:grid md:grid-cols-3"
      data-testid="home"
    >
      <HomeSearchCard className="w-full bg-white md:order-2 md:col-span-2 md:h-full" />
      <HomeOrderCard
        userType={userType}
        className="w-full bg-white md:order-1 md:row-span-3 md:h-full"
        cartCount={cartCount > 0 ? cartCount : undefined}
        ordersCount={getOrderEventAmount(events)}
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
