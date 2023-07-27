import {
  URL_Contact,
  URL_Datenschutz,
  URL_Impressum,
} from "@/config/constants";
import usePing from "@/hooks/usePing";
import { Button } from "@component-library/Button";
import { LoadingSuspense } from "@component-library/index";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Route, Routes } from "react-router-dom";
import Contact from "./Contact/Contact";
import Imprint from "./Imprint/Imprint";
import Privacy from "./Privacy/Privacy";

interface LegalProps {
  isMagazineUp(): boolean;
}

const Legal: React.FC<LegalProps> = (props) => {
  const { isMagazineUp } = props;
  const { t } = useTranslation();

  return (
    <div
      className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5"
      data-testid="legal"
    >
      <Heading variant="h1">{t("Legal.header")}</Heading>
      <Routes>
        <Route
          index
          element={
            <div
              data-testid="legalButton"
              className="flex w-full flex-col items-center justify-center gap-5 md:flex-row"
            >
              <Button
                title={t("Legal.imprint")}
                extern={isMagazineUp()}
                to={isMagazineUp() ? URL_Impressum : "/legal/imprint"}
              />
              <Button
                title={t("Legal.privacy")}
                extern={isMagazineUp()}
                to={isMagazineUp() ? URL_Datenschutz : "/legal/privacy"}
              />
              <Button
                title={t("Legal.contact")}
                extern={isMagazineUp()}
                to={isMagazineUp() ? URL_Contact : "/legal/contact"}
              />
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
