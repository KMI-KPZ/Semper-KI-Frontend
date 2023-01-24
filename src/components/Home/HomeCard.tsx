import React from "react";

interface Props {
  linkGuided: string;
  linkUnGuided: string;
  text: string;
  icon: string;
  openMenu(text: string, linkGuided: string, linkUnGuided: string): void;
}

export const HomeCard = ({
  linkGuided,
  linkUnGuided,
  text,
  icon,
  openMenu,
}: Props) => {
  const handleClickCard = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
    openMenu(text, linkGuided, linkUnGuided);
  };

  return (
    <div title={text} className="home-card" onClick={handleClickCard}>
      <img src={icon} />
      {text}
    </div>
  );
};
