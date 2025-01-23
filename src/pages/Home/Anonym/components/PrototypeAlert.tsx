import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";

interface HomePrototypeAlertProps {}

const HomePrototypeAlert: React.FC<HomePrototypeAlertProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return process.env.NODE_ENV === "production" ? (
    <Container width="full" className="z-20 bg-white p-5">
      <Text variant="body" className="text-5xl font-bold text-red-500">
        {t("Home.Anonym.PrototypeAlert")}
      </Text>
    </Container>
  ) : null;
};

export default HomePrototypeAlert;
