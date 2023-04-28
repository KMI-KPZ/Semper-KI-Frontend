import { ReactNode } from "react";
import { ENavigationItemPreferred, EUserType } from "../interface/enums";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import BugReportIcon from "@mui/icons-material/BugReport";
import MapIcon from "@mui/icons-material/Map";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import FactoryIcon from "@mui/icons-material/Factory";
import GavelIcon from "@mui/icons-material/Gavel";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PrintIcon from "@mui/icons-material/Print";
import ExploreIcon from "@mui/icons-material/Explore";
import HardwareIcon from "@mui/icons-material/Hardware";
import ScienceIcon from "@mui/icons-material/Science";

export interface INavigationItem {
  title: string;
  link: string;
  icon: ReactNode;
  extern: boolean;
  preferred: ENavigationItemPreferred[];
  userTypes: EUserType[];
  loggedIn: boolean[];
}

export const NavigationItems: INavigationItem[] = [
  {
    title: "data.NavigationItem.about-us",
    link: "https://semper-ki.org/",
    icon: <InfoOutlinedIcon fontSize="large" />,
    extern: true,
    preferred: [ENavigationItemPreferred.header],
    userTypes: [
      EUserType.anonym,
      EUserType.client,
      EUserType.manufacturer,
      EUserType.admin,
    ],
    loggedIn: [false],
  },
  {
    title: "data.NavigationItem.cart",
    link: "/cart",
    icon: <ShoppingCartIcon fontSize="large" />,
    extern: false,
    preferred: [ENavigationItemPreferred.header, ENavigationItemPreferred.home],
    userTypes: [EUserType.anonym, EUserType.client],
    loggedIn: [true, false],
  },
  {
    title: "data.NavigationItem.login",
    link: "/login",
    icon: <LoginIcon fontSize="large" />,
    extern: false,
    preferred: [ENavigationItemPreferred.header],
    userTypes: [
      EUserType.anonym,
      EUserType.client,
      EUserType.manufacturer,
      EUserType.admin,
    ],
    loggedIn: [false],
  },
  {
    title: "data.NavigationItem.logout",
    link: "/logout",
    icon: <LogoutIcon fontSize="large" />,
    extern: false,
    preferred: [ENavigationItemPreferred.menu],
    userTypes: [
      EUserType.anonym,
      EUserType.client,
      EUserType.manufacturer,
      EUserType.admin,
    ],
    loggedIn: [true],
  },
  {
    title: "data.NavigationItem.guide",
    link: "/guide",
    icon: <MapIcon fontSize="large" />,
    extern: false,
    preferred: [ENavigationItemPreferred.menu, ENavigationItemPreferred.home],
    userTypes: [EUserType.anonym, EUserType.client, EUserType.manufacturer],
    loggedIn: [true, false],
  },
  {
    title: "data.NavigationItem.orders",
    link: "/orders",
    icon: <DescriptionIcon fontSize="large" />,
    extern: false,
    preferred: [ENavigationItemPreferred.header, ENavigationItemPreferred.home],
    userTypes: [EUserType.client],
    loggedIn: [true],
  },
  {
    title: "data.NavigationItem.contracts",
    link: "/contracts",
    icon: <DescriptionIcon fontSize="large" />,
    extern: false,
    preferred: [ENavigationItemPreferred.menu, ENavigationItemPreferred.home],
    userTypes: [EUserType.manufacturer],
    loggedIn: [true],
  },
  {
    title: "data.NavigationItem.account",
    link: "/account",
    icon: <PersonIcon fontSize="large" />,
    extern: false,
    preferred: [ENavigationItemPreferred.menu, ENavigationItemPreferred.home],
    userTypes: [EUserType.client, EUserType.manufacturer, EUserType.admin],
    loggedIn: [true],
  },
  {
    title: "data.NavigationItem.test",
    link: "/test",
    icon: <BugReportIcon fontSize="large" />,
    extern: false,
    preferred: [ENavigationItemPreferred.menu],
    userTypes: [
      EUserType.anonym,
      EUserType.client,
      EUserType.manufacturer,
      EUserType.admin,
    ],
    loggedIn: [true],
  },
  {
    userTypes: [EUserType.client],
    title: "data.NavigationItem.continue",
    link: "/process",
    icon: <KeyboardDoubleArrowRightIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [false, true],
  },
  {
    userTypes: [EUserType.client],
    title: "data.NavigationItem.new-contract",
    link: "/process/new",
    icon: <AddShoppingCartIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [false, true],
  },
  {
    userTypes: [EUserType.anonym],
    title: "data.NavigationItem.explore",
    link: "/process/model",
    icon: <ScienceIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [false],
  },
  {
    userTypes: [EUserType.anonym],
    title: "data.NavigationItem.use-service",
    link: "/service/use",
    icon: <HardwareIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [false, true],
  },
  {
    userTypes: [EUserType.anonym],
    title: "data.NavigationItem.provide-service",
    link: "/service/provide",
    icon: <PrecisionManufacturingIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [false, true],
  },
  {
    userTypes: [EUserType.manufacturer],
    title: "data.NavigationItem.proceedings",
    link: "/proceedings",
    icon: <GavelIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [true],
  },
  {
    userTypes: [EUserType.manufacturer],
    title: "data.NavigationItem.company",
    link: "/company",
    icon: <FactoryIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [false],
  },
  {
    userTypes: [EUserType.admin],
    title: "data.NavigationItem.user",
    link: "/user",
    icon: <PersonIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [true],
  },
  {
    userTypes: [EUserType.admin],
    title: "data.NavigationItem.model",
    link: "/model",
    icon: <ViewInArIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [true],
  },
  {
    userTypes: [EUserType.admin],
    title: "data.NavigationItem.material",
    link: "/material",
    icon: <HomeRepairServiceIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [true],
  },
  {
    userTypes: [EUserType.admin],
    title: "data.NavigationItem.procedure",
    link: "/procedure",
    icon: <SyncAltIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [true],
  },
  {
    userTypes: [EUserType.admin],
    title: "data.NavigationItem.printer",
    link: "/printer",
    icon: <PrintIcon fontSize="large" />,
    preferred: [ENavigationItemPreferred.home],
    extern: false,
    loggedIn: [true],
  },
];
