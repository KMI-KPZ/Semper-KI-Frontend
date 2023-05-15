import React, { ReactNode, useRef, useState } from "react";
import { ENavigationItemPreferred, EUserType } from "../../interface/enums";
import { useTranslation } from "react-i18next";
import { IOrderCollectionEvent } from "../../interface/Interface";
import HomeItem from "./HomeItem";
import { NavigationItems } from "../../data/NavigationItems";
import SearchIcon from "@mui/icons-material/Search";
import Button from "../General/Button";
import { Link } from "react-router-dom";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PsychologyAltIcon from "@mui/icons-material/PsychologyAlt";
import { Switch } from "@mui/material";

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
type State = {
  user: "client" | "contractor";
};

export const Home: React.FC<Props> = (props) => {
  const { userType, events, cartCount } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<State>({ user: "client" });
  const clientButton = useRef(null);
  const contractorButton = useRef(null);
  const { user } = state;

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

  const handleOnClickSwitch = () => {
    setState((prevState) => ({
      ...prevState,
      user: prevState.user === "client" ? "contractor" : "client",
    }));
  };

  if (userType !== EUserType.anonym)
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

  return (
    <div className="flex flex-col flex-grow gap-5 justify-start items-center md:grid md:grid-cols-3 w-full h-full pt-5">
      <div className="md:order-2 md:col-span-2 bg-white md:h-full w-full p-3 flex flex-row justify-center items-center gap-5">
        <div className="w-4/5 flex items-center justify-center">
          <input
            type="text"
            className="p-3 border-2 w-full"
            placeholder="Suche..."
          />
        </div>
        <div className="w-1/5 md:w-fit flex items-center justify-center">
          <Button icon={<SearchIcon />}></Button>
        </div>
      </div>
      <Link
        to="/process/model"
        className="md:order-1 md:row-span-2 bg-white md:h-full w-full p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300"
      >
        <LocalShippingIcon fontSize="large" />
        <h2>Auftrag beginnen</h2>
      </Link>
      <Link
        to="/guide"
        className="md:order-5 md:col-span-2 bg-white md:h-full w-full p-3 flex flex-col justify-center items-center gap-3 hover:bg-türkis-300 duration-300"
      >
        <PsychologyAltIcon fontSize="large" />
        <h2>Angeleiteter Einstieg</h2>
      </Link>
      <div className="md:order-4 md:row-span-2 bg-white md:h-full w-full p-3 flex flex-col justify-between items-center gap-5">
        <div className="flex flex-col gap-3 w-full items-center overflow-clip">
          <h2>Unser Portfolio</h2>
          <div
            className={`relative flex flex-row gap-5 overflow-clip w-full h-60`}
          >
            <div
              className={`absolute flex flex-col w-full overflow-clip gap-3 duration-300 ${
                user === "client" ? "left-0" : "-left-[200%]"
              }`}
            >
              <Link to="/guide">{`>`} Informieren über 3D-Druck</Link>
              <Link to="/process/model">{`>`} Teil herstellen lasssen</Link>
              <Link to="/guide">{`>`} Modell entwerfen lasssen</Link>
              <Link to="/guide">{`>`} Gesamtprozess begleiten lasssen</Link>
            </div>
            <div
              className={`absolute flex flex-col w-full overflow-clip gap-3 duration-300 ${
                user === "client" ? "left-[200%]" : "left-0"
              }`}
            >
              <Link to="/process/model">{`>`} Teile herstellen</Link>
              <Link to="/guide">{`>`} Modelle entwerfen</Link>
              <Link to="/guide">{`>`} Gesamtprozesse begleiten</Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full items-center gap-2">
          <div className="border-t-2 w-full" />
          <div
            className="relative flex flex-row justify-between items-center bg-türkis-300 hover:cursor-pointer rounded-2xl overflow-clip select-none p-1"
            onClick={handleOnClickSwitch}
          >
            <span
              className={`py-1 px-3 duration-300 rounded-2xl
              ${
                user === "client" ? "bg-türkis-300" : "bg-türkis-800 text-white"
              }`}
            >
              Für Autraggeber
            </span>
            <div
              className={`absolute ${user === "client" ? "left-0" : "right-0"}`}
            />
            <span
              className={`py-1 px-3 duration-300 rounded-2xl
              ${
                user === "client" ? "bg-türkis-800 text-white" : "bg-türkis-300"
              }`}
            >
              Für Anbieter
            </span>
          </div>
        </div>
      </div>
      <Link
        className="
          md:order-3 bg-türkis-800 hover:bg-türkis-700 duration-500
         text-white font-bold text-5xl md:h-full w-full p-3
          flex justify-center items-center select-none tracking-wider
            group relative
          "
        to="https://infai.4imedia.com/"
      >
        <h2 className=" text-white z-10">MAGAZIN</h2>
        <img
          className="absolute felx w-full h-full object-cover duration-500 opacity-0 group-hover:opacity-50"
          src={require("../../assets/images/Bubbles_snip.PNG")}
        />
      </Link>
    </div>
  );
};
