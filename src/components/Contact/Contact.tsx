import React from "react";
import { useTranslation } from "react-i18next";
import Button from "../General/Button";

interface Props {}

const Contact: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;

  return (
    <div className="flex flex-col w-full gap-5 items-center justify-center">
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
        className="resize-y w-full max-w-lg p-2 max-h-96 min-h-[5rem] h-60"
        placeholder={t("Contact.Contact.input.message")}
      />
      <Button>{t("Contact.Contact.button.send")}</Button>
    </div>
  );
};

export default Contact;
