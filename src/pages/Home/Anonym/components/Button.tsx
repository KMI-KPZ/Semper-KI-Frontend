import React from "react";
import { Container, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";

interface HomeButtonProps {
  text: string;
  icon: React.ReactNode;
  to?: string;
  onClick?: () => void;
  extern?: boolean;
}

const HomeButton: React.FC<HomeButtonProps> = (props) => {
  const { icon, text, onClick, to, extern = false } = props;
  const navigate = useNavigate();

  const handleOnClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!extern) {
      e.preventDefault();
      if (to) {
        navigate(to);
      } else if (onClick) {
        onClick();
      }
    }
  };

  return (
    <a
      onClick={handleOnClick}
      className="group flex w-fit flex-row items-center justify-center overflow-clip whitespace-nowrap rounded-md border-2 border-white bg-ultramarinblau-dark text-white  hover:cursor-pointer"
      href={to}
      target={extern ? "_blank" : ""}
      tabIndex={0}
    >
      <Text className="px-5 py-2">{text}</Text>
      <Container className="h-full  border-l-2 border-white bg-white px-5 py-2 text-ultramarinblau-dark duration-300 group-hover:bg-ultramarinblau-dark  group-hover:text-white">
        {icon}
      </Container>
    </a>
  );
};

export default HomeButton;
