import { Container, Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import AdvantagesUser from "./components/User";
import AdvantagesOrganization from "./components/Organization";

interface AdvantagesProps {
  type: "user" | "organization";
}

const Advantages: React.FC<AdvantagesProps> = (props) => {
  const { type } = props;
  const { t } = useTranslation();

  return (
    <Container className="w-full bg-white p-5">
      {type === "user" ? <AdvantagesUser /> : <AdvantagesOrganization />}
    </Container>
  );
};

export default Advantages;
