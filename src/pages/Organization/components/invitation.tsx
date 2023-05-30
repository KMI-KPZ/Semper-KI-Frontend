import { Button } from "@component-library/Button";
import { LoadingSuspense } from "@component-library/Loading";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations from "../hooks/useOrganizations";
import { useForm, SubmitHandler } from "react-hook-form";

interface InvitationProps {}

type Inputs = {
  email: string;
};

const Invitation: React.FC<InvitationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [showCopy, setShowCopy] = useState<boolean>(false);
  const [showLoadedIn, setshowLoadedIn] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const { inviteLinkQuery, inviteUserMutation } = useOrganizations();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log(watch("email"));

  const handleOnClickLink = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.currentTarget.select();
  };

  const handleOnChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleOnClickCopy = () => {
    if (inviteLinkQuery.isSuccess && inviteLinkQuery.data !== undefined) {
      navigator.clipboard.writeText(inviteLinkQuery.data);
      setShowCopy(true);
      setTimeout(() => {
        setShowCopy(false);
      }, 2000);
    }
  };
  const handleOnClickInvite = () => {
    inviteUserMutation.mutate(email, {
      onSuccess(data, variables, context) {
        setshowLoadedIn(true);
        setTimeout(() => {
          setshowLoadedIn(false);
        }, 2000);
        setEmail("");
      },
    });
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <h2>{t("Organization.components.invitation.header")}</h2>
      <div
        className="relative flex w-full flex-col items-center justify-between gap-5 md:w-1/2 md:flex-row"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* <input
          className="w-full bg-slate-100 px-5 py-2"
          defaultValue="test"
          {...register("email")}
        /> */}
        <input
          type="email"
          className="w-full bg-slate-100 px-5 py-2"
          placeholder={t("Organization.components.invitation.placeholder")}
          value={email}
          onChange={handleOnChangeEmail}
        />
        <Button onClick={handleOnClickInvite}>
          {t("Organization.components.invitation.button.invite")}
        </Button>
        {showLoadedIn ? (
          <div className="absolute -right-28 w-fit p-5">
            {t("Organization.components.invitation.button.send")}
            {errors.email && <span>This field is required</span>}
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
            value={inviteLinkQuery.data}
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
