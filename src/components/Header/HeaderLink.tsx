import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  icon?: React.ReactNode;
  text: string;
  link: string;
  menuItem?: boolean;
  extern?: boolean;
  closeMenus(): void;
}

const HeaderLink = ({
  icon,
  text,
  link,
  menuItem,
  extern,
  closeMenus,
}: Props) => {
  const navigate = useNavigate();

  const handleOnClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (extern === undefined) {
      e.preventDefault();
      closeMenus();
      navigate(link);
    }
  };

  return (
    <li
      className={`nav-list-item ${menuItem ? "menu-item" : ""}`}
      onClick={handleOnClick}
      title={text}
    >
      <a href={link} className="nav-list-item-link" onClick={handleOnClick}>
        {icon}
        {text}
      </a>
    </li>
  );
};

export default HeaderLink;
