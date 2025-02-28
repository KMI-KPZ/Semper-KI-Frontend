import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface NdaProps {}

const Nda: React.FC<NdaProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <article
      data-testid="nda"
      className="flex w-full flex-col items-start justify-center gap-5  p-5"
    >
      <Heading variant="h1">{t("Legal.Nda.heading")}</Heading>
      <Heading variant="h2">{t("Legal.Nda.1.heading")}</Heading>
      <Text>{t("Legal.Nda.1.text")}</Text>
      <Heading variant="h2">{t("Legal.Nda.2.heading")}</Heading>
      <Text>{t("Legal.Nda.2.text")}</Text>
      <Heading variant="h2">{t("Legal.Nda.3.heading")}</Heading>
      <Text>{t("Legal.Nda.3.text")}</Text>
      <Heading variant="h2">{t("Legal.Nda.4.heading")}</Heading>
      <Text>{t("Legal.Nda.4.text")}</Text>
      <Heading variant="h2">{t("Legal.Nda.5.heading")}</Heading>
      <Text>{t("Legal.Nda.5.text")}</Text>
    </article>
  );
};

export default Nda;
