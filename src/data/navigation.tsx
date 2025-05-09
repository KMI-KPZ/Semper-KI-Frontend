import { ReactNode } from "react";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import PrintIcon from "@mui/icons-material/Print";
import CorporateFareIcon from "@mui/icons-material/CorporateFare";
import FactoryIcon from "@mui/icons-material/Factory";
import { UserType } from "@/hooks/useUser";
import { NavigationItemPreferredType } from "@/components/Header/Header";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { DataNaviagtionTranlationType } from "@/components";
import RocketLaunchIcon from "@mui/icons-material/RocketLaunch";
import DashboardIcon from "@mui/icons-material/Dashboard";

export type INavigationItem = {
  title: DataNaviagtionTranlationType;
  link: string;
  icon: ReactNode;
  extern: boolean;
  preferred: NavigationItemPreferredType[];
  userTypes: UserType[];
};

export const NavigationItemData: INavigationItem[] = [
  {
    userTypes: [UserType.ADMIN],
    title: "admin",
    link: "/admin",
    icon: <AdminPanelSettingsIcon fontSize="large" />,
    preferred: ["header", "menu"],
    extern: false,
  },
  {
    title: "demonstrator",
    link: "/demo",
    icon: <RocketLaunchIcon fontSize="large" />,
    extern: false,
    preferred: ["header", "home"],
    userTypes: [UserType.ANONYM],
  },
  {
    title: "dashboard",
    link: "/",
    icon: <DashboardIcon fontSize="large" />,
    extern: false,
    preferred: ["header", "home"],
    userTypes: [UserType.USER, UserType.ORGANIZATION, UserType.ADMIN],
  },
  {
    title: "projects",
    link: "/projects",
    icon: <DescriptionIcon fontSize="large" />,
    extern: false,
    preferred: ["header", "home"],
    userTypes: [UserType.ANONYM],
  },
  {
    title: "organization",
    link: "/organization",
    icon: <CorporateFareIcon fontSize="large" />,
    extern: false,
    preferred: ["header", "home"],
    userTypes: [UserType.ORGANIZATION],
  },
  {
    title: "resources",
    link: "/resources",
    icon: <FactoryIcon fontSize="large" />,
    extern: false,
    preferred: ["header", "home"],
    userTypes: [UserType.ORGANIZATION],
  },
  {
    title: "account",
    link: "/account",
    icon: <PersonIcon fontSize="large" />,
    extern: false,
    preferred: ["menu", "home"],
    userTypes: [UserType.USER, UserType.ORGANIZATION, UserType.ADMIN],
  },

  // {
  //   title: "test",
  //   link: "/test",
  //   icon: <BugReportIcon fontSize="large" />,
  //   extern: false,
  //   preferred: ["menu"],
  //   userTypes: [UserType.USER, UserType.ORGANIZATION, UserType.ADMIN],
  // },
  {
    userTypes: [UserType.ADMIN],
    title: "user",
    link: "/admin/user",
    icon: <PersonIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.ADMIN],
    title: "material",
    link: "/admin/resources/material",
    icon: <HomeRepairServiceIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    userTypes: [UserType.ADMIN],
    title: "printer",
    link: "/admin/resources/printer",
    icon: <PrintIcon fontSize="large" />,
    preferred: ["home"],
    extern: false,
  },
  {
    title: "logout",
    link: "/logout",
    icon: <LogoutIcon fontSize="large" />,
    extern: false,
    preferred: ["menu"],
    userTypes: [UserType.USER, UserType.ORGANIZATION, UserType.ADMIN],
  },
  {
    title: "login",
    link: "/login",
    icon: <LoginIcon fontSize="large" />,
    extern: false,
    preferred: ["header"],
    userTypes: [UserType.ANONYM],
  },
];
