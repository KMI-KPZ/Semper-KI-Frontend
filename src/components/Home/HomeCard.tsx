import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  link: string;
  text: string;
  icon: string;
}

export const HomeCard = ({ link, text, icon }: Props) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    navigate(link);
  };

  return (
    <a title={text} className="home-card" href={link} onClick={handleClick}>
      <img src={icon} />
      {text}
    </a>
  );
};
