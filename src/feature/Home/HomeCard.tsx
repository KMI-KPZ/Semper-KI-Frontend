import React, { ReactNode } from "react";

import "./HomeCard.scss";
import { useNavigate } from "react-router-dom";

interface Props {
  link: string;
  className: string;
  text: string;
  icon: ReactNode;
}

export const HomeCard = ({ link, className, icon, text }: Props) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(link);
  };

  return (
    <a href={link} className={className} onClick={handleClick}>
      {icon}
      <div className="card-text">{text}</div>
    </a>
  );
};
