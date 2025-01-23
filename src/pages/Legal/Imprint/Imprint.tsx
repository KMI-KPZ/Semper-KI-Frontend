import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ImprintProps {}

const Imprint: React.FC<ImprintProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <article
      data-testid="imprint"
      className="flex w-full flex-col items-center justify-center gap-5 p-5"
    >
      <Heading variant="h2" className="w-full bg-white p-5 text-center">
        {t("Legal.Imprint.heading.main")}
      </Heading>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Text variant="body" className="pl-5">
          Institut für Angewandte Informatik (InfAI) e. V.
          <br />
          Goerdelerring 9
          <br />
          04109
          <br />
          Leipzig Germany
          <br />
        </Text>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.telefon")}: +49 341 229037 0
          <br />
          {t("Legal.Imprint.telefax")}: +49 341 229037 99
          <br />
          {t("Legal.Imprint.email")}: info@infai.org
        </Text>
        <Heading variant="h3">{t("Legal.Imprint.heading.board")}</Heading>
        <Text variant="body" className="pl-5">
          Prof. Dr. Bogdan Franczyk (1. {t("Legal.Imprint.telefon")})
          <br />
          Prof. Dr. Erhard Rahm (2. {t("Legal.Imprint.telefon")})
          <br />
          Prof. Dr. André Ludwig
          <br />
          Prof. Dr. Roland Fassauer
        </Text>
        <Heading variant="h3">
          {t("Legal.Imprint.heading.board-members")}
        </Heading>
        <Text variant="body" className="pl-5">
          Prof. Dr. Sören Auer Prof. Dr. Gerhard Heyer Prof. Dr. Gerik
        </Text>
        <Heading variant="h3">{t("Legal.Imprint.heading.management")}</Heading>
        <Text variant="body" className="pl-5">
          Andreas Heinecke, Prof. Dr. Roland Fassauer
        </Text>
        <Heading variant="h3">
          {t("Legal.Imprint.heading.registry-entry")}
        </Heading>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.registry-court")}: Amtsgericht Leipzig
          <br />
          {t("Legal.Imprint.registry-number")}: VR 4342
        </Text>
        <Heading variant="h3">{t("Legal.Imprint.heading.vat-id")}</Heading>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.vat")}:
          <br />
          DE274344504
        </Text>
        <Heading variant="h3">
          {t("Legal.Imprint.heading.online-regulations")}
        </Heading>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.online-regulations")}
        </Text>
        <Heading variant="h3">{t("Legal.Imprint.heading.vsbg")}</Heading>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.vsbg")}
        </Text>
        <Heading variant="h3">
          {t("Legal.Imprint.heading.responsibility")}
        </Heading>
        <Text variant="body" className="pl-5">
          Dr. Hagen Jung
          <br />
          Institut für Angewandte Informatik (InfAI) e.V. an der Universität
          Leipzig
          <br />
          Goerdelerring 9
          <br />
          04109 Leipzig
          <br />
          Germany
          <br />
          Telefon.: +49 341 229 037 47
          <br />
          {t("Legal.Imprint.email")}: jung@infai.org
        </Text>
        <Heading variant="h3">
          {t("Legal.Imprint.heading.gender-sensitive")}
        </Heading>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.gender-sensitive")}
        </Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h3">{t("Legal.Imprint.heading.disclaimer")}</Heading>
        <Heading variant="h4">
          {t("Legal.Imprint.heading.content-warning")}
        </Heading>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.content-warning")}
        </Text>
        <Heading variant="h4">
          {t("Legal.Imprint.heading.external-links")}
        </Heading>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.external-links")}
        </Text>
        <Heading variant="h4">{t("Legal.Imprint.heading.copyright")}</Heading>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.copyright")}
        </Text>
        <Heading variant="h4">
          {t("Legal.Imprint.heading.special-terms")}
        </Heading>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.special-terms")}
        </Text>
        <Text variant="body" className="pl-5">
          {t("Legal.Imprint.src")}: www.impressum-recht.de{" "}
          {t("Legal.Imprint.gender-fit")}
        </Text>
      </section>
    </article>
  );
};

export default Imprint;
