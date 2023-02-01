import React, { ReactNode, useRef, useState } from "react";

import "./Home.scss";
import { EUserType } from "../../interface/enums";
import { HomeCard, IHomeCard } from "./HomeCard";
import { useTranslation } from "react-i18next";

import _homeItems from "./HomeItems.json";
const homeItems = _homeItems as IHomeCard[];

interface Props {
  userType: EUserType;
}

export const Home: React.FC<Props> = ({}) => {
  const { t } = useTranslation();
  return (
    <div className="home" data-testid="home">
      <h1 className="home-headline">{t("home.headline")}</h1>
      <div className="home-box">
        {homeItems.map((homeCard: IHomeCard, index: number) => (
          <HomeCard homeCard={homeCard} key={index} />
        ))}
      </div>
    </div>
  );
};
