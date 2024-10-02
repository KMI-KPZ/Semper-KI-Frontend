import React from "react";
import { Container, Text } from "@component-library/index";

interface HomeButtonProps {
  text: string;
  icon: React.ReactNode;
}

const HomeButton: React.FC<HomeButtonProps> = (props) => {
  const { icon, text } = props;

  return (
    <a
      className="group flex w-fit flex-row items-center justify-center whitespace-nowrap rounded-md border-2 border-white bg-ultramarinblau-dark text-white  hover:cursor-pointer"
      tabIndex={0}
    >
      <Text className="px-5 py-2">{text}</Text>
      <Container className="h-full bg-white px-5 py-2 text-ultramarinblau-dark duration-300 group-hover:text-türkis">
        {icon}
      </Container>
    </a>
  );
};

export default HomeButton;
