import {
  URL_Cookies,
  URL_Datenschutz,
  URL_Impressum,
} from "@/config/constants";
import { Button, Modal } from "@component-library/index";
import { Heading, Text } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useCookieConsent from "./hooks/useCookieConsent";

interface CookieBannerProps {}

const CookieBanner: React.FC<CookieBannerProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);
  const { rejectCookies, acceptCookies, cookieConsent } = useCookieConsent();

  const handleOnClickSettingsButton = () => {
    if (showSettings === true) {
      //TODO: Implement Cookie settings
      acceptCookies();
    } else {
      setShowSettings(true);
    }
  };

  return (
    <Modal
      open={cookieConsent === undefined}
      locked={cookieConsent === undefined}
      noIcon
      modalKey="CookieBanner"
    >
      <div
        className={`
      flex w-full max-w-6xl flex-col items-center justify-center gap-5 bg-white p-5
      `}
      >
        <div className="flex w-full items-center justify-center gap-5">
          <Heading variant="h1">{t("components.CookieBanner.heading")}</Heading>
        </div>
        <div className="flex w-full items-center justify-center gap-5">
          <Text variant="body">{t("components.CookieBanner.message")}</Text>
        </div>
        {showSettings ? (
          <div className="flex w-full flex-col items-start justify-center gap-5">
            <div className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-between">
              <Heading variant="h2">
                {t("components.CookieBanner.functional.heading")}
              </Heading>

              <Text variant="body" className="text-türkis">
                {t("components.CookieBanner.status.alwaysActive")}
              </Text>
            </div>
            <Text variant="body">
              {t("components.CookieBanner.functional.message")}
            </Text>
          </div>
        ) : null}
        <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
          <Button
            variant="primary"
            size="sm"
            title={t("components.CookieBanner.button.accept")}
            onClick={acceptCookies}
          />
          <Button
            variant="primary"
            size="sm"
            title={t("components.CookieBanner.button.reject")}
            onClick={rejectCookies}
          />
          <Button
            variant="primary"
            size="sm"
            title={
              showSettings
                ? t("components.CookieBanner.button.saveSettings")
                : t("components.CookieBanner.button.showSettings")
            }
            onClick={handleOnClickSettingsButton}
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          <Button
            extern
            title={t("components.CookieBanner.link.cookiePolicy")}
            to={URL_Cookies}
            variant="secondary"
          />
          <Button
            extern
            title={t("components.CookieBanner.link.dataProtection")}
            to={URL_Datenschutz}
            variant="secondary"
          />
          <Button
            extern
            title={t("components.CookieBanner.link.imprint")}
            to={URL_Impressum}
            variant="secondary"
          />
        </div>
      </div>
    </Modal>
  );
};

export default CookieBanner;
