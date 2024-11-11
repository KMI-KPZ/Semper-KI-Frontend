import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ContactProps {}

const Contact: React.FC<ContactProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <article
      data-testid="contact"
      className="flex w-full flex-col items-center justify-center gap-5  bg-white  p-5"
    >
      <Heading variant="h2" className="w-full p-5 text-center">
        {t("Legal.Contact.heading.main")}
      </Heading>
      <Heading variant="h3">{t("Legal.Contact.heading.semper")}</Heading>
      <Text variant="body">{t("Legal.Contact.tel")}: +49 341 229037 24</Text>
      <Text variant="body">
        {t("Legal.Contact.email")}: semper-ki@infai.org
      </Text>
      <Heading variant="h3">{t("Legal.Contact.heading.kiss")}</Heading>
      <Text variant="body">
        {t("Legal.Contact.funding-label")}: 01MK22001A-K
      </Text>
      <Heading variant="h3">{t("Legal.Contact.heading.infai")}</Heading>
      <Text variant="body">{t("Legal.Contact.infai-describtion")}</Text>
      <Text variant="body">+49 341 229037 0</Text>
      <Text variant="body">+49 341 229037 99</Text>
      <Text variant="body">info@infai.org</Text>
      <Heading variant="h3">{t("Legal.Contact.heading.kmi")}</Heading>
      <Text variant="body">{t("Legal.Contact.kmi-describtion")}</Text>
      <Text variant="body">+49 341 9733430</Text>
      <Text variant="body">info@kmi-leipzig.de</Text>
    </article>
  );
};

export default Contact;
