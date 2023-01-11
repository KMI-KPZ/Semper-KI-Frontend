import React, { useRef } from "react";

import "./Home.scss";
import { UploadFile } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Fab } from "@mui/material";
import { HomeCard } from "./HomeCard";
import { TUserType } from "../../interface/types";

const ModelIcon: React.ReactNode = (
  <img
    style={{ width: "5em", height: "5em" }}
    // className="kiss_logo"
    src={require("../../assets/images/3d_model.svg").default}
    alt=""
  />
);

const PrintIcon: React.ReactNode = (
  <img
    style={{ width: "5em", height: "5em" }}
    // className="kiss_logo"
    src={require("../../assets/images/3d_print.svg").default}
    alt=""
  />
);

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
        <div className="home-container">
          <h2>Als Kunden</h2>
          <hr className="home-hr" />
          <HomeCard
            link="/guide/client-print"
            text="Bestellung mit Guide starten"
          />
          <HomeCard
            link="/process/models"
            text="Bestellung ohne guide starten"
          />
          <HomeCard
            link="/guide/client-design"
            text="Modell entwickeln lassen"
          />
        </div>
        <div className="home-container">
          <h2>Als Anbieter</h2>
          <hr className="home-hr" />
          <HomeCard link="/guide/contractor-print" text="Modelle produzieren" />
          <HomeCard link="/guide/contractor-design" text="Modelle entwickeln" />
          <HomeCard
            link="/guide/contractor-service"
            text="andere Services anbieten"
          />
        </div>
      </div>
      <Fab
        sx={{
          position: "absolute",
          bottom: 50,
          right: 50,
          color: "blue",
          backgroundColor: "yellow",
          "&:hover": {
            backgroundColor: "blue",
            color: "yellow",
          },
        }}
        onClick={() => navigate("/test")}
      >
        TEST
      </Fab>
    </div>
  );
};
