import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LogoURL from "@images/logo192.png";
import { Text } from "@component-library/index";

interface HeaderHomeButtonProps {}

const HeaderHomeButton: React.FC<HeaderHomeButtonProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <a
      href="/"
      className="group flex flex-row items-center gap-3 p-2 duration-300 hover:cursor-pointer hover:text-türkis "
      onClick={(e) => {
        e.preventDefault();
        navigate("/");
      }}
      title="Startseite"
    >
      <img
        className="h-8 duration-300 group-hover:scale-110  md:h-10"
        data-testid="logo"
        src={LogoURL}
        alt="Kiss Logo"
      />
      <div className="  flex flex-col items-end justify-start text-inherit">
        <Text
          variant="custom"
          className="text-2xl font-bold text-[#263652] xs:text-3xl md:text-4xl"
        >
          {t("components.Header.button.home")}
        </Text>
      </div>
    </a>
  );
};

export default HeaderHomeButton;
