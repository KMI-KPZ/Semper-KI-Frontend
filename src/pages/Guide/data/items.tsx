import { ReactNode } from "react";
import HardwareIcon from "@mui/icons-material/Hardware";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import HelpIcon from "@mui/icons-material/Help";
import { CardItemType } from "../../../components/CardView";
import { UserType } from "@/hooks/useUser";

export type TGuideItem = {
  userTypes: UserType[];
} & CardItemType;

export const GuideItems: TGuideItem[] = [
  {
    title: "GuideItems.use.produce",
    link: "/guide/use-produce",
    icon: <HardwareIcon />,
    userTypes: [UserType.anonym, UserType.client],
  },
  {
    title: "GuideItems.use.design",
    link: "/guide/use-design",
    icon: <ViewInArIcon />,
    userTypes: [UserType.anonym, UserType.client],
  },
  {
    title: "GuideItems.use.accompany",
    link: "/guide/use-accompany",
    icon: <HelpIcon />,
    userTypes: [UserType.anonym, UserType.client],
  },
  {
    title: "GuideItems.provide.produce",
    link: "/guide/provide-produce",
    icon: <HardwareIcon />,
    userTypes: [UserType.anonym, UserType.manufacturer],
  },
  {
    title: "GuideItems.provide.design",
    link: "/guide/provide-design",
    icon: <ViewInArIcon />,
    userTypes: [UserType.anonym, UserType.manufacturer],
  },
  {
    title: "GuideItems.provide.accompany",
    link: "/guide/provide-accompany",
    icon: <HelpIcon />,
    userTypes: [UserType.anonym, UserType.manufacturer],
  },
];
