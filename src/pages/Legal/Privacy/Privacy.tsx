import { Heading, Text } from "@component-library/index";
import React from "react";

interface PrivacyProps {}

const Privacy: React.FC<PrivacyProps> = (props) => {
  const {} = props;
  return (
    <article
      data-testid="privacy"
      className="flex w-full flex-col items-center justify-center gap-5  p-5"
    >
      <Heading variant="h1" className="w-full bg-white p-5 text-center">
        Datenschutzerklärung
      </Heading>
      <Text variant="body" className="w-full bg-white p-3 text-center">
        Informationen zur Datenverarbeitung für die Webseite
        https://semper-ki.org und https://magazin.semper-ki.org
      </Text>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">1. Datenschutz auf einen Blick</Heading>
        <Heading variant="h3">Allgemeine Hinweise</Heading>
        <Text variant="body">
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was
          mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website
          besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
          persönlich identifiziert werden können. Ausführliche Informationen zum
          Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten
          Datenschutzerklärung.
        </Text>
        <Heading variant="h3">Datenerfassung auf unserer Website</Heading>
        <Text variant="body">
          Wer ist verantwortlich für die Datenerfassung auf dieser Website? Die
          Datenverarbeitung auf dieser Website erfolgt durch die
          Webseitenbetreiberin. Deren Kontaktdaten können Sie dem Impressum
          dieser Website entnehmen.
        </Text>
        <Heading variant="h3">Wie erfassen wir Ihre Daten?</Heading>
        <Text variant="body">
          Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese
          mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein
          Kontaktformular eingeben. Andere Daten werden automatisch beim Besuch
          der Website durch unsere IT-Systeme erfasst. Das sind vor allem
          technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit
          des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch,
          sobald Sie unsere Website betreten.
        </Text>
        <Heading variant="h3">Welche Daten erfassen wir?</Heading>
        <Text variant="body">
          Um die angebotenen Dienste nutzen zu können und Ihre Aufträge
          ordnungsgemäß abzuwickeln, erheben wir die folgenden personenbezogenen
          Daten:
        </Text>
        <Text variant="body">
          Anrede, Geschlecht Name, Vorname gegebenenfalls Firmenname Adresse
          Telefonnummer E-Mail-Adresse Geburtsdatum Nationalität Kontoverbindung
          IP-Adresse
        </Text>
        <Heading variant="h3">Für welche Zwecke nutzen wir Ihre Daten?</Heading>
        <Text variant="body">
          Wir verarbeiten die von Ihnen bereitgestellten personenbezogenen Daten
          für die Durchführung von vertraglich vereinbarten Forschungs- und
          Entwicklungsaufgaben sowie administrativen Aufgaben, Mitglieder- und
          Spenderverwaltung und der Öffentlichkeitsarbeit. Ein Teil der Daten
          wird erhoben, um eine fehlerfreie Bereitstellung der Website zu
          gewährleisten. Andere Daten können zur Analyse Ihres
          Nutzerinnenrverhaltens verwendet werden.
        </Text>
        <Heading variant="h3">
          Welche Rechte haben Sie bezüglich Ihrer Daten?
        </Heading>
        <Text variant="body">
          Sie haben jederzeit das Recht unentgeltlich Auskunft über Herkunft,
          Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu
          erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung
          oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren
          Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im
          Impressum angegebenen Adresse an uns wenden. Des Weiteren steht Ihnen
          ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
        </Text>
        <Heading variant="h3">
          Analyse-Tools und Tools von Drittanbietern
        </Heading>
        <Text variant="body">
          Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch
          ausgewertet werden. Das geschieht vor allem mit Cookies und mit
          sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens
          erfolgt in der Regel anonym; das Surf-Verhalten kann nicht zu Ihnen
          zurückverfolgt werden. Sie können dieser Analyse widersprechen oder
          sie durch die Nichtbenutzung bestimmter Tools verhindern. Detaillierte
          Informationen dazu finden Sie in der folgenden Datenschutzerklärung.
          Sie können dieser Analyse widersprechen. Über die
          Widerspruchsmöglichkeiten werden wir Sie in dieser
          Datenschutzerklärung informieren.
        </Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">
          2. Allgemeine Hinweise und Pflichtinformationen
        </Heading>
        <Heading variant="h3">Datenschutz</Heading>
        <Text variant="body">
          Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten
          sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und
          entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser
          Datenschutzerklärung. Wenn Sie diese Website benutzen, werden
          verschiedene personenbezogene Daten erhoben. Personenbezogene Daten
          sind Daten, mit denen Sie persönlich identifiziert werden können. Die
          vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben
          und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck
          das geschieht. Wir weisen darauf hin, dass die Datenübertragung im
          Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken
          aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch
          Dritte ist nicht möglich.
        </Text>
        <Heading variant="h3">
          Hinweis zur verantwortlichen Stelle Die verantwortliche Stelle für die
          Datenverarbeitung auf dieser Website ist:
        </Heading>
        <Text variant="body">
          Institut für Angewandte Informatik (InfAI) e. V. Goerdelerring 9 04109
          Leipzig Telefon: +49 341 229037 0 E-Mail: info@infai.org
        </Text>
        <Heading variant="h3">Vertretungsberechtigter Vorstand:</Heading>
        <Text variant="body">
          Prof. Dr. Bogdan Franczyk (1. Vorsitzender) Prof. Dr. Erhard Rahm (2.
          Vorsitzender)
        </Text>
        <Heading variant="h3">Geschäftsführung:</Heading>
        <Text variant="body">Andreas Heinecke, Prof. Dr. Roland Fassauer</Text>
        <Text variant="body">
          Verantwortliche Stelle ist die natürliche oder juristische Person, die
          allein oder gemeinsam mit anderen über die Zwecke und Mittel der
          Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen
          o. Ä.) entscheidet.
        </Text>
        <Heading variant="h3">
          Widerruf Ihrer Einwilligung zur Datenverarbeitung
        </Heading>
        <Text variant="body">
          Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen
          Einwilligung möglich. Sie können eine bereits erteilte Einwilligung
          jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail
          an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten
          Datenverarbeitung bleibt vom Widerruf unberührt.
        </Text>
        <Heading variant="h3">
          Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie
          gegen Direktwerbung (Art. 21 DSGVO)
        </Heading>
        <Text variant="body">
          Wenn die Datenverarbeitung auf Grundlage von Art. 6 Abs. 1 lit. e oder
          f DSGVO erfolgt, haben Sie jederzeit das Recht, aus Gründen, die sich
          aus Ihrer besonderen Situation ergeben, gegen die Verarbeitung Ihrer
          personenbezogenen Daten Widerspruch einzulegen; dies gilt auch für ein
          auf diese Bestimmungen gestütztes Profiling. Die jeweilige
          Rechtsgrundlage, auf denen eine Verarbeitung beruht, entnehmen Sie
          dieser Datenschutzerklärung. Wenn Sie Widerspruch einlegen, werden wir
          Ihre betroffenen personenbezogenen Daten nicht mehr verarbeiten, es
          sei denn, wir können zwingende schutzwürdige Gründe für die
          Verarbeitung nachweisen, die Ihre Interessen, Rechte und Freiheiten
          überwiegen oder die Verarbeitung dient der Geltendmachung, Ausübung
          oder Verteidigung von Rechtsansprüchen (Widerspruch nach Art. 21 Abs.
          1 DSGVO). Werden Ihre personenbezogenen Daten verarbeitet, um
          Direktwerbung zu betreiben, so haben Sie das Recht, jederzeit
          Widerspruch gegen die Verarbeitung Sie betreffender personenbezogener
          Daten zum Zwecke derartiger Werbung einzulegen; dies gilt auch für das
          Profiling, soweit es mit solcher Direktwerbung in Verbindung steht.
          Wenn Sie widersprechen, werden Ihre personenbezogenen Daten
          anschließend nicht mehr zum Zwecke der Direktwerbung verwendet
          (Widerspruch nach Art. 21 Abs. 2 DSGVO).
        </Text>
        <Heading variant="h3">
          Beschwerderecht bei der zuständigen Aufsichtsbehörde
        </Heading>
        <Text variant="body">
          Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein
          Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem
          Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes
          oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht
          besteht unbeschadet anderweitiger verwaltungsrechtlicher oder
          gerichtlicher Rechtsbehelfe.
        </Text>
        <Heading variant="h3">Recht auf Datenübertragbarkeit</Heading>
        <Text variant="body">
          Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung
          oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich
          oder an einen Dritten in einem gängigen, maschinenlesbaren Format
          aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an
          einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es
          technisch machbar ist.
        </Text>
        <Heading variant="h3">SSL- bzw. TLS-Verschlüsselung</Heading>
        <Text variant="body">
          Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der
          Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder
          Anfragen, die Sie an uns als Seitenbetreiberin senden, eine SSL-bzw.
          TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie
          daran, dass die Adresszeile des Browsers von “http://” auf “https://”
          wechselt und an dem Schloss-Symbol in Ihrer Browserzeile. Wenn die
          SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie
          an uns übermitteln, nicht von Dritten mitgelesen werden.
        </Text>
        <Heading variant="h3">
          Auskunft, Sperrung, Löschung und Berichtigung
        </Heading>
        <Text variant="body">
          Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit
          das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
          personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck
          der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung
          oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema
          personenbezogene Daten können Sie sich jederzeit unter der im
          Impressum angegebenen Adresse an uns wenden.
        </Text>
        <Heading variant="h3">Recht auf Einschränkung der Verarbeitung</Heading>
        <Text variant="body">
          Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer
          personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit
          unter der im Impressum angegebenen Adresse an uns wenden. Das Recht
          auf Einschränkung der Verarbeitung besteht in folgenden Fällen:
        </Text>
        <Text variant="body">
          Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen
          Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu
          überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die
          Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu
          verlangen. Wenn die Verarbeitung Ihrer personenbezogenen Daten
          unrechtmäßig geschah / geschieht, können Sie statt der Löschung die
          Einschränkung der Datenverarbeitung verlangen. Wenn wir Ihre
          personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur
          Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen
          benötigen, haben Sie das Recht, statt der Löschung die Einschränkung
          der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Wenn Sie
          einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine
          Abwägung zwischen Ihren und unseren Interessen vorgenommen werden.
          Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie
          das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen
          Daten zu verlangen. Wenn Sie die Verarbeitung Ihrer personenbezogenen
          Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung
          abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung,
          Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der
          Rechte einer anderen natürlichen oder juristischen Person oder aus
          Gründen eines wichtigen öffentlichen Interesses der Europäischen Union
          oder eines Mitgliedstaats verarbeitet werden.
        </Text>
        <Heading variant="h3">Widerspruch gegen Werbe-Mails</Heading>
        <Text variant="body">
          Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten
          Kontaktdaten zur Übersendung von nicht ausdrücklich angefprojectter
          Werbung und Informationsmaterialien wird hiermit widersprochen. Die
          Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im
          Falle der unverlangten Zusendung von Werbeinformationen, etwa durch
          Spam-E-Mails, vor.
        </Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">3. Datenschutzbeauftragter</Heading>
        <Text variant="body">
          Gesetzlich vorgeschriebener Datenschutzbeauftragter Wir haben für
          unser Unternehmen eine Datenschutzbeauftragte bestellt.
        </Text>
        <Text variant="body">
          Institut für Angewandte Informatik (InfAI) e. V. Dr. Wilfried Röder
          Goerdelerring 9 04109 Leipzig
        </Text>
        <Text variant="body">
          Telefon: +49 341 229037 0 E-Mail: datenschutz@infai.org
        </Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">4. Datenerfassung auf unserer Website</Heading>
        <Heading variant="h3">Cookies</Heading>
        <Text variant="body">
          Die Internetseiten verwenden teilweise so genannte Cookies. Cookies
          richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren.
          Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und
          sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem
          Rechner abgelegt werden und die Ihr Browser speichert. Die meisten der
          von uns verwendeten Cookies sind so genannte “Session-Cookies”. Sie
          werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies
          bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen. Diese
          Cookies ermöglichen es uns, Ihren Browser beim nächsten Besuch
          wiederzuerkennen. Sie können Ihren Browser so einstellen, dass Sie
          über das Setzen von Cookies informiert werden und Cookies nur im
          Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder
          generell ausschließen sowie das automatische Löschen der Cookies beim
          Schließen des Browser aktivieren. Bei der Deaktivierung von Cookies
          kann die Funktionalität dieser Website eingeschränkt sein. Cookies,
          die zur Durchführung des elektronischen Kommunikationsvorgangs oder
          zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (z.B.
          Warenkorbfunktion) erfprojectlich sind, werden auf Grundlage von Art.
          6 Abs. 1 lit. f DSGVO gespeichert. Der Websitebetreiber hat ein
          berechtigtes Interesse an der Speicherung von Cookies zur technisch
          fehlerfreien und optimierten Bereitstellung seiner Dienste. Soweit
          andere Cookies (z.B. Cookies zur Analyse Ihres Surfverhaltens)
          gespeichert werden, werden diese in dieser Datenschutzerklärung
          gesondert behandelt.
        </Text>
        <Heading variant="h3">Server-Log-Dateien</Heading>
        <Text variant="body">
          Der Provider der Seiten erhebt und speichert automatisch Informationen
          in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns
          übermittelt. Dies sind:
        </Text>
        <Text variant="body">
          Browsertyp und Browserversion verwendetes Betriebssystem Referrer URL
          Hostname des zugreifenden Rechners Uhrzeit der Serveranfrage
          IP-Adresse
        </Text>
        <Text variant="body">
          Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht
          vorgenommen. Grundlage für die Datenverarbeitung ist Art. 6 Abs. 1
          lit. f DSGVO, der die Verarbeitung von Daten zur Erfüllung eines
          Vertrags oder vorvertraglicher Maßnahmen gestattet.
        </Text>
        <Heading variant="h3">Kontaktformular</Heading>
        <Text variant="body">
          Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre
          Angaben aus dem Anfrageformular inklusive der von Ihnen dort
          angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den
          Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir
          nicht ohne Ihre Einwilligung weiter.
        </Text>
        <Text variant="body">
          Die Verarbeitung der in das Kontaktformular eingegebenen Daten erfolgt
          somit ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1
          lit. a DSGVO). Sie können diese Einwilligung jederzeit widerrufen.
          Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die
          Rechtmäßigkeit der bis zum Widerruf erfolgten
          Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt. Die von
          Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis
          Sie uns zur Löschung auffprojectn, Ihre Einwilligung zur Speicherung
          widerrufen oder der Zweck für die Datenspeicherung entfällt (z.B. nach
          abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche
          Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
        </Text>
        <Heading variant="h3">
          Verarbeiten von Daten (satzungs- und geschäftsgemäße Leistungen)
        </Heading>
        <Text variant="body">
          Wir erheben, verarbeiten und nutzen personenbezogene Daten unserer
          Mitglieder, Unterstützer, Interessenten, Kunden oder sonstiger
          Personen, soweit wir ihnen gegenüber vertragliche Leistungen anbieten
          oder im Rahmen bestehender geschäftlicher Beziehung, z.B. gegenüber
          Mitgliedern, tätig werden oder selbst Empfänger von Leistungen und
          Zuwendungen sind. Dies erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b
          DSGVO, der die Verarbeitung von Daten zur Erfüllung eines Vertrags
          oder vorvertraglicher Maßnahmen gestattet. Weiterhin verarbeiten wir
          die Daten betroffener Personen gem. Art. 6 Abs. 1 lit. f. DSGVO auf
          Grundlage unserer berechtigten Interessen, z.B. für die
          Öffentlichkeitsarbeit oder administrative Aufgaben.
        </Text>
        <Text variant="body">
          Die verarbeiteten Daten, deren Art, Umfang und Zweck sowie die
          Erfprojectlichkeit ihrer Verarbeitung bestimmen sich nach dem
          jeweiligen Vertragsverhältnis. Hierzu zählen Bestandsdaten, Stammdaten
          der Personen (z.B. Name, Adresse), sowie Kontaktdaten (z.B.
          E-Mailadresse, Telefon), Vertragsdaten (z.B. Inhalte und
          Informationen, Namen von Kontaktpersonen) und Zahlungsdaten (z.B.
          Bankverbindung, Zahlungshistorie). Personenbezogene Daten über die
          Inanspruchnahme unserer Internetseiten (Nutzungsdaten) erheben,
          verarbeiten und nutzen wir nur, soweit dies erfprojectlich ist, um der
          Nutzerin die Inanspruchnahme des Dienstes zu ermöglichen. Die
          erhobenen Daten werden nach Abschluss des Auftrags oder Beendigung der
          Geschäftsbeziehung gelöscht. Für den Fall der geschäftlichen
          Verarbeitung bewahren wir die Daten so lange auf, wie sie zur
          Geschäftsabwicklung, bzw. zu Gewährleistungs- oder Haftungspflichten
          relevant sind. Gesetzliche Aufbewahrungsfristen bleiben unberührt.
        </Text>
        <Heading variant="h3">
          Datenübermittlung bei Vertragsschluss für Dienstleistungen und
          digitale Inhalte
        </Heading>
        <Text variant="body">
          Wir übermitteln personenbezogene Daten an Dritte nur dann, wenn dies
          im Rahmen der Vertragsabwicklung notwendig ist, etwa an das mit der
          Zahlungsabwicklung beauftragte Kreditinstitut. Eine weitergehende
          Übermittlung der Daten erfolgt nicht bzw. nur dann, wenn Sie der
          Übermittlung ausdrücklich zugestimmt haben. Eine Weitergabe Ihrer
          Daten an Dritte ohne ausdrückliche Einwilligung, etwa zu Zwecken der
          Werbung, erfolgt nicht. Grundlage für die Datenverarbeitung ist Art. 6
          Abs. 1 lit. b DSGVO, der die Verarbeitung von Daten zur Erfüllung
          eines Vertrags oder vorvertraglicher Maßnahmen gestattt.
        </Text>
        <Text variant="body">
          DIESER SPEICHERUNG KÖNNEN SIE WIDERSPRECHEN, SOFERN IHRERSEITS
          BERECHTIGTE INTERESSEN VORLIEGEN, DIE UNSERE INTERESSEN ÜBERWIEGEN.
        </Text>
        <Text variant="body">
          Nach Ablauf der Aufbewahrungsfrist werden die Daten gelöscht, sofern
          keine gesetzliche Aufbewahrungspflicht oder ein sonstiger Rechtsgrund
          zur weiteren Speicherung vorliegt. Sofern ersichtlich ist, dass die
          Aufbewahrung Ihrer Daten nach Ablauf der Aufbewahrungsfrist
          erfprojectlich sein wird (z.B. aufgrund eines drohenden oder
          anhängigen Rechtsstreits), findet eine Löschung erst statt, wenn die
          Daten gegenstandslos geworden sind. Sonstige gesetzliche
          Aufbewahrungspflichten bleiben unberührt.
        </Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">5. Soziale Medien</Heading>
        <Text variant="body">
          Inhalte teilen über Plugins (Instagram, Mastodon & Co.) Die Inhalte
          auf unseren Seiten können noch nicht geteilt werden.
        </Text>
        <Heading variant="h3">Google Web Fonts</Heading>
        <Text variant="body">
          Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so
          genannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf
          einer Seite lädt Ihr Browser die benötigten Web Fonts in ihren
          Browsercache, um Texte und Schriftarten korrekt anzuzeigen. Zu diesem
          Zweck muss der von Ihnen verwendete Browser Verbindung zu den Servern
          von Google aufnehmen. Hierdurch erlangt Google Kenntnis darüber, dass
          über Ihre IP-Adresse unsere Website aufgerufen wurde. Die Nutzung von
          Google Web Fonts erfolgt im Interesse einer einheitlichen und
          ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein
          berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
          Wenn Ihr Browser Web Fonts nicht unterstützt, wird eine
          Standardschrift von Ihrem Computer genutzt. Weitere Informationen zu
          Google Web Fonts finden Sie unter
          https://developers.google.com/fonts/faq und in der
          Datenschutzerklärung von Google:
          https://www.google.com/policies/privacy/.
        </Text>
      </section>
    </article>
  );
};

export default Privacy;
