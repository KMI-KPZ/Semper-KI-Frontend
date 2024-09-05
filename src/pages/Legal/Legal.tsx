import { Button } from "@component-library/index";
import { Heading } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact/Contact";
import Imprint from "./Imprint/Imprint";
import Privacy from "./Privacy/Privacy";

interface LegalProps {}

const Legal: React.FC<LegalProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5"
      data-testid="legal"
    >
      <Heading variant="h1">{t("Legal.Legal.title")}</Heading>
      <Routes>
        <Route
          index
          element={
            <div
              data-testid="legalButton"
              className="flex w-full flex-col items-center justify-center gap-5 md:flex-row"
            >
              <Button title={t("Legal.Legal.imprint")} to={"/legal/imprint"} />
              <Button title={t("Legal.Legal.privacy")} to={"/legal/privacy"} />
              <Button title={t("Legal.Legal.contact")} to={"/legal/contact"} />
            </div>
          }
        />
        <Route path="imprint" element={<Imprint />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </div>
  );
};

export default Legal;
