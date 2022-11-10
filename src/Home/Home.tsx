import React, { useRef } from "react";

import "./Home.scss";
import { UploadFile } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const Home = () => {
  const searchInput = useRef<HTMLInputElement>(null);
  const searchCard = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleClickSearch = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();
    navigate("/Process/Model/Catalog");

    if (searchInput.current) {
      searchInput.current.focus();
    }
  };

  const handleClickUpload = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ): void => {
    e.preventDefault();
    navigate("/Process/Model/Upload");
  };

  const handleFocusSearch = (
    e: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    e.preventDefault();
    if (searchCard.current) {
      searchCard.current.style.boxShadow = "0 0 0 2px white";
    }
  };

  const handleBlurSearch = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    e.preventDefault();
    if (searchCard.current) {
      searchCard.current.style.boxShadow = "none";
    }
  };

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    navigate("/Process/Model/Catalog");
  };

  const { t } = useTranslation();

  return (
    <div className="container flex-container column" data-testid="home">
      <div className="home-box">
        <div className="home-header" data-testid="header">
          {t("home.header")}
        </div>
        <div className="home-cards-container">
          <div
            className="home-card light"
            onClick={handleClickSearch}
            onMouseDown={handleClickSearch}
            ref={searchCard}
          >
            <input
              type="search"
              placeholder={t("home.button.search-placeholder")}
              className="home-search"
              ref={searchInput}
              onFocus={(e) => handleFocusSearch(e)}
              onBlur={handleBlurSearch}
              onChange={handleChangeSearch}
            />
            <div className="home-card-text">{t("home.button.search")}</div>
          </div>
          <div className="home-card dark" onClick={handleClickUpload}>
            <UploadFile sx={{ fontSize: "60px" }} />
            <div className="home-card-text">{t("home.button.upload")}</div>
          </div>
          <div className="home-card normal" onClick={() => navigate("/test")}>
            <div className="home-card-text normal">Test</div>
          </div>
        </div>
      </div>
      <img
        className="workflow-img"
        src={require("../images/workflow.png")}
        alt="3D-Print Work Flow"
      />
    </div>
  );
};
