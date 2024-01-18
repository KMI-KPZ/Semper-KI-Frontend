import { Button } from "@component-library/Button";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganizations from "../hooks/useOrganizations";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Heading } from "@component-library/Typography";
import logger from "@/hooks/useLogger";

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
  const { inviteLinkMutation, inviteUserMutation, rolesQuery } =
    useOrganizations();

  const schema = yup
    .object({
      email: yup
        .string()
        .required(t("yup.requiredName", { name: "Email" }))
        .email(t("yup.email")),
      roleID: yup.string().required(t("yup.requiredName", { name: "Role" })),
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
    // logger("onSubmitInvite", data);
    inviteUserMutation.mutate(data);
  };

  const onSubmitLink = (data: FormData) => {
    logger("onSubmitLink", data);
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
    <div className="flex w-full flex-col items-center gap-5 p-5 shadow-card">
      <Heading variant="h2" className="whitespace-nowrap">
        {t("Organization.components.invitation.header")}
      </Heading>
      <form
        className="flex w-full flex-col flex-wrap items-center justify-center gap-5 md:flex-row"
        onSubmit={handleSubmit(onSubmitInvite)}
      >
        <input
          className="w-full bg-slate-100 px-5 py-2 md:w-fit md:flex-grow"
          placeholder={t("Organization.components.invitation.placeholder")}
          {...register("email")}
        />
        <select
          className="shadow-button rounded-xl bg-grau-50 p-3"
          {...register("roleID")}
        >
          {rolesQuery.data !== undefined && rolesQuery.data.length > 0 ? (
            rolesQuery.data.map((_role, index) => (
              <option key={index} value={_role.id}>
                {_role.name}
              </option>
            ))
          ) : (
            <option value="empty" disabled>
              {t("Organization.components.table.empty")}
            </option>
          )}
        </select>
        <Button
          onClick={handleSubmit(onSubmitInvite)}
          title={t("Organization.components.invitation.button.invite")}
        />
        <Button
          onClick={handleSubmit(onSubmitLink)}
          title={t("Organization.components.invitation.button.link")}
        />
      </form>
      {showLoadedIn || errors.email !== undefined ? (
        <div className="flex w-full flex-col items-center justify-center md:flex-row">
          {showLoadedIn ? (
            <div className="">
              {t("Organization.components.invitation.button.send")}
            </div>
          ) : null}
          {errors.email !== undefined ? (
            <div className="">{errors.email.message}</div>
          ) : null}
        </div>
      ) : null}
      {links.length > 0 ? (
        <div className="flex w-full flex-col items-center justify-center md:flex-row">
          {links.map((inviteLink, index) => (
            <div className="relative flex w-full flex-col items-center justify-center gap-5  md:flex-row">
              <span className="">{inviteLink.email}</span>
              <input
                readOnly
                onClick={handleOnClickInput}
                type="text"
                value={inviteLink.link}
                className="w-full flex-grow select-all bg-slate-100 px-5 py-2"
              />
              <Button
                onClick={() => handleOnClickButton(index)}
                title={t("Organization.components.invitation.button.copy")}
              />
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Invitation;
