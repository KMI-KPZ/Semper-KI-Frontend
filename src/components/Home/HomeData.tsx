import { IHomeItem } from "./Home";

import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
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
import { EUserType } from "../../interface/enums";

export const HomeItemsData: IHomeItem[] = [
  {
    userTypes: [EUserType.client],
    title: "Home.HomeData.continue",
    link: "/process",
    icon: <KeyboardDoubleArrowRightIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.client],
    title: "Home.HomeData.new-contract",
    link: "/process/new",
    icon: <AddShoppingCartIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.anonym],
    title: "Home.HomeData.explore",
    link: "/process/model",
    icon: <ScienceIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.client, EUserType.manufacturer, EUserType.anonym],
    title: "Home.HomeData.guide",
    link: "/guide",
    icon: <ExploreIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.anonym],
    title: "Home.HomeData.use-service",
    link: "/service/use",
    icon: <HardwareIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.anonym],
    title: "Home.HomeData.provide-service",
    link: "/service/provide",
    icon: <PrecisionManufacturingIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.manufacturer],
    title: "Home.HomeData.proceedings",
    link: "/proceedings",
    icon: <GavelIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.manufacturer],
    title: "Home.HomeData.company",
    link: "/company",
    icon: <FactoryIcon fontSize="large" />,
  },

  {
    userTypes: [EUserType.client, EUserType.anonym],
    title: "Home.HomeData.cart",
    link: "/cart",
    icon: <ShoppingCartIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.client],
    title: "Home.HomeData.orders",
    link: "/orders",
    icon: <DescriptionIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.manufacturer],
    title: "Home.HomeData.contracts",
    link: "/contracts",
    icon: <DescriptionIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.admin],
    title: "Home.HomeData.user",
    link: "/user",
    icon: <PersonIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.admin],
    title: "Home.HomeData.model",
    link: "/model",
    icon: <ViewInArIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.admin],
    title: "Home.HomeData.material",
    link: "/material",
    icon: <HomeRepairServiceIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.admin],
    title: "Home.HomeData.procedure",
    link: "/procedure",
    icon: <SyncAltIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.admin],
    title: "Home.HomeData.printer",
    link: "/printer",
    icon: <PrintIcon fontSize="large" />,
  },
  {
    userTypes: [EUserType.client, EUserType.manufacturer, EUserType.admin],
    title: "Home.HomeData.account",
    link: "/account",
    icon: <PersonIcon fontSize="large" />,
  },
];
