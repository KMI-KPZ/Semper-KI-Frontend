import useLogin from "@/hooks/useLogin";
import Container from "@component-library/Container";
import { LoadingAnimation } from "@component-library/Loading";
import { Heading } from "@component-library/Typography";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const Logout = () => {
  const { t } = useTranslation();
  const { logout } = useLogin();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Container>
      <LoadingAnimation />
      <Heading variant="h1">{t("Logout.redirect")}</Heading>
    </Container>
  );
};

export default Logout;
