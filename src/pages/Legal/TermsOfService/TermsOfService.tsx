import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface TermsOfServiceProps {}

const TermsOfService: React.FC<TermsOfServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <article
      data-testid="termsOfService"
      className="flex w-full flex-col items-start justify-center gap-5  p-5"
    >
      <Heading variant="h1">{t("Legal.TermsOfService.heading")}</Heading>
      <Heading variant="h2">{t("Legal.TermsOfService.1.heading")}</Heading>
      <Text>{t("Legal.TermsOfService.1.text")}</Text>
      <Heading variant="h2">{t("Legal.TermsOfService.2.heading")}</Heading>
      <Text>{t("Legal.TermsOfService.2.text")}</Text>
      <Heading variant="h2">{t("Legal.TermsOfService.3.heading")}</Heading>
      <Text>{t("Legal.TermsOfService.3.text")}</Text>
      <Heading variant="h2">{t("Legal.TermsOfService.4.heading")}</Heading>
      <Text>{t("Legal.TermsOfService.4.text")}</Text>
      <Heading variant="h2">{t("Legal.TermsOfService.5.heading")}</Heading>
      <Text>{t("Legal.TermsOfService.5.text")}</Text>
    </article>
  );
};

export default TermsOfService;
