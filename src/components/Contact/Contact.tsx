import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";

interface Props {}

const Contact: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h1>{t("Contact.Contact.header")}</h1>
      <h2>{t("Contact.Contact.title.name")}</h2>
      <input
        className="w-full max-w-lg p-2"
        type="text"
        placeholder={t("Contact.Contact.input.name")}
      />
      <h2>{t("Contact.Contact.title.email")}</h2>
      <input
        className="w-full max-w-lg p-2"
        type="text"
        placeholder={t("Contact.Contact.input.email")}
      />
      <h2>{t("Contact.Contact.title.message")}</h2>
      <textarea
        className="h-60 max-h-96 min-h-[5rem] w-full max-w-lg resize-y p-2"
        placeholder={t("Contact.Contact.input.message")}
      />

      <Button>{t("Contact.Contact.button.send")}</Button>
    </div>
  );
};

export default Contact;
