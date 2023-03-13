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
      className="hover:bg-gray-300 hover:cursor-pointer p-2"
      onClick={handleOnClick}
      title={headeritem.title}
    >
      <a
        href={headeritem.link}
        className="flex flex-row items-center gap-2"
        onClick={handleOnClick}
      >
        <img
          className="h-6 xl:h-8"
          src={getIconByName(headeritem.icon)}
          alt={`link to ${headeritem.link}`}
        />
        {headeritem.title}
      </a>
    </li>
  );
};

export default HeaderItem;
