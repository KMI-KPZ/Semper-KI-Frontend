import "../../../styles.scss";
import "./../ProcessView.scss";
import { Model } from "../../../interface/Interface";
import React, { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { IconButton } from "@mui/material";

interface Props {
  model: Model;
  selectModel: (model: Model) => void;
  setProgressState: (progressStateIndex: number) => void;
  grid: boolean;
}

interface State {
  fav: boolean;
  expanded: boolean;
}

export const ModelCatalogCard = ({
  model,
  selectModel,
  setProgressState,
  grid,
}: Props) => {
  const [state, setState] = useState<State>({
    fav: false,
    expanded: false,
  });

  const handleAddClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    selectModel(model);
    setProgressState(1);
  };

  const handleClickExpandIcon = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      expanded: !prevState.expanded,
    }));
  };
  const handleClickFavIcon = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setState((prevState) => ({
      ...prevState,
      fav: !prevState.fav,
    }));
  };

  return (
    <div
      className={`model-card ${grid ? "grid" : "list"} ${
        state.expanded ? "expanded" : ""
      }`}
    >
      <h2 className="model-card-headline">{model.file.name}</h2>
      <img
        className="model-card-img"
        src={require("../../../assets/images/model_placeholder.png")}
        alt="Model"
      />
      <h3 className="model-card-description-short">Kurzbeschreibung</h3>
      <span
        className={`model-card-description-long ${
          state.expanded || !grid ? "expanded" : "hidden"
        }`}
      >
        Langbeschreibung
        <br />
        Zertifikat 1
        <br />
        Zertifikat 2
        <br />
        Zertifikat 3
        <br />
        Zertifikat 4
        <br />
        Zertifikat 5
        <br />
        Maße 00x00x00cm
      </span>
      <div className="model-card-buttons">
        <IconButton onClick={handleClickFavIcon}>
          {state.fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        {grid ? (
          <IconButton onClick={handleClickExpandIcon}>
            {state.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        ) : null}
        <IconButton onClick={handleAddClick}>
          <ArrowCircleRightOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};
