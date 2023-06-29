import React from "react";
import { useTranslation } from "react-i18next";

interface MenuProps {}

const Menu: React.FC<MenuProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return <div className="">Menu</div>;
};

export default Menu;
