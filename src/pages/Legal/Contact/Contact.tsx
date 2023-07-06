import { Heading, Text } from "@component-library/Typography";
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
      <Heading variant="h1" className="w-full p-5 text-center">
        Kontakt
      </Heading>
      <Heading variant="h2">Semper-KI:</Heading>
      <Text variant="body">Telefon: +49 341 229037 24</Text>
      <Text variant="body">E-Mail: semper-ki@infai.org</Text>
      <Heading variant="h2">KISS Projekt:</Heading>
      <Text variant="body">Förderkennzeichen: 01MK22001A-K</Text>
      <Heading variant="h2">Infai:</Heading>
      <Text variant="body">
        Institut für Angewandte Informatik (InfAI) e.V. an der Universität
        Leipzig, InfAI Infinity GmbH Goerdelerring 9 04109 Leipzig Germany
      </Text>
      <Text variant="body">+49 341 229037 0</Text>
      <Text variant="body">+49 341 229037 99</Text>
      <Text variant="body">info@infai.org</Text>
      <Heading variant="h2">KMI:</Heading>
      <Text variant="body">
        Künstlich | Menschlich | Intelligent Kompetenzzentrum
      </Text>
      <Text variant="body">+49 341 9733430</Text>
      <Text variant="body">info@kmi-leipzig.de</Text>
    </article>
  );
};

export default Contact;
