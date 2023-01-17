import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  icon?: React.ReactNode;
  text: string;
  link: string;
  className?: string;
  menuItem?: boolean;
  extern?: boolean;
  closeMenus(): void;
  toggleUserType?: () => void;
}

const HeaderLink = ({
  icon,
  text,
  link,
  menuItem,
  extern,
  toggleUserType,
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
      if (toggleUserType !== undefined) toggleUserType();
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
