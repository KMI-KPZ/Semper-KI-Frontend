import React from "react";

import _homeItems from "./HomeItems.json";
import CardView, { ICardItem } from "../Cards/CardView";
const homeItems = _homeItems as ICardItem[];

export const Home: React.FC = ({}) => {
  return <CardView path="home" cards={homeItems} />;
};
