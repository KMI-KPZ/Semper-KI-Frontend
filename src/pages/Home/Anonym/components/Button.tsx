import React from "react";
import { Container, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";

interface HomeButtonProps {
  text: string;
  icon: React.ReactNode;
  to?: string;
  onClick?: () => void;
}

const HomeButton: React.FC<HomeButtonProps> = (props) => {
  const { icon, text, onClick, to } = props;
  const navigate = useNavigate();

  const handleOnClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <a
      onClick={handleOnClick}
      className="group flex w-fit flex-row items-center justify-center overflow-clip whitespace-nowrap rounded-md border-2 border-ultramarinblau-dark  bg-ultramarinblau-dark   hover:cursor-pointer"
      tabIndex={0}
    >
      <Text className="px-5 py-2 text-white">{text}</Text>
      <Container className="group-hover:  h-full border-l-2  bg-white px-5 py-2 text-ultramarinblau-dark duration-300  group-hover:bg-ultramarinblau-dark">
        {icon}
      </Container>
    </a>
  );
};

export default HomeButton;
