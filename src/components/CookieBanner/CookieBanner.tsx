import {
  URL_Cookies,
  URL_Datenschutz,
  URL_Impressum,
} from "@/config/constants";
import { Button } from "@component-library/Button";
import { Heading, Text } from "@component-library/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface CookieBannerProps {
  acceptCookies(): void;
  rejectCookies(): void;
}

const CookieBanner: React.FC<CookieBannerProps> = (props) => {
  const { acceptCookies, rejectCookies } = props;
  const { t } = useTranslation();
  const [showSettings, setShowSettings] = useState(false);

  const handleOnClickSettingsButton = () => {
    if (showSettings === true) {
      //TODO: Implement Cookie settings
      acceptCookies();
    } else {
      setShowSettings(true);
    }
  };

  return (
    <div
      className={`
       flex w-full max-w-6xl flex-col items-center justify-center gap-5 bg-white p-5
      `}
    >
      <div className="flex w-full items-center justify-center gap-5">
        <Heading variant="h1">{t("CookieBanner.heading")}</Heading>
      </div>
      <div className="flex w-full items-center justify-center gap-5">
        <Text variant="body">{t("CookieBanner.message")}</Text>
      </div>
      {showSettings ? (
        <div className="flex w-full flex-col items-start justify-center gap-5">
          <div className="flex w-full flex-col items-center gap-5 md:flex-row md:justify-between">
            <Heading variant="h2">
              {t("CookieBanner.functional.heading")}
            </Heading>

            <Text variant="body" className="text-türkis">
              {t("CookieBanner.status.alwaysActive")}
            </Text>
          </div>
          <Text variant="body">{t("CookieBanner.functional.message")}</Text>
        </div>
      ) : null}
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        <Button
          variant="primary"
          size="sm"
          title={t("CookieBanner.button.accept")}
          onClick={acceptCookies}
        />
        <Button
          variant="primary"
          size="sm"
          title={t("CookieBanner.button.reject")}
          onClick={rejectCookies}
        />
        <Button
          variant="primary"
          size="sm"
          title={
            showSettings
              ? t("CookieBanner.button.safeSettings")
              : t("CookieBanner.button.showSettings")
          }
          onClick={handleOnClickSettingsButton}
        />
      </div>
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
        <Button
          extern
          title={t("CookieBanner.link.cookiePolicy")}
          to={URL_Cookies}
          variant="link"
        />
        <Button
          extern
          title={t("CookieBanner.link.dataProtection")}
          to={URL_Datenschutz}
          variant="link"
        />
        <Button
          extern
          title={t("CookieBanner.link.imprint")}
          to={URL_Impressum}
          variant="link"
        />
      </div>
    </div>
  );
};

export default CookieBanner;
