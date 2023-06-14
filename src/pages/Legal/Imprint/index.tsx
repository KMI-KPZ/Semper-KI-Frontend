import { Heading, Text } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface ImprintProps {}

const Imprint: React.FC<ImprintProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <article className="flex w-full flex-col items-center justify-center gap-5 p-5">
      <Heading variant="h1" className="w-full bg-white p-5 text-center">
        {t("Imprint.header")}
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
          Telefon: +49 341 229037 0
          <br />
          Telefax: +49 341 229037 99
          <br />
          E-Mail: info@infai.org
        </Text>
        <Heading variant="h2">Vertretungsberechtigter Vorstand:</Heading>
        <Text variant="body" className="pl-5">
          Prof. Dr. Bogdan Franczyk (1. Vorsitzender)
          <br />
          Prof. Dr. Erhard Rahm (2. Vorsitzender)
          <br />
          Prof. Dr. André Ludwig
          <br />
          Prof. Dr. Roland Fassauer
        </Text>
        <Heading variant="h2">Vorstandsbeisitzer:</Heading>
        <Text variant="body" className="pl-5">
          Prof. Dr. Sören Auer Prof. Dr. Gerhard Heyer Prof. Dr. Gerik
        </Text>
        <Heading variant="h2">Scheuermann Geschäftsführung:</Heading>
        <Text variant="body" className="pl-5">
          Andreas Heinecke, Prof. Dr. Roland Fassauer
        </Text>
        <Heading variant="h2">Registereintrag:</Heading>
        <Text variant="body" className="pl-5">
          Registergericht: Amtsgericht Leipzig
          <br />
          Registernummer: VR 4342
        </Text>
        <Heading variant="h2">Umsatzsteuer-ID:</Heading>
        <Text variant="body" className="pl-5">
          Umsatzsteuer-Identifikationsnummer nach §27a Umsatzsteuergesetz:
          <br />
          DE274344504
        </Text>
        <Heading variant="h2">
          Hinweis gemäß Online-Streitbeilegungs-Verordnung
        </Heading>
        <Text variant="body" className="pl-5">
          Nach geltendem Recht sind wir verpflichtet, Verbraucher auf die
          Existenz der Europäischen Online-Streitbeilegungs-Plattform
          hinzuweisen, die für die Beilegung von Streitigkeiten genutzt werden
          kann, ohne dass ein Gericht eingeschaltet werden muss. Für die
          Einrichtung der Plattform ist die Europäische Kommission zuständig.
          Die Europäische Online-Streitbeilegungs-Plattform ist hier zu finden:
          http://ec.europa.eu/odr. Unsere E-Mail lautet: info@infai.org
        </Text>
        <Heading variant="h2">
          Hinweis gemäß Verbraucherstreitbeilegungsgesetz (VSBG)
        </Heading>
        <Text variant="body" className="pl-5">
          Wir sind nicht bereit und verpflichtet, an Streitbeilegungsverfahren
          vor einer Verbraucherschlichtungsstelle teilzunehmen.
        </Text>
        <Heading variant="h2">
          Verantwortliche für journalistisch-redaktionelle Inhalte gem. § 55 II
          RstV
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
          E-Mail: jung@infai.org
        </Text>
        <Heading variant="h2">Hinweis gendergerechter Sprache</Heading>
        <Text variant="body" className="pl-5">
          Im Sinne einer besseren Lesbarkeit der Texte wurde von uns zufällig
          und gleichverteilt entweder die männliche oder weibliche Form von
          personenbezogenen Hauptwörtern gewählt.
        </Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">{t("Imprint.disclaimer.header")}</Heading>
        <Heading variant="h3">§1 Warnhinweis zu Inhalten</Heading>
        <Text variant="body" className="pl-5">
          Die kostenlosen und frei zugänglichen Inhalte dieser Webseite wurden
          mit größtmöglicher Sorgfalt erstellt. Trotz sorgfältiger inhaltlicher
          Kontrolle übernehmen wir keine Haftung für die Inhalte interner Links.
          Für den Inhalt der verlinkten Seiten sind ausschließlich
          derenBetreiberin verantwortlich. Allein durch den Aufruf der
          kostenlosen und frei zugänglichen Inhalte kommt keinerlei
          Vertragsverhältnis zwischen der Nutzerin und der Anbieterin zustande,
          insoweit fehlt es am Rechtsbindungswillen der Anbieterin.
        </Text>
        <Heading variant="h3">§2 Externe Links</Heading>
        <Text variant="body" className="pl-5">
          Diese Website enthält Verknüpfungen zu Websites Dritter („externe
          Links“). Diese Websites unterliegen der Haftung der jeweiligen
          Betreiber. Der Anbieter hat bei der erstmaligen Verknüpfung der
          externen Links die fremden Inhalte daraufhin überprüft, ob etwaige
          Rechtsverstöße bestehen. Zu dem Zeitpunkt waren keine Rechtsverstöße
          ersichtlich. Der Anbieter hat keinerlei Einfluss auf die aktuelle und
          zukünftige Gestaltung und auf die Inhalte der verknüpften Seiten. Das
          Setzen von externen Links bedeutet nicht, dass sich der Anbieter die
          hinter dem Verweis oder Link liegenden Inhalte zu Eigen macht. Eine
          ständige Kontrolle der externen Links ist für den Anbieter ohne
          konkrete Hinweise auf Rechtsverstöße nicht zumutbar. Bei Kenntnis von
          Rechtsverstößen werden jedoch derartige externe Links unverzüglich
          gelöscht.
        </Text>
        <Heading variant="h3">§3 Urheber- und Leistungsschutzrechte</Heading>
        <Text variant="body" className="pl-5">
          Die auf dieser Website veröffentlichten Inhalte unterliegen dem
          deutschen Urheber- und Leistungsschutzrecht. Jede vom deutschen
          Urheber- und Leistungsschutzrecht nicht zugelassene Verwertung bedarf
          der vorherigen schriftlichen Zustimmung des Anbieters oder jeweiligen
          Rechteinhabers. Dies gilt insbesondere für Vervielfältigung,
          Bearbeitung, Übersetzung, Einspeicherung, Verarbeitung bzw. Wiedergabe
          von Inhalten in Datenbanken oder anderen elektronischen Medien und
          Systemen. Inhalte und Rechte Dritter sind dabei als solche
          gekennzeichnet. Die unerlaubte Vervielfältigung oder Weitergabe
          einzelner Inhalte oder kompletter Seiten ist nicht gestattet und
          strafbar. Lediglich die Herstellung von Kopien und Downloads für den
          persönlichen, privaten und nicht kommerziellen Gebrauch ist erlaubt.
          Die Darstellung dieser Website in fremden Frames ist nur mit
          schriftlicher Erlaubnis zulässig.
        </Text>
        <Heading variant="h3">§4 Besondere Nutzungsbedingungen</Heading>
        <Text variant="body" className="pl-5">
          Soweit besondere Bedingungen für einzelne Nutzungen dieser Website von
          den vorgenannten Paragraphen abweichen, wird an entsprechender Stelle
          ausdrücklich darauf hingewiesen. In diesem Falle gelten im jeweiligen
          Einzelfall die besonderen Nutzungsbedingungen.
        </Text>
        <Text variant="body" className="pl-5">
          Quelle: www.impressum-recht.de [angepasst an gendergerechte Sprache]
        </Text>
      </section>
    </article>
  );
};

export default Imprint;
