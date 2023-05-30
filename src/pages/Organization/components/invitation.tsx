import { Button } from "@component-library/Button";
import { LoadingSuspense } from "@component-library/Loading";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations from "../hooks/useOrganizations";

interface InvitationProps {}

const Invitation: React.FC<InvitationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [showCopy, setShowCopy] = useState<boolean>(false);
  const [showLoadedIn, setshowLoadedIn] = useState<boolean>(false);
  const { inviteLinkQuery, inviteUserMutation } = useOrganizations();
  const link: string =
    "https://auth0.com/docs/authenticate/login/auth0-universal-login/configure-default-login-routes";
  const handleOnClickLink = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.currentTarget.select();
  };

  const handleOnClickCopy = () => {
    navigator.clipboard.writeText(link);
    setShowCopy(true);
    setTimeout(() => {
      setShowCopy(false);
    }, 2000);
  };
  const handleOnClickInvite = () => {
    setshowLoadedIn(true);
    setTimeout(() => {
      setshowLoadedIn(false);
    }, 2000);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h2>{t("Organization.components.invitation.header")}</h2>
      <div className="relative flex w-full flex-col items-center justify-between gap-5 md:w-1/2 md:flex-row">
        <input
          type="email"
          className="w-full bg-slate-100 px-5 py-2"
          placeholder={t("Organization.components.invitation.placeholder")}
        />
        <Button onClick={handleOnClickInvite}>
          {t("Organization.components.invitation.button.invite")}
        </Button>
        {showLoadedIn ? (
          <div className="absolute -right-28 w-fit p-5">
            {t("Organization.components.invitation.button.send")}
          </div>
        ) : null}
      </div>
      <LoadingSuspense query={inviteLinkQuery}>
        <div className="relative flex w-full flex-col items-center justify-between gap-5 text-center md:w-1/2 md:flex-row">
          <input
            readOnly
            className="w-full select-all px-5 py-2 hover:underline"
            type="text"
            onClick={handleOnClickLink}
            value={link}
          />
          <Button onClick={handleOnClickCopy}>
            {t("Organization.components.invitation.button.link")}
          </Button>
          {showCopy ? (
            <div className="absolute -right-28 w-fit p-5">
              {t("Organization.components.invitation.button.copy")}
            </div>
          ) : null}
        </div>
      </LoadingSuspense>
    </div>
  );
};

export default Invitation;
