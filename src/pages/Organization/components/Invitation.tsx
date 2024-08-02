import {
  Button,
  Container,
  Divider,
  LoadingAnimation,
} from "@component-library/index";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import useOrganization from "../../../hooks/useOrganization";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Heading } from "@component-library/index";
import logger from "@/hooks/useLogger";
import useCreateInviteLink from "@/api/Organization/Mutations/useCreateInviteLink";
import useInviteUser from "@/api/Organization/Mutations/useInviteUser";
import useGetOrganizationRoles from "@/api/Organization/Querys/useGetOrganizationRoles";
import { RoleProps } from "@/api/Organization/Mutations/useCreateRole";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import { OrganizationInvite } from "@/api/Organization/Querys/useGetOrganizationInvites";
import useDeleteInvite from "@/api/Organization/Mutations/useDeleteInvite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface InvitationProps {
  roles: RoleProps[] | undefined;
  invites: OrganizationInvite[] | undefined;
}

type Inputs = {
  email: string;
};

type InviteLink = {
  email: string;
  link: string;
};

const Invitation: React.FC<InvitationProps> = (props) => {
  const { roles = [], invites = [] } = props;
  const { t } = useTranslation();
  const [links, setLinks] = useState<InviteLink[]>([]);
  const [showLoadedIn, setShowLoadedIn] = useState<boolean>(false);
  const createInviteLink = useCreateInviteLink();
  const deleteInvite = useDeleteInvite();
  const inviteUser = useInviteUser();

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

  const defaultRoleID =
    roles !== undefined && roles[0] !== undefined ? roles[0].id : "";

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { roleID: defaultRoleID },
  });

  const onSubmitInvite = (data: FormData) => {
    // logger("onSubmitInvite", data);
    inviteUser.mutate(data);
  };

  const onSubmitLink = (data: FormData) => {
    setShowLoadedIn(true);
    createInviteLink.mutate(data, {
      onSuccess(data, variables, context) {
        setLinks((prevState) => [
          ...prevState,
          { email: variables.email, link: data },
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

  const handleOnClickButtonCopy = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const handleOnClickButtonDelete = (invitationID: string) => {
    deleteInvite.mutate(invitationID);
  };

  return (
    <Container direction="col" className="container" width="full">
      <Heading variant="h2" className="whitespace-nowrap">
        {t("Organization.components.invitation.header")}
      </Heading>
      <Divider />
      <form
        className="flex w-full flex-col flex-wrap items-center justify-center gap-5 rounded-xl border-2 p-3 md:flex-row"
        onSubmit={handleSubmit(onSubmitInvite)}
      >
        <input
          className="w-full rounded-xl border-2 px-5 py-2 md:w-fit md:flex-grow"
          placeholder={t("Organization.components.invitation.placeholder")}
          {...register("email")}
        />
        <select
          className="shadow-button rounded-xl border-2  px-3 py-2 "
          {...register("roleID")}
        >
          {roles !== undefined && roles.length > 0 ? (
            roles.map((_role, index) => (
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
          loading={inviteUser.isLoading}
          variant="primary"
          size="sm"
          title={t("Organization.components.invitation.button.invite")}
        />
        <Button
          size="sm"
          onClick={handleSubmit(onSubmitLink)}
          loading={createInviteLink.isLoading}
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
      {invites.length > 0 ? (
        <Container direction="col" width="full">
          {invites.map((invite, index) => (
            <div
              className="relative flex w-full flex-col items-center justify-center gap-5 rounded-xl border-2  p-3 md:flex-row md:border-0 md:p-0 "
              key={index}
            >
              <span className="">{invite.invitee.email}</span>
              <input
                readOnly
                onClick={handleOnClickInput}
                type="text"
                value={invite.invitation_url}
                className="w-full flex-grow select-all rounded-xl border-2 px-5 py-2"
              />
              <Container direction="row" width="fit">
                <Button
                  size="sm"
                  variant="text"
                  children={<ContentPasteIcon />}
                  onClick={() => handleOnClickButtonCopy(invite.invitation_url)}
                  title={t("Organization.components.invitation.button.copy")}
                />
                <Button
                  size="sm"
                  variant="text"
                  children={<DeleteForeverIcon />}
                  onClick={() => handleOnClickButtonDelete(invite.id)}
                  title={t("Organization.components.invitation.button.delete")}
                />
              </Container>
            </div>
          ))}
        </Container>
      ) : null}
    </Container>
  );
};

export default Invitation;
