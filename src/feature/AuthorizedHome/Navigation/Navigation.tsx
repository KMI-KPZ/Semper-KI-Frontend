import React, { ReactNode, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { User } from "../../../interface/Interface";
import NavigationItem from "./NavigationItem";
import {
  getNavigationItems,
  NavigationItemType,
  SubNavigationItemType,
} from "./NavigationItems";

interface Props {
  user: User;
}

interface State {
  open: boolean;
  navItems: NavigationItemType[];
  activeNavItem?: string;
}

const Navigation = ({ user }: Props) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [state, setState] = useState<State>({
    open: true,
    navItems: getNavigationItems(user.userType),
    activeNavItem: pathname,
  });

  useEffect(() => {
    setState((preyState) => ({
      ...preyState,
      activeNavItem: pathname,
      open: preyState.activeNavItem !== pathname ? false : true,
    }));
  }, [pathname]);

  const setExpandNavigationItem = (navItemId: number, expand: boolean) => {
    let newNavigationItems: NavigationItemType[] = [];
    state.navItems.forEach((navItem: NavigationItemType) => {
      let newNavigationItem = navItem;
      newNavigationItem.expanded =
        navItem.id === navItemId
          ? expand
          : navItem.expanded === undefined
          ? undefined
          : false;
      newNavigationItems.push(newNavigationItem);
    });
    setState((prevState) => ({
      ...prevState,
      navItems: newNavigationItems,
    }));
  };

  const handleClickNavBox = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    open: boolean
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setState((prevState) => ({ ...prevState, open: open }));
  };

  return (
    <div
      className={`authorized-nav-box-outside ${state.open ? "open" : "closed"}`}
      onClick={(e) => handleClickNavBox(e, false)}
    >
      <div
        className="authorized-nav-box"
        onClick={(e) => handleClickNavBox(e, true)}
      >
        <div className="authorized-nav">
          {state.open && (
            <h1 className="authorized-nav-headline">{t("nav.headline")}</h1>
          )}
          <ul>
            {state.navItems.map(
              (navItem: NavigationItemType, index: number) => (
                <React.Fragment key={`${navItem.id}.${index}`}>
                  <NavigationItem
                    open={state.open}
                    className={
                      navItem.link === state.activeNavItem ? "active" : ""
                    }
                    navItem={navItem}
                    setExpandNavigationItem={setExpandNavigationItem}
                  />
                  {navItem.expanded !== undefined &&
                    navItem.expanded === true &&
                    state.open && (
                      <ul>
                        {navItem.subNavigation &&
                          navItem.subNavigation.map(
                            (
                              subNavigationItem: SubNavigationItemType,
                              subIndex: number
                            ) => (
                              <li
                                key={`${navItem.id}.${index}.${subIndex}`}
                                className={
                                  `${navItem.link}/${subNavigationItem.title}` ===
                                  state.activeNavItem
                                    ? "active"
                                    : ""
                                }
                              >
                                <a
                                  href={`/${navItem.title}/${subNavigationItem.title}`}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    navigate(
                                      `/${navItem.title}/${subNavigationItem.title}`
                                    );
                                  }}
                                >
                                  {t(
                                    `nav.${navItem.title}.${subNavigationItem.title}`
                                  )}
                                </a>
                              </li>
                            )
                          )}
                      </ul>
                    )}
                </React.Fragment>
              )
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
