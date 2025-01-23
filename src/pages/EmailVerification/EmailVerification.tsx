import { Container } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface EmailVerificationProps {}

const EmailVerification: React.FC<EmailVerificationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <Container className="bg-white p-5" width="full" direction="col">
      <Heading variant="h1">{t("EmailVerification.heading")}</Heading>
      <Text variant="body">{t("EmailVerification.text")}</Text>
      <Text variant="body">{t("EmailVerification.text2")}</Text>
      <Text variant="body">{t("EmailVerification.text3")}</Text>
    </Container>
  );
};

export default EmailVerification;
