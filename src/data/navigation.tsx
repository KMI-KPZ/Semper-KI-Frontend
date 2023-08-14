import { ReactNode } from "react";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import BugReportIcon from "@mui/icons-material/BugReport";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import SyncAltIcon from "@mui/icons-material/SyncAlt";
import PrintIcon from "@mui/icons-material/Print";
import ScienceIcon from "@mui/icons-material/Science";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import { UserType } from "@/hooks/useUser/types";
import { NavigationItemPreferredType } from "@/components/Header";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export type INavigationItem = {
  title: string;
  link: string;
  icon: ReactNode;
  extern: boolean;
  preferred: NavigationItemPreferredType[];
  userTypes: UserType[];
};

export const NavigationItemData: INavigationItem[] = [
  {
    userTypes: [UserType.ADMIN],
    title: "data.NavigationItem.admin",
    link: "/admin",
    icon: <AdminPanelSettingsIcon fontSize="large" />,
    preferred: ["header", "menu"],
    extern: false,
  },
  {
    userTypes: [UserType.ANONYM],
    title: "data.NavigationItem.demo",
    link: "/process/model",
    icon: <ScienceIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    title: "data.NavigationItem.logout",
    link: "/logout",
    icon: <LogoutIcon fontSize="large" />,
    extern: false,
    preferred: ["menu"],
    userTypes: [UserType.USER, UserType.ORGANIZATION, UserType.ADMIN],
  },
  {
    title: "data.NavigationItem.login",
    link: "/login",
    icon: <LoginIcon fontSize="large" />,
    extern: false,
    preferred: ["header"],
    userTypes: [UserType.ANONYM],
  },
  {
    title: "data.NavigationItem.orders",
    link: "/order",
    icon: <DescriptionIcon fontSize="large" />,
    extern: false,
    preferred: ["header", "home"],
    userTypes: [UserType.USER, UserType.ORGANIZATION],
  },
  {
    title: "data.NavigationItem.organization",
    link: "/organization",
    icon: <CorporateFareIcon fontSize="large" />,
    extern: false,
    preferred: ["header", "home"],
    userTypes: [UserType.ORGANIZATION],
  },
  {
    title: "data.NavigationItem.account",
    link: "/account",
    icon: <PersonIcon fontSize="large" />,
    extern: false,
    preferred: ["menu", "home"],
    userTypes: [UserType.USER, UserType.ORGANIZATION, UserType.ADMIN],
  },

  {
    title: "data.NavigationItem.test",
    link: "/test",
    icon: <BugReportIcon fontSize="large" />,
    extern: false,
    preferred: ["menu"],
    userTypes: [UserType.USER, UserType.ORGANIZATION, UserType.ADMIN],
  },
  {
    userTypes: [UserType.ADMIN],
    title: "data.NavigationItem.user",
    link: "/user",
    icon: <PersonIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.ADMIN],
    title: "data.NavigationItem.model",
    link: "/model",
    icon: <ViewInArIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.ADMIN],
    title: "data.NavigationItem.material",
    link: "/material",
    icon: <HomeRepairServiceIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.ADMIN],
    title: "data.NavigationItem.procedure",
    link: "/procedure",
    icon: <SyncAltIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.ADMIN],
    title: "data.NavigationItem.printer",
    link: "/printer",
    icon: <PrintIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
];
