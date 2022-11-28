import PersonIcon from "@mui/icons-material/Person";
import FactoryOutlinedIcon from "@mui/icons-material/FactoryOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { ReactNode } from "react";
import { UserType } from "../../../interface/types";

export interface MenuItemType {
  id: number;
  userTypes: UserType[];
  title: string;
  icon: ReactNode;
  expanded?: boolean;
  subMenu?: SubMenuItemType[];
}

export interface SubMenuItemType {
  title: string;
  selected: boolean;
}

const MenuItems: MenuItemType[] = [
  {
    id: 1,
    userTypes: ["client", "contractor"],
    title: "dashboard",
    icon: <DashboardIcon />,
  },
  {
    id: 2,
    userTypes: ["client"],
    title: "shoppingcart",
    icon: <ShoppingCartOutlinedIcon />,
  },
  {
    id: 3,
    userTypes: ["client"],
    title: "orders",
    icon: <DescriptionOutlinedIcon />,
    expanded: false,
    subMenu: [
      { title: "overview", selected: false },
      { title: "in-progress", selected: false },
      { title: "finished", selected: false },
    ],
  },
  {
    id: 4,
    userTypes: ["contractor"],
    title: "proceedings",
    icon: <FactoryOutlinedIcon />,
    expanded: false,
    subMenu: [
      { title: "overview", selected: false },
      { title: "create", selected: false },
    ],
  },
  {
    id: 5,
    userTypes: ["contractor"],
    title: "assignments",
    icon: <DescriptionOutlinedIcon />,
    expanded: false,
    subMenu: [
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
    icon: <EmailOutlinedIcon />,
    expanded: false,
    subMenu: [{ title: "new", selected: false }],
  },
  {
    id: 7,
    userTypes: ["client", "contractor"],
    title: "account",
    icon: <PersonIcon />,
    expanded: false,
    subMenu: [
      { title: "overview", selected: false },
      { title: "edit", selected: false },
      { title: "logout", selected: false },
    ],
  },
];

export const getMenuItems = (userType: UserType): MenuItemType[] => {
  return MenuItems.filter((menuItem: MenuItemType) =>
    menuItem.userTypes.includes(userType)
  );
};
