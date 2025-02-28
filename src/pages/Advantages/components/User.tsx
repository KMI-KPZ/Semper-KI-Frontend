import { Button, Container, Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import LoginIcon from "@mui/icons-material/Login";
import useLogin from "@/api/Authentification/Querys/useLogin";

interface AdvantagesUserProps {}

const AdvantagesUser: React.FC<AdvantagesUserProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const login = useLogin();

  const handleOnClickButton = () => {
    login.mutate({ userType: "user", register: true });
  };

  return (
    <Container direction="col">
      <Heading variant="h1">{t("Advantages.components.User.heading")}</Heading>
      <Text className="md:max-w-md">
        {t("Advantages.components.User.text")}
      </Text>
      <Heading variant="h2">
        {t("Advantages.components.User.subHeading")}
      </Heading>
      <Container
        direction="col"
        gap={5}
        width="fit"
        justify="start"
        items="start"
      >
        <Text>{t("Advantages.components.User.fact1")}</Text>
        <Text>{t("Advantages.components.User.fact2")}</Text>
        <Text>{t("Advantages.components.User.fact3")}</Text>
        <Text>{t("Advantages.components.User.fact4")}</Text>
        <Text>{t("Advantages.components.User.fact5")}</Text>
        <Text>{t("Advantages.components.User.fact6")}</Text>
      </Container>
      <Button
        variant="primary"
        onClick={handleOnClickButton}
        startIcon={<LoginIcon fontSize="large" />}
        title={t("Advantages.components.User.button.register")}
        width="full"
      />
    </Container>
  );
};

export default AdvantagesUser;
