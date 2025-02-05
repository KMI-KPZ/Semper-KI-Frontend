import React from "react";
import { Container, Text } from "@component-library/index";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

interface HomeProgressItemProps {
  item: HomeProgressItemData;
  index: number;
}

export interface HomeProgressItemData {
  title: string;
  finished: boolean;
  link: string;
}

const HomeProgressItem: React.FC<HomeProgressItemProps> = (props) => {
  const { item, index } = props;
  const navigate = useNavigate();

  return (
    <Container
      width="full"
      direction="row"
      onClick={() => navigate(item.link)}
      className={`flex justify-start rounded-md border-2 p-3 text-black duration-300 hover:scale-105  hover:cursor-pointer  md:w-[calc(50%-10px)] ${
        item.finished ? "border-green-500" : "border-orange-500"
      }`}
    >
      {item.finished ? (
        <CheckCircleOutlineIcon className="text-green-500" />
      ) : (
        <HelpOutlineIcon className="text-orange-500" />
      )}
      <Text>{index + ".  " + item.title}</Text>
    </Container>
  );
};

export default HomeProgressItem;
