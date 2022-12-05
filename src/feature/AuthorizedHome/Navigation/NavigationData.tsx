import PersonIcon from "@mui/icons-material/Person";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { ReactNode } from "react";
import { UserType } from "../../../interface/types";

export interface NavigationItemType {
  id: number;
  userTypes: UserType[];
  title: string;
  link: string;
  icon: ReactNode;
  expanded?: boolean;
  subNavigation?: SubNavigationItemType[];
}

export interface SubNavigationItemType {
  title: string;
  selected: boolean;
}

const NavigationData: NavigationItemType[] = [
  {
    id: 1,
    userTypes: ["client", "contractor"],
    title: "dashboard",
    link: "/",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    userTypes: ["client"],
    title: "shoppingcart",
    link: "/shoppingcart",
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    id: 3,
    userTypes: ["client"],
    title: "orders",
    link: "/orders",
    icon: <DescriptionOutlinedIcon />,
    expanded: false,
    subNavigation: [
      { title: "overview", selected: false },
      { title: "in-progress", selected: false },
      { title: "finished", selected: false },
    ],
  },
  {
    id: 4,
    userTypes: ["contractor"],
    title: "proceedings",
    link: "/proceedings",
    icon: <FactoryOutlinedIcon />,
    expanded: false,
    subNavigation: [
      { title: "overview", selected: false },
      { title: "create", selected: false },
    ],
  },
  {
    id: 5,
    userTypes: ["contractor"],
    title: "assignments",
    link: "/assignments",
    icon: <DescriptionOutlinedIcon />,
    expanded: false,
    subNavigation: [
      { title: "overview", selected: false },
      { title: "new", selected: false },
      { title: "in-progress", selected: false },
      { title: "finished", selected: false },
      { title: "canceled", selected: false },
    ],
  },
  {
    id: 6,
    userTypes: ["client", "contractor"],
    title: "messages",
    link: "/messages",
    icon: <EmailOutlinedIcon />,
    expanded: false,
    subNavigation: [{ title: "new", selected: false }],
  },
  {
    id: 7,
    userTypes: ["client", "contractor"],
    title: "account",
    link: "/account",
    icon: <PersonIcon />,
    expanded: false,
    subNavigation: [
      { title: "overview", selected: false },
      { title: "edit", selected: false },
      { title: "logout", selected: false },
    ],
  },
];

export const getNavigationData = (userType: UserType): NavigationItemType[] => {
  return NavigationData.filter((navItem: NavigationItemType) =>
    navItem.userTypes.includes(userType)
  );
};
