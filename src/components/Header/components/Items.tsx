import React from "react";
import { useTranslation } from "react-i18next";
import { NavigationItemData } from "@/data/navigation";
import HeaderItem from "./Item";
import useUser from "@/hooks/useUser";
import useEvents from "@/hooks/useEvents/useEvents";
import { getProjectEventAmount } from "@/hooks/useEvents/hooks/useProjectEvent";
import useApp from "@/hooks/useApp";
import useBadge from "@/hooks/useBadge";

interface HeaderItemsProps {}

const HeaderItems: React.FC<HeaderItemsProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const { setMenu } = useApp();
  const { calcBadge } = useBadge();
  const closeMenus = () => {
    setMenu(false);
  };

  return (
    <>
      <ul className="hidden flex-row items-center justify-center  md:flex">
        {NavigationItemData.filter(
          (item) =>
            item.preferred.includes("header") &&
            item.userTypes.includes(user.usertype)
        ).map((item, index: number) => (
          <HeaderItem
            key={index}
            closeMenus={closeMenus}
            headeritem={item}
            badge={calcBadge(item.title)}
          />
        ))}
      </ul>
      <ul className=" hidden flex-row items-center justify-center xs:flex md:hidden">
        {NavigationItemData.filter(
          (item) =>
            item.preferred.includes("header") &&
            item.userTypes.includes(user.usertype)
        ).map((item, index: number) => (
          <HeaderItem
            key={index}
            onlyIcon
            closeMenus={closeMenus}
            headeritem={item}
            badge={calcBadge(item.title)}
          />
        ))}
      </ul>
    </>
  );
};

export default HeaderItems;
