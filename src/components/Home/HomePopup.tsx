import React from "react";
import { useNavigate } from "react-router-dom";

import { IconBeaker, IconChecklist } from "../../config/Icons";

interface Props {
  closeMenu(): void;
  text: string;
  linkGuided: string;
  linkUnGuided: string;
}

const HomePopup: React.FC<Props> = ({
  closeMenu,
  text,
  linkGuided,
  linkUnGuided,
}) => {
  const navigate = useNavigate();

  const handleClickPopup = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    closeMenu();
  };

  const handleClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    link: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(link);
  };

  return (
    <div className="home-card-popup" onClick={handleClickPopup}>
      <div className="home-card-popup-headline">{text}</div>
      <div className="home-card-popup-cards">
        <a
          href={linkGuided}
          onClick={(e) => handleClickCard(e, linkGuided)}
          className="home-card-popup-card"
        >
          <img src={IconChecklist} />
          Mit Guide
        </a>
        <a
          href={linkUnGuided}
          onClick={(e) => handleClickCard(e, linkUnGuided)}
          className="home-card-popup-card"
        >
          <img src={IconBeaker} />
          Ohne Guide
        </a>
      </div>
    </div>
  );
};

export default HomePopup;
