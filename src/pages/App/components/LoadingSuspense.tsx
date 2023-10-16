import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

interface AppLoadingSuspenseProps {}

const AppLoadingSuspense: React.FC<AppLoadingSuspenseProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div
      data-testid="loadingSuspense"
      className="flex h-screen w-screen flex-col items-center justify-center gap-5 overflow-clip bg-white"
    >
      <Heading variant="h1">
        {t("App.components.LoadingSuspense.title")}
      </Heading>
      <Heading variant="h2">
        {t("App.components.LoadingSuspense.loading")}
      </Heading>
    </div>
  );
};

export default AppLoadingSuspense;
