import { ReactNode } from "react";
import { EUserType } from "../interface/enums";
import HardwareIcon from "@mui/icons-material/Hardware";
import ViewInArIcon from "@mui/icons-material/ViewInAr";
import HelpIcon from "@mui/icons-material/Help";
import { CardItemData } from "../components/CardView/CardView";

export type TGuideItem = {
  userTypes: EUserType[];
} & CardItemData;

export const GuideItems: TGuideItem[] = [
  {
    title: "GuideItems.use.produce",
    link: "/guide/use-produce",
    icon: <HardwareIcon />,
    userTypes: [EUserType.anonym, EUserType.client],
  },
  {
    title: "GuideItems.use.design",
    link: "/guide/use-design",
    icon: <ViewInArIcon />,
    userTypes: [EUserType.anonym, EUserType.client],
  },
  {
    title: "GuideItems.use.accompany",
    link: "/guide/use-accompany",
    icon: <HelpIcon />,
    userTypes: [EUserType.anonym, EUserType.client],
  },
  {
    title: "GuideItems.provide.produce",
    link: "/guide/provide-produce",
    icon: <HardwareIcon />,
    userTypes: [EUserType.anonym, EUserType.manufacturer],
  },
  {
    title: "GuideItems.provide.design",
    link: "/guide/provide-design",
    icon: <ViewInArIcon />,
    userTypes: [EUserType.anonym, EUserType.manufacturer],
  },
  {
    title: "GuideItems.provide.accompany",
    link: "/guide/provide-accompany",
    icon: <HelpIcon />,
    userTypes: [EUserType.anonym, EUserType.manufacturer],
  },
];
