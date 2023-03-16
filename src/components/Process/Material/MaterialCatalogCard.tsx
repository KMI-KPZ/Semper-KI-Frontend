import "./Material.scss";
import { IMaterial } from "../../../interface/Interface";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { IconButton } from "@mui/material";

interface Props {
  material: IMaterial;
  selectMaterial: (material: IMaterial) => void;
  grid: boolean;
}

interface State {
  fav: boolean;
}

export const MaterialCatalogCard: React.FC<Props> = (props) => {
  const { material, selectMaterial, grid } = props;
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    fav: false,
  });

  const handleAddClick = () => {
    selectMaterial(material);
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
    <div className={`material-card ${grid ? "grid" : "list"}`}>
      <img className="material-card-image" src={material.URI} alt="Material" />
      <h2 className="material-card-header">{material.title}</h2>
      <div className="material-card-specs">
        {material.propList?.map((spec: string, index: number) => (
          <p className="material-card-text" key={index}>
            {spec}
          </p>
        ))}
      </div>
      <h2 className="material-card-price">
        {t("material.catalog.card.price")}: <b>$$$</b>
      </h2>
      <div className="material-card-buttons">
        <IconButton onClick={handleClickFavIcon}>
          {state.fav ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
        <IconButton onClick={handleAddClick}>
          <ArrowCircleRightOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
};
