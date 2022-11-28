import PersonIcon from "@mui/icons-material/Person";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import React, { ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { User } from "../../../interface/Interface";
import MenuItem from "./MenuItem";
import { getMenuItems, MenuItemType, SubMenuItemType } from "./MenuItems";

interface Props {
  user: User;
}

interface State {
  menuItems: MenuItemType[];
}

const Menu = ({ user }: Props) => {
  const [state, setState] = useState<State>({
    menuItems: getMenuItems(user.userType),
  });
  const navigate = useNavigate();
  const { t } = useTranslation();

  const setExpandMenuItem = (menuItemId: number, expand: boolean) => {
    let newMenuItem: MenuItemType | undefined = state.menuItems.find(
      (menuItem: MenuItemType) => menuItem.id === menuItemId
    );
    const oldIndex: number = state.menuItems.indexOf(
      newMenuItem !== undefined ? newMenuItem : state.menuItems[0]
    );
    if (newMenuItem !== undefined) newMenuItem.expanded = expand;
    console.log(state.menuItems, oldIndex);
    setState((prevState) => ({
      ...prevState,
      menuItems:
        newMenuItem !== undefined
          ? [
              ...prevState.menuItems.slice(0, oldIndex),
              newMenuItem,
              ...prevState.menuItems.slice(
                oldIndex + 1,
                prevState.menuItems.length
              ),
            ]
          : prevState.menuItems,
    }));
  };

  console.log(state.menuItems);

  return (
    <div className="authorized-home-menu">
      <h1 className="authorized-home-menu-headline">{t("menu.headline")}</h1>
      <ul>
        {state.menuItems.map((menuItem: MenuItemType, index: number) => (
          <React.Fragment key={`${menuItem.id}.${index}`}>
            <MenuItem
              menuItem={menuItem}
              setExpandMenuItem={setExpandMenuItem}
            />
            {menuItem.expanded !== undefined && menuItem.expanded === true && (
              <ul>
                {menuItem.subMenu &&
                  menuItem.subMenu.map(
                    (subMenuItem: SubMenuItemType, subIndex: number) => (
                      <li key={`${menuItem.id}.${index}.${subIndex}`}>
                        <a
                          href={`/${menuItem.title}/${subMenuItem.title}`}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/${menuItem.title}/${subMenuItem.title}`);
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
  );
};

export default Menu;
