import { Button, Container } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact/Contact";
import Imprint from "./Imprint/Imprint";
import Privacy from "./Privacy/Privacy";
import PrivacyPolicy from "./PrivacyPolicy/PrivacyPolicy";
import Nda from "./Nda/Nda";
import TermsOfService from "./TermsOfService/TermsOfService";

interface LegalProps {}

const Legal: React.FC<LegalProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5"
      data-testid="legal"
    >
      <Routes>
        <Route
          index
          element={
            <Container direction="col" width="full">
              <Heading variant="h1">{t("Legal.Legal.heading")}</Heading>
              <div
                data-testid="legalButton"
                className="flex w-full flex-col items-center justify-center gap-5 md:flex-row"
              >
                <Button
                  title={t("Legal.Legal.button.imprint")}
                  to={"/legal/imprint"}
                />
                <Button
                  title={t("Legal.Legal.button.privacy")}
                  to={"/legal/privacy"}
                />
                <Button
                  title={t("Legal.Legal.button.contact")}
                  to={"/legal/contact"}
                />
                <Button title={t("Legal.Legal.button.nda")} to={"/legal/nda"} />
                <Button
                  title={t("Legal.Legal.button.privacyPolice")}
                  to={"/legal/privacyPolicy"}
                />
                <Button
                  title={t("Legal.Legal.button.termsOfService")}
                  to={"/legal/termsOfService"}
                />
              </div>
            </Container>
          }
        />
        <Route path="imprint" element={<Imprint />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="contact" element={<Contact />} />
        <Route path="termsOfService" element={<TermsOfService />} />
        <Route path="privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="nda" element={<Nda />} />
      </Routes>
    </div>
  );
};

export default Legal;
