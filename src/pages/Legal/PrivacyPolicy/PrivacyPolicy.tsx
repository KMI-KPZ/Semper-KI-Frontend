import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface PrivacyPolicyProps {}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <article
      data-testid="privacyPolicy"
      className="flex w-full flex-col items-start justify-center gap-5  p-5"
    >
      <Heading variant="h1" className="w-full bg-white p-5 text-center">
        {t("Legal.PrivacyPolicy.heading")}
      </Heading>
      <Heading variant="h2">{t("Legal.PrivacyPolicy.1.heading")}</Heading>
      <Text>{t("Legal.PrivacyPolicy.1.text")}</Text>
      <Heading variant="h2">{t("Legal.PrivacyPolicy.2.heading")}</Heading>
      <Text>{t("Legal.PrivacyPolicy.2.text1")}</Text>
      <Text>{t("Legal.PrivacyPolicy.2.text2")}</Text>
      <Text>{t("Legal.PrivacyPolicy.2.text3")}</Text>
      <Heading variant="h2">{t("Legal.PrivacyPolicy.3.heading")}</Heading>
      <Text>{t("Legal.PrivacyPolicy.3.text1")}</Text>
      <Text>{t("Legal.PrivacyPolicy.3.text2")}</Text>
      <Text>{t("Legal.PrivacyPolicy.3.text3")}</Text>
      <Heading variant="h2">{t("Legal.PrivacyPolicy.4.heading")}</Heading>
      <Text>{t("Legal.PrivacyPolicy.4.text")}</Text>
      <Heading variant="h2">{t("Legal.PrivacyPolicy.5.heading")}</Heading>
      <Text>{t("Legal.PrivacyPolicy.5.text")}</Text>
    </article>
  );
};

export default PrivacyPolicy;
