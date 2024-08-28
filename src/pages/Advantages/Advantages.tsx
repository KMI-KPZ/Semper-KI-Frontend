import { Container } from "@component-library/index";
import React from "react";
import AdvantagesUser from "./components/User";
import AdvantagesOrganization from "./components/Organization";

interface AdvantagesProps {
  type: "user" | "organization";
}

const Advantages: React.FC<AdvantagesProps> = (props) => {
  const { type } = props;

  return (
    <Container className="w-full bg-white p-5">
      {type === "user" ? <AdvantagesUser /> : <AdvantagesOrganization />}
    </Container>
  );
};

export default Advantages;
