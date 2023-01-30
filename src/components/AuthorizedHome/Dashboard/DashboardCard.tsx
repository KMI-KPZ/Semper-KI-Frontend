import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  title: string;
  icon: string;
  link: string;
}

const DashboardCard: React.FC<Props> = ({ title, icon, link }) => {
  const navigate = useNavigate();
  const handleOnClickCard = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(link);
  };

  return (
    <a className="dashboard-card" onClick={handleOnClickCard} href={link}>
      <img src={icon} />
      <h2>{title}</h2>
    </a>
  );
};

export default DashboardCard;
