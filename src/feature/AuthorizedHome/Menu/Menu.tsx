import React, { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../../interface/Interface";
import MenuItem from "./MenuItem";
import { getMenuItems, MenuItemType, SubMenuItemType } from "./MenuItems";
import ExpandLessOutlinedIcon from "@mui/icons-material/ExpandLessOutlined";
import { IconButton } from "@mui/material";
import { Rotate90DegreesCcw, RotateLeft } from "@mui/icons-material";

interface Props {
  user: User;
}

interface State {
  open: boolean;
  menuItems: MenuItemType[];
  selectedMenuItem?: ReactNode;
}

const Menu = ({ user }: Props) => {
  const [state, setState] = useState<State>({
    open: true,
    menuItems: getMenuItems(user.userType),
  });
  const location = useLocation();
  console.log("pathname", location.pathname);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const setExpandMenuItem = (menuItemId: number, expand: boolean) => {
    let newMenuItems: MenuItemType[] = [];
    state.menuItems.forEach((menuItem: MenuItemType) => {
      let newMenuItem = menuItem;
      newMenuItem.expanded =
        menuItem.id === menuItemId
          ? expand
          : menuItem.expanded === undefined
          ? undefined
          : false;
      newMenuItems.push(newMenuItem);
    });
    setState((prevState) => ({
      ...prevState,
      menuItems: newMenuItems,
    }));
  };

  const handleClickIcon = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, open: !prevState.open }));
  };

  const getActiveMenuItemClassname = (path: string): string => {
    return path === location.pathname ? "active" : "";
  };

  return (
    <div className="authorized-home-content-box">
      <div className="authorized-home-menu">
        {state.open && (
          <h1 className="authorized-home-menu-headline">
            {t("menu.headline")}
          </h1>
        )}
        <ul>
          {state.menuItems.map((menuItem: MenuItemType, index: number) => (
            <React.Fragment key={`${menuItem.id}.${index}`}>
              <MenuItem
                open={state.open}
                className={getActiveMenuItemClassname(menuItem.link)}
                menuItem={menuItem}
                setExpandMenuItem={setExpandMenuItem}
              />
              {menuItem.expanded !== undefined &&
                menuItem.expanded === true &&
                state.open && (
                  <ul>
                    {menuItem.subMenu &&
                      menuItem.subMenu.map(
                        (subMenuItem: SubMenuItemType, subIndex: number) => (
                          <li
                            key={`${menuItem.id}.${index}.${subIndex}`}
                            className={getActiveMenuItemClassname(
                              `${menuItem.link}/${subMenuItem.title}`
                            )}
                          >
                            <a
                              href={`/${menuItem.title}/${subMenuItem.title}`}
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(
                                  `/${menuItem.title}/${subMenuItem.title}`
                                );
                              }}
                            >
                              {t(`menu.${menuItem.title}.${subMenuItem.title}`)}
                            </a>
                          </li>
                        )
                      )}
                  </ul>
                )}
            </React.Fragment>
          ))}
        </ul>
      </div>
      <div className="authorized-home-nav" onClick={handleClickIcon}>
        <ExpandLessOutlinedIcon
          className={`authorized-home-nav-icon  ${
            state.open ? "open" : "close"
          }`}
        />
      </div>
    </div>
  );
};

export default Menu;
