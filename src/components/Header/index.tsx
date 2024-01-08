import React, { ReactNode } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useTranslation } from "react-i18next";
import HeaderItem from "./components/Item";
import { Button } from "@component-library/Button";
import { UserType } from "@/hooks/useUser";
import HeaderHomeButton from "./components/HomeButton";
import useApp from "@/hooks/useApp";
import HeaderItems from "./components/Items";

export type HeaderItem = {
  title: string;
  link: string;
  icon: string | ReactNode;
  extern: boolean;
  preferred: NavigationItemPreferredType;
  userType: UserType[];
  loggedIn: boolean[];
};

export type HeaderItemLoggedInType = true | false | "both";
export type NavigationItemPreferredType = "header" | "menu" | "home";

interface Props {}

export const Header: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { setMenu } = useApp();

  const onClickButtonMenu = () => {
    setMenu(true);
  };

  return (
    <header
      data-testid="header"
      className="flex w-full flex-row items-center justify-between bg-white p-1 shadow-lg"
    >
      <nav>
        <HeaderHomeButton />
      </nav>
      <nav className="flex flex-row items-center justify-center gap-3">
        <HeaderItems />
        <Button
          className="mr-2"
          size="sm"
          variant="primary"
          title={t(`components.Header.Header.button.open`)}
          onClick={onClickButtonMenu}
          children={<MenuIcon />}
        />
      </nav>
    </header>
  );
};
