import useLogout from "@/api/Authentification/Querys/useLogout";
import { Container } from "@component-library/index";
import { LoadingAnimation } from "@component-library/index";
import { Heading } from "@component-library/index";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Logout = () => {
  const { t } = useTranslation();
  const logout = useLogout();

  useEffect(() => {
    logout.mutate();
  }, []);

  return (
    <Container direction="col" width="full" align="center" justify="center">
      <LoadingAnimation />
      <Heading variant="h1">{t("Logout.redirect")}</Heading>
    </Container>
  );
};

export default Logout;
