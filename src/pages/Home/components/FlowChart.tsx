import React, { Fragment } from "react";
import { Container } from "@component-library/index";
import HomeProgressItem from "./ProgressItem";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

interface HomeProgressItemData {
  title: string;
  finished: boolean;
  link: string;
}

interface FlowchartProps {
  items: HomeProgressItemData[];
}

const Flowchart: React.FC<FlowchartProps> = ({ items }) => {
  return (
    <Container
      width="full"
      direction="col"
      justify="center"
      align="center"
      className="gap-0"
    >
      {items.map((item, index, all) => (
        <Fragment key={index}>
          <HomeProgressItem index={index + 1} item={item} />
          {index !== all.length - 1 ? <ArrowDownwardIcon /> : null}
        </Fragment>
      ))}
    </Container>
  );
};

export default Flowchart;
