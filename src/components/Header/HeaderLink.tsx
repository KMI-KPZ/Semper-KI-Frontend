import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  icon?: React.ReactNode;
  text: string;
  link: string;
  closeMenus(): void;
  toggleUserType?: () => void;
  className?: string;
  menuItem?: boolean;
}

const HeaderLink = ({
  icon,
  text,
  link,
  toggleUserType,
  closeMenus,
  className,
  menuItem,
}: Props) => {
  const navigate = useNavigate();

  const handleOnClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (toggleUserType !== undefined) toggleUserType();
    closeMenus();
    navigate(link);
  };

  return (
    <li
      className={`nav-list-item ${menuItem ? "menu-item" : ""}`}
      onClick={handleOnClick}
      title={text}
    >
      <a
        href={`${link}`}
        className="nav-list-item-link"
        onClick={handleOnClick}
      >
        {icon}
        {text}
      </a>
    </li>
  );
};

export default HeaderLink;
