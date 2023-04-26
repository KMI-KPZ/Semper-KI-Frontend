import { EHeaderItemPreferred, EUserType } from "../../interface/enums";
import { IHeaderItem } from "../../interface/Interface";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import BugReportIcon from "@mui/icons-material/BugReport";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import MapIcon from "@mui/icons-material/Map";

export const HeaderItemsData: IHeaderItem[] = [
  {
    title: "HeaderData.about-us",
    link: "https://semper-ki.org/",
    icon: "IconLogo",
    extern: true,
    preferred: EHeaderItemPreferred.header,
    userType: [
      EUserType.anonym,
      EUserType.client,
      EUserType.manufacturer,
      EUserType.admin,
    ],
    loggedIn: [false],
  },
  {
    title: "HeaderData.order",
    link: "/order",
    icon: <ShoppingCartIcon fontSize="large" />,
    extern: false,
    preferred: EHeaderItemPreferred.header,
    userType: [EUserType.anonym, EUserType.client],
    loggedIn: [true, false],
  },
  {
    title: "HeaderData.login",
    link: "/login",
    icon: <LoginIcon fontSize="large" />,
    extern: false,
    preferred: EHeaderItemPreferred.header,
    userType: [
      EUserType.anonym,
      EUserType.client,
      EUserType.manufacturer,
      EUserType.admin,
    ],
    loggedIn: [false],
  },
  {
    title: "HeaderData.logout",
    link: "/logout",
    icon: <LogoutIcon fontSize="large" />,
    extern: false,
    preferred: EHeaderItemPreferred.menu,
    userType: [
      EUserType.anonym,
      EUserType.client,
      EUserType.manufacturer,
      EUserType.admin,
    ],
    loggedIn: [true],
  },
  {
    title: "HeaderData.guide",
    link: "/guide",
    icon: <MapIcon fontSize="large" />,
    extern: false,
    preferred: EHeaderItemPreferred.menu,
    userType: [EUserType.anonym, EUserType.client, EUserType.manufacturer],
    loggedIn: [true, false],
  },
  {
    title: "HeaderData.orders",
    link: "/orders",
    icon: <DescriptionIcon fontSize="large" />,
    extern: false,
    preferred: EHeaderItemPreferred.header,
    userType: [EUserType.client],
    loggedIn: [true],
  },
  {
    title: "HeaderData.contracts",
    link: "/contracts",
    icon: <DescriptionIcon fontSize="large" />,
    extern: false,
    preferred: EHeaderItemPreferred.menu,
    userType: [EUserType.manufacturer],
    loggedIn: [true],
  },
  {
    title: "HeaderData.account",
    link: "/account",
    icon: <PersonIcon fontSize="large" />,
    extern: false,
    preferred: EHeaderItemPreferred.menu,
    userType: [EUserType.client, EUserType.manufacturer, EUserType.admin],
    loggedIn: [true],
  },
  {
    title: "HeaderData.test",
    link: "/test",
    icon: <BugReportIcon fontSize="large" />,
    extern: false,
    preferred: EHeaderItemPreferred.menu,
    userType: [
      EUserType.anonym,
      EUserType.client,
      EUserType.manufacturer,
      EUserType.admin,
    ],
    loggedIn: [true],
  },
];
