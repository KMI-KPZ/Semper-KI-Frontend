import React, { ReactNode, useRef, useState } from "react";

import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HomeCard } from "./HomeCard";
import HomePopup from "./HomePopup";
import {
  Icon3DPrinter,
  IconFactory,
  IconModel,
  IconSearchModel,
  IconSearchPerson,
  IconSupplyChain,
} from "../../config/Icons";
import { EUserType } from "../../interface/enums";

interface Props {
  userType: EUserType;
}

export interface State {
  isOpen: boolean;
  text: string;
  linkGuided: string;
  linkUnGuided: string;
}

export const Home = ({ userType }: Props) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const searchCard = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    isOpen: false,
    text: "",
    linkGuided: "",
    linkUnGuided: "",
  });

  const closeMenu = () => {
    setState((prevState) => ({
      ...prevState,
      isOpen: false,
      text: "",
      linkGuided: "",
      linkUnGuided: "",
    }));
  };

  const openMenu = (text: string, linkGuided: string, linkUnGuided: string) => {
    console.log();

    setState((prevState) => ({
      ...prevState,
      isOpen: true,
      text,
      linkGuided,
      linkUnGuided,
    }));
  };

  return (
    <div className="home" data-testid="home">
      <h1 className="home-headline">{t("home.headline")}</h1>
      <div className="home-box">
        <div className="home-card-box">
          <h2 className="home-card-box-header">Angebot</h2>
          <div className="home-card-box-row">
            <HomeCard
              linkGuided="/guide/have-it-made"
              linkUnGuided="/process/upload"
              text="Herstellen lassen"
              icon={Icon3DPrinter}
              openMenu={openMenu}
            />
            <HomeCard
              linkGuided="/guide/find-model"
              linkUnGuided="/process/models"
              text="Modell finden"
              icon={IconSearchModel}
              openMenu={openMenu}
            />
          </div>
          <div className="home-card-box-row">
            <HomeCard
              linkGuided="/guide/finde-manufacturer"
              linkUnGuided="/process/manufacturer"
              text="Hersteller finden"
              icon={IconSearchPerson}
              openMenu={openMenu}
            />
            <HomeCard
              linkGuided="/guide/let-design"
              linkUnGuided="/service/let-design"
              text="Entwerfen lassen"
              icon={IconModel}
              openMenu={openMenu}
            />
          </div>
        </div>
        <div className="home-card-box">
          <h2 className="home-card-box-header">Service Anbieten</h2>
          <div className="home-card-box-row">
            <HomeCard
              linkGuided="/guide/produce"
              linkUnGuided="/service/produce"
              text="Produzieren"
              icon={IconFactory}
              openMenu={openMenu}
            />
            <HomeCard
              linkGuided="/guide/design"
              linkUnGuided="/service/design"
              text="Entwerfen"
              icon={IconModel}
              openMenu={openMenu}
            />
          </div>
          <HomeCard
            linkGuided="/guide/accompany"
            linkUnGuided="/service/accompany"
            text="Gesamtprozess begleiten"
            icon={IconSupplyChain}
            openMenu={openMenu}
          />
        </div>
      </div>
      {state.isOpen === true ? (
        <HomePopup
          closeMenu={closeMenu}
          text={state.text}
          linkGuided={state.linkGuided}
          linkUnGuided={state.linkUnGuided}
        />
      ) : null}
    </div>
  );
};
