import { ReactNode } from "react";
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
import HardwareIcon from "@mui/icons-material/Hardware";
import ScienceIcon from "@mui/icons-material/Science";
import { UserType } from "@/hooks/useUser";
import { NavigationItemPreferredType } from "@/components/Header";

interface INavigationItem {
  title: string;
  link: string;
  icon: ReactNode;
  extern: boolean;
  preferred: NavigationItemPreferredType[];
  userTypes: UserType[];
}

export const NavigationItemData: INavigationItem[] = [
  {
    title: "data.NavigationItem.about-us",
    link: "https://semper-ki.org/",
    icon: <InfoOutlinedIcon fontSize="large" />,
    extern: true,
    preferred: [],
    userTypes: [
      UserType.anonym,
      UserType.client,
      UserType.manufacturer,
      UserType.admin,
    ],
  },
  {
    userTypes: [UserType.anonym],
    title: "data.NavigationItem.explore",
    link: "/process/model",
    icon: <ScienceIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.client],
    title: "data.NavigationItem.continue",
    link: "/process",
    icon: <KeyboardDoubleArrowRightIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.client],
    title: "data.NavigationItem.new-contract",
    link: "/process/new",
    icon: <AddShoppingCartIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    title: "data.NavigationItem.logout",
    link: "/logout",
    icon: <LogoutIcon fontSize="large" />,
    extern: false,
    preferred: ["menu"],
    userTypes: [UserType.client, UserType.manufacturer, UserType.admin],
  },
  {
    title: "data.NavigationItem.guide",
    link: "/guide",
    icon: <MapIcon fontSize="large" />,
    extern: false,
    preferred: ["menu", "home"],
    userTypes: [UserType.anonym, UserType.client, UserType.manufacturer],
  },
  {
    title: "data.NavigationItem.cart",
    link: "/cart",
    icon: <ShoppingCartIcon fontSize="large" />,
    extern: false,
    preferred: ["header"],
    userTypes: [UserType.anonym, UserType.client],
  },
  {
    title: "data.NavigationItem.login",
    link: "/login",
    icon: <LoginIcon fontSize="large" />,
    extern: false,
    preferred: ["header"],
    userTypes: [UserType.anonym],
  },

  {
    title: "data.NavigationItem.orders",
    link: "/orders",
    icon: <DescriptionIcon fontSize="large" />,
    extern: false,
    preferred: ["header", "home"],
    userTypes: [UserType.client],
  },
  {
    title: "data.NavigationItem.contracts",
    link: "/contracts",
    icon: <DescriptionIcon fontSize="large" />,
    extern: false,
    preferred: ["header", "home"],
    userTypes: [UserType.manufacturer],
  },
  {
    title: "data.NavigationItem.account",
    link: "/account",
    icon: <PersonIcon fontSize="large" />,
    extern: false,
    preferred: ["menu", "home"],
    userTypes: [UserType.client, UserType.manufacturer, UserType.admin],
  },

  {
    title: "data.NavigationItem.test",
    link: "/test",
    icon: <BugReportIcon fontSize="large" />,
    extern: false,
    preferred: ["menu"],
    userTypes: [
      UserType.anonym,
      UserType.client,
      UserType.manufacturer,
      UserType.admin,
    ],
  },
  {
    userTypes: [UserType.anonym],
    title: "data.NavigationItem.use-service",
    link: "/service/use",
    icon: <HardwareIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.anonym],
    title: "data.NavigationItem.provide-service",
    link: "/service/provide",
    icon: <PrecisionManufacturingIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.manufacturer],
    title: "data.NavigationItem.proceedings",
    link: "/proceedings",
    icon: <GavelIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.manufacturer],
    title: "data.NavigationItem.company",
    link: "/company",
    icon: <FactoryIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.admin],
    title: "data.NavigationItem.user",
    link: "/user",
    icon: <PersonIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.admin],
    title: "data.NavigationItem.model",
    link: "/model",
    icon: <ViewInArIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.admin],
    title: "data.NavigationItem.material",
    link: "/material",
    icon: <HomeRepairServiceIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.admin],
    title: "data.NavigationItem.procedure",
    link: "/procedure",
    icon: <SyncAltIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.admin],
    title: "data.NavigationItem.printer",
    link: "/printer",
    icon: <PrintIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
];
