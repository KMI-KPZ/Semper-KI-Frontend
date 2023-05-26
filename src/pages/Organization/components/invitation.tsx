import { Button } from "@component-library/Button";
import React from "react";
import { useTranslation } from "react-i18next";

interface InvitationProps {}

const Invitation: React.FC<InvitationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h2>{t("Organization.components.invitation.header")}</h2>
      <div className="flex w-full flex-col items-center justify-between gap-5 md:w-1/2 md:flex-row">
        <input
          type="search"
          className="w-full bg-slate-100 px-5 py-2"
          placeholder={t("Organization.components.invitation.placeholder")}
        />
        <Button>{t("Organization.components.invitation.button.invite")}</Button>
      </div>
      <div className="flex w-full flex-col items-center justify-between gap-5 md:w-1/2 md:flex-row">
        <span>
          {
            "https://auth0.com/docs/authenticate/login/auth0-universal-login/configure-default-login-routes"
          }
        </span>
        <Button>{t("Organization.components.invitation.button.link")}</Button>
      </div>
    </div>
  );
};

export default Invitation;
