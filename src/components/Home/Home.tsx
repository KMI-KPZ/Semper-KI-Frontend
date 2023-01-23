import React, { ReactNode, useRef } from "react";

import "./Home.scss";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HomeCard } from "./HomeCard";
import { TUserType } from "../../interface/types";
import FactoryIcon from "@mui/icons-material/Factory";

const Icon3DPrinter =
  require("../../assets/images/icons/3dPrinter.svg").default;
const IconModel = require("../../assets/images/icons/Model.svg").default;
const IconSearchModel =
  require("../../assets/images/icons/SearchModel.svg").default;
const IconSearchPerson =
  require("../../assets/images/icons/SearchPerson.svg").default;
const IconFactory = require("../../assets/images/icons/Factory.svg").default;
const IconSupplyChain =
  require("../../assets/images/icons/SupplyChain.svg").default;

interface Props {
  userType: TUserType;
}

export const Home = ({ userType }: Props) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const searchCard = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="home" data-testid="home">
      <h1 className="home-headline">{t("home.headline")}</h1>
      <div className="home-box">
        <div className="home-card-box">
          <h2 className="home-card-box-header">Angebot</h2>
          <div className="home-card-box-row">
            <HomeCard
              link="/process/models"
              text="Herstellen lassen"
              icon={Icon3DPrinter}
            />
            <HomeCard
              link="/process/models"
              text="Modell finden"
              icon={IconSearchModel}
            />
          </div>
          <div className="home-card-box-row">
            <HomeCard
              link="/process/models"
              text="Hersteller finden"
              icon={IconSearchPerson}
            />
            <HomeCard
              link="/process/models"
              text="Entwerfen lassen"
              icon={IconModel}
            />
          </div>
        </div>
        <div className="home-card-box">
          <h2 className="home-card-box-header">Service Anbieten</h2>
          <div className="home-card-box-row">
            <HomeCard
              link="/process/models"
              text="Produzieren"
              icon={IconFactory}
            />
            <HomeCard
              link="/process/models"
              text="Entwerfen"
              icon={IconModel}
            />
          </div>
          <HomeCard
            link="/process/models"
            text="Gesamtprozess begleiten"
            icon={IconSupplyChain}
          />
        </div>
      </div>
    </div>
  );
};
