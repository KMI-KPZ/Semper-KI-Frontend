import React from "react";
import { useNavigate } from "react-router-dom";
import { getIconByName } from "../../config/Icons";
import { IHeaderItem } from "../../interface/Interface";

interface Props {
  isMenuItem?: boolean;
  headeritem: IHeaderItem;
  closeMenus(): void;
}

const HeaderItem: React.FC<Props> = (props) => {
  const { headeritem, closeMenus, isMenuItem } = props;
  const navigate = useNavigate();

  const handleOnClick = (
    e:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    if (headeritem.extern === false) {
      e.preventDefault();
      closeMenus();
      navigate(headeritem.link);
    }
  };

  return (
    <li
      className={`nav-list-item ${isMenuItem === undefined ? "" : "menu-item"}`}
      onClick={handleOnClick}
      title={headeritem.title}
    >
      <a
        href={headeritem.link}
        className="nav-list-item-link"
        onClick={handleOnClick}
      >
        <img
          className="menu-img"
          src={getIconByName(headeritem.icon)}
          alt={`link to ${headeritem.link}`}
        />
        {headeritem.title}
      </a>
    </li>
  );
};

export default HeaderItem;
