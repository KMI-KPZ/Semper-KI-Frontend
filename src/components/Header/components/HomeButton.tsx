import React from "react";
import { useNavigate } from "react-router-dom";
import { Text } from "@component-library/index";
import NRULOGO from "@images/nru/NRU-logo.svg";

interface HeaderHomeButtonProps {}

const HeaderHomeButton: React.FC<HeaderHomeButtonProps> = (props) => {
  const {} = props;
  const navigate = useNavigate();

  return (
    <a
      href="/"
      className="flex w-fit flex-row items-center gap-3 p-2 px-5 duration-300 hover:scale-95 hover:cursor-pointer hover:text-nru "
      onClick={(e) => {
        e.preventDefault();
        navigate("/");
      }}
      title="Startseite"
    >
      <img
        className="h-10  md:h-12"
        data-testid="logo"
        src={NRULOGO}
        alt="Home Button"
      />
      <Text className="hidden text-2xl md:flex ">Projektverwaltung</Text>
    </a>
  );
};

export default HeaderHomeButton;
