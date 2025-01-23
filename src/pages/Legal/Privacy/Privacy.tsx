import { Heading, Text } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface PrivacyProps {}

const Privacy: React.FC<PrivacyProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <article
      data-testid="privacy"
      className="flex w-full flex-col items-center justify-center gap-5  p-5"
    >
      <Heading variant="h1" className="w-full bg-white p-5 text-center">
        {t("Legal.Privacy.privacy-policy")}
      </Heading>
      <Text variant="body" className="w-full bg-white p-3 text-center">
        {t("Legal.Privacy.data-processing-info")}
      </Text>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">
          {t("Legal.Privacy.data-protection-overview")}
        </Heading>
        <Heading variant="h3">{t("Legal.Privacy.general-notes")}</Heading>
        <Text variant="body">{t("Legal.Privacy.data-protection-summary")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.data-collection")}</Heading>
        <Text variant="body">
          {t("Legal.Privacy.data-collection-responsible")}
        </Text>
        <Heading variant="h3">{t("Legal.Privacy.how-we-collect-data")}</Heading>
        <Text variant="body">{t("Legal.Privacy.how-we-collect-details")}</Text>
        <Heading variant="h3">
          {t("Legal.Privacy.what-data-we-collect")}
        </Heading>
        <Text variant="body">{t("Legal.Privacy.collected-personal-data")}</Text>
        <Text variant="body">{t("Legal.Privacy.data-details")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.usage-purpose")}</Heading>
        <Text variant="body">{t("Legal.Privacy.data-usage-purpose")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.your-rights")}</Heading>
        <Text variant="body">{t("Legal.Privacy.rights-description")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.tools-analysis")}</Heading>
        <Text variant="body">{t("Legal.Privacy.tools-analysis-details")}</Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">{t("Legal.Privacy.general-info")}</Heading>
        <Heading variant="h3">
          {t("Legal.Privacy.data-protection-heading")}
        </Heading>
        <Text variant="body">{t("Legal.Privacy.data-protection-details")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.responsible-note")}</Heading>
        <Text variant="body">{t("Legal.Privacy.responsible-details")}</Text>
        <Heading variant="h3">
          {t("Legal.Privacy.authorized-representative")}
        </Heading>
        <Text variant="body">{t("Legal.Privacy.authorized-details")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.management")}</Heading>
        <Text variant="body">{t("Legal.Privacy.management-details")}</Text>
        <Text variant="body">{t("Legal.Privacy.controller-description")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.consent-withdrawal")}</Heading>
        <Text variant="body">
          {t("Legal.Privacy.consent-withdrawal-details")}
        </Text>
        <Heading variant="h3">{t("Legal.Privacy.objection-right")}</Heading>
        <Text variant="body">{t("Legal.Privacy.objection-right-details")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.complaint-right")}</Heading>
        <Text variant="body">{t("Legal.Privacy.complaint-right-details")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.data-portability")}</Heading>
        <Text variant="body">
          {t("Legal.Privacy.data-portability-details")}
        </Text>
        <Heading variant="h3">{t("Legal.Privacy.ssl-encryption")}</Heading>
        <Text variant="body">{t("Legal.Privacy.ssl-encryption-details")}</Text>
        <Heading variant="h3">
          {t("Legal.Privacy.access-correction-deletion")}
        </Heading>
        <Text variant="body">
          {t("Legal.Privacy.access-correction-details")}
        </Text>
        <Heading variant="h3">
          {t("Legal.Privacy.processing-restriction")}
        </Heading>
        <Text variant="body">
          {t("Legal.Privacy.right-to-restrict-processing")}
        </Text>
        <Text variant="body">
          {t("Legal.Privacy.dispute-accuracy-of-data")}
        </Text>
        <Heading variant="h3">
          {t("Legal.Privacy.objection-to-ad-emails")}
        </Heading>
        <Text variant="body">
          {t("Legal.Privacy.imprint-advertising-usage-disclaimer")}
        </Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">
          {t("Legal.Privacy.data-protection-officer")}
        </Heading>
        <Text variant="body">
          {t("Legal.Privacy.mandatory-data-protection-officer")}
        </Text>
        <Text variant="body">{t("Legal.Privacy.contact-info")}</Text>
        <Text variant="body">{t("Legal.Privacy.contact-details")}</Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">{t("Legal.Privacy.data-collection2")}</Heading>
        <Heading variant="h3">{t("Legal.Privacy.cookies")}</Heading>
        <Text variant="body">{t("Legal.Privacy.cookie-info")}</Text>
        <Heading variant="h3">{t("Legal.Privacy.server-log-files")}</Heading>
        <Text variant="body">{t("Legal.Privacy.server-log-info")}</Text>
        <Text variant="body">{t("Legal.Privacy.server-log-details")}</Text>
        <Text variant="body">
          {t("Legal.Privacy.data-processing-agreement")}
        </Text>
        <Heading variant="h3">{t("Legal.Privacy.contact-form")}</Heading>
        <Text variant="body">{t("Legal.Privacy.contact-form-info")}</Text>
        <Text variant="body">{t("Legal.Privacy.contact-form-consent")}</Text>
        <Text variant="body">{t("Legal.Privacy.data-retention")}</Text>
        <Heading variant="h3">
          {t("Legal.Privacy.data-processing-legal")}
        </Heading>
        <Text variant="body">{t("Legal.Privacy.data-use-legal-basis")}</Text>
        <Text variant="body">{t("Legal.Privacy.data-details2")}</Text>
        <Heading variant="h3">
          {t("Legal.Privacy.data-transfer-for-contracts")}
        </Heading>
        <Text variant="body">{t("Legal.Privacy.data-transfer-info")}</Text>
        <Text variant="body">{t("Legal.Privacy.right-to-object")}</Text>
        <Text variant="body">{t("Legal.Privacy.data-deletion")}</Text>
      </section>
      <section className="flex w-full flex-col items-start justify-start gap-3 bg-white p-5">
        <Heading variant="h2">{t("Legal.Privacy.social-media")}</Heading>
        <Text variant="body">
          {t("Legal.Privacy.share-content-via-plugins")}
        </Text>
        <Heading variant="h3">{t("Legal.Privacy.google-web-fonts")}</Heading>
        <Text variant="body">{t("Legal.Privacy.google-web-fonts-info")}</Text>
      </section>
    </article>
  );
};

export default Privacy;
