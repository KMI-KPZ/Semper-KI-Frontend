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

  const getHomeCards = () => {
    const clientCards = (
      <>
        <HomeCard
          className="home-card"
          icon={
            <input
              type="search"
              placeholder={t("home.button.search-placeholder")}
              className="home-search"
              ref={searchInput}
            />
          }
          link="/process/models"
          text={t("home.button.search")}
        />
        <HomeCard
          className="home-card"
          icon={<UploadFile sx={{ fontSize: "60px" }} />}
          link="/process/models/upload"
          text={t("home.button.upload")}
        />
        <HomeCard
          className="home-card"
          icon={
            <p style={{ fontSize: "3rem", fontWeight: "700", margin: "0" }}>
              ?
            </p>
          }
          link="/guide"
          text={t("home.button.guide")}
        />
      </>
    );

    const contractorCards = (
      <>
        <HomeCard
          className="home-card"
          icon={PrintIcon}
          link=""
          text={t("home.button.print")}
        />
        <HomeCard
          className="home-card"
          icon={ModelIcon}
          link=""
          text={t("home.button.design")}
        />
      </>
    );
    return userType === "client" ? clientCards : contractorCards;
  };

  return (
    <div className="container flex-container column" data-testid="home">
      <div className="home-box">
        <div className="home-header" data-testid="header">
          {t(`home.header.${userType === "client" ? "client" : "contractor"}`)}
        </div>
        <div className="home-cards-container">{getHomeCards()}</div>
      </div>
      {userType === "client" && (
        <img
          className="workflow-img"
          src={require("../../assets/images/workflow.png")}
          alt="3D-Print Work Flow"
        />
      )}
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
