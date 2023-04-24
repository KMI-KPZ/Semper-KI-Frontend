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
import MapIcon from "@mui/icons-material/Map";
import HardwareIcon from "@mui/icons-material/Hardware";

export const HomeItemsData: IHomeItem[] = [
  {
    users: [0],
    title: "HomeData.continue",
    link: "/process",
    icon: <KeyboardDoubleArrowRightIcon fontSize="large" />,
  },
  {
    users: [0],
    title: "HomeData.new-contract",
    link: "/process/new",
    icon: <AddShoppingCartIcon fontSize="large" />,
  },
  {
    users: [3],
    title: "HomeData.explore",
    link: "/process/model",
    icon: <ExploreIcon fontSize="large" />,
  },
  {
    users: [0, 1, 3],
    title: "HomeData.guide",
    link: "/guide",
    icon: <MapIcon fontSize="large" />,
  },
  {
    users: [3],
    title: "HomeData.use-service",
    link: "/service/use",
    icon: <HardwareIcon fontSize="large" />,
  },
  {
    users: [3],
    title: "HomeData.provide-service",
    link: "/service/provide",
    icon: <PrecisionManufacturingIcon fontSize="large" />,
  },
  {
    users: [1],
    title: "HomeData.proceedings",
    link: "/proceedings",
    icon: <GavelIcon fontSize="large" />,
  },
  {
    users: [1],
    title: "HomeData.company",
    link: "/company",
    icon: <FactoryIcon fontSize="large" />,
  },

  {
    users: [0, 3],
    title: "HomeData.order",
    link: "/order",
    icon: <ShoppingCartIcon fontSize="large" />,
  },
  {
    users: [0],
    title: "HomeData.orders",
    link: "/orders",
    icon: <DescriptionIcon fontSize="large" />,
  },
  {
    users: [1],
    title: "HomeData.contracts",
    link: "/contracts",
    icon: <DescriptionIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "HomeData.user",
    link: "/user",
    icon: <PersonIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "HomeData.model",
    link: "/model",
    icon: <ViewInArIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "HomeData.material",
    link: "/material",
    icon: <HomeRepairServiceIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "HomeData.procedure",
    link: "/procedure",
    icon: <SyncAltIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "HomeData.printer",
    link: "/printer",
    icon: <PrintIcon fontSize="large" />,
  },
  {
    users: [0, 1, 2],
    title: "HomeData.account",
    link: "/account",
    icon: <PersonIcon fontSize="large" />,
  },
];
