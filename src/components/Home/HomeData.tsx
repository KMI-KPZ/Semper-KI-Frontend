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
import ScienceIcon from "@mui/icons-material/Science";

export const HomeItemsData: IHomeItem[] = [
  {
    users: [0],
    title: "Home.HomeData.continue",
    link: "/process",
    icon: <KeyboardDoubleArrowRightIcon fontSize="large" />,
  },
  {
    users: [0],
    title: "Home.HomeData.new-contract",
    link: "/process/new",
    icon: <AddShoppingCartIcon fontSize="large" />,
  },
  {
    users: [3],
    title: "Home.HomeData.explore",
    link: "/process/model",
    icon: <ScienceIcon fontSize="large" />,
  },
  {
    users: [0, 1, 3],
    title: "Home.HomeData.guide",
    link: "/guide",
    icon: <ExploreIcon fontSize="large" />,
  },
  {
    users: [3],
    title: "Home.HomeData.use-service",
    link: "/service/use",
    icon: <HardwareIcon fontSize="large" />,
  },
  {
    users: [3],
    title: "Home.HomeData.provide-service",
    link: "/service/provide",
    icon: <PrecisionManufacturingIcon fontSize="large" />,
  },
  {
    users: [1],
    title: "Home.HomeData.proceedings",
    link: "/proceedings",
    icon: <GavelIcon fontSize="large" />,
  },
  {
    users: [1],
    title: "Home.HomeData.company",
    link: "/company",
    icon: <FactoryIcon fontSize="large" />,
  },

  {
    users: [0, 3],
    title: "Home.HomeData.cart",
    link: "/cart",
    icon: <ShoppingCartIcon fontSize="large" />,
  },
  {
    users: [0],
    title: "Home.HomeData.orders",
    link: "/orders",
    icon: <DescriptionIcon fontSize="large" />,
  },
  {
    users: [1],
    title: "Home.HomeData.contracts",
    link: "/contracts",
    icon: <DescriptionIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "Home.HomeData.user",
    link: "/user",
    icon: <PersonIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "Home.HomeData.model",
    link: "/model",
    icon: <ViewInArIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "Home.HomeData.material",
    link: "/material",
    icon: <HomeRepairServiceIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "Home.HomeData.procedure",
    link: "/procedure",
    icon: <SyncAltIcon fontSize="large" />,
  },
  {
    users: [2],
    title: "Home.HomeData.printer",
    link: "/printer",
    icon: <PrintIcon fontSize="large" />,
  },
  {
    users: [0, 1, 2],
    title: "Home.HomeData.account",
    link: "/account",
    icon: <PersonIcon fontSize="large" />,
  },
];
