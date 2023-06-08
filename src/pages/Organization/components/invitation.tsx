import { Button } from "@component-library/Button";
import { LoadingSuspense } from "@component-library/Loading";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations from "../hooks/useOrganizations";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Heading } from "@component-library/Typography";

interface InvitationProps {}

type Inputs = {
  email: string;
};

type InviteLink = {
  email: string;
  link: string;
};

const Invitation: React.FC<InvitationProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [links, setLinks] = useState<InviteLink[]>([]);
  const [showLoadedIn, setShowLoadedIn] = useState<boolean>(false);
  const { inviteLinkMutation, inviteUserMutation } = useOrganizations();

  const schema = yup
    .object({
      email: yup
        .string()
        .required(t("yup.required", { name: "Email" }))
        .email(t("yup.email")),
    })
    .required();
  type FormData = yup.InferType<typeof schema>;

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });
  const onSubmitInvite = (data: FormData) => {
    console.log("onSubmitInvite", data);
    setShowLoadedIn(true);
    inviteUserMutation.mutate(data.email, {
      onSuccess(data, variables, context) {
        setShowLoadedIn(false);
        reset();
      },
    });
  };

  const onSubmitLink = (data: FormData) => {
    console.log("onSubmitLink", data);
    setShowLoadedIn(true);
    inviteLinkMutation.mutate(data.email, {
      onSuccess(data, variables, context) {
        setLinks((prevState) => [
          ...prevState,
          { email: variables, link: data },
        ]);
        setShowLoadedIn(false);
        reset();
      },
    });
  };

  const handleOnClickInput = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    e.currentTarget.select();
  };

  const handleOnClickButton = (index: number) => {
    navigator.clipboard.writeText(links[index].link);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h2">
        {t("Organization.components.invitation.header")}
      </Heading>
      <form
        className="relative flex w-full flex-col items-center justify-between gap-5 md:w-1/2 md:flex-row"
        onSubmit={handleSubmit(onSubmitInvite)}
      >
        <input
          className="w-full bg-slate-100 px-5 py-2 md:w-4/6"
          placeholder={t("Organization.components.invitation.placeholder")}
          {...register("email")}
        />
        <Button
          onClick={handleSubmit(onSubmitInvite)}
          title={t("Organization.components.invitation.button.invite")}
        />
        <Button
          onClick={handleSubmit(onSubmitLink)}
          title={t("Organization.components.invitation.button.link")}
        />

        {showLoadedIn ? (
          <div className="absolute -right-28 w-fit p-5">
            {t("Organization.components.invitation.button.send")}
          </div>
        ) : null}
        {errors.email !== undefined ? (
          <div className="absolute -right-60 w-fit p-5">
            {errors.email.message}
          </div>
        ) : null}
      </form>
      {links.length > 0
        ? links.map((inviteLink, index) => (
            <div className="relative flex w-full flex-col items-center justify-center gap-5 md:w-4/6 md:flex-row">
              <span className="">{inviteLink.email}</span>
              <input
                readOnly
                onClick={handleOnClickInput}
                type="text"
                value={inviteLink.link}
                className="w-full select-all bg-slate-100 px-5 py-2 md:w-4/6"
              />
              <Button
                onClick={() => handleOnClickButton(index)}
                title={t("Organization.components.invitation.button.copy")}
              />
            </div>
          ))
        : null}
    </div>
  );
};

export default Invitation;
