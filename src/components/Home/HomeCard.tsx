import React, { ReactNode } from "react";

import "./HomeCard.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  link: string;
  text: string;
}

export const HomeCard = ({ link, text }: Props) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(link);
  };

  return (
    <a title={text} className="home-card" href={link} onClick={handleClick}>
      {text}
    </a>
  );
};
