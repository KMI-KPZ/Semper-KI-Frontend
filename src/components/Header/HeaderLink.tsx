import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  Icon: React.ReactNode;
  text: string;
  link: string;
  toggleUserType?: () => void;
}

const HeaderLink = ({ Icon, text, link, toggleUserType }: Props) => {
  const navigate = useNavigate();

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (toggleUserType !== undefined) toggleUserType();
    navigate(`${link}`);
  };

  return (
    <li className="header-link">
      <a href={`${link}`} onClick={handleOnClick}>
        {Icon}
        {text}
      </a>
    </li>
  );
};

export default HeaderLink;
