import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import {
  FieldError,
  FieldValues,
  Merge,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";
import logger from "@/hooks/useLogger";

interface ProcessNotificationProps {
  type: "newsletter";
  values?: {
    email: boolean;
    event: boolean;
  };
}

const ProcessNotification = (props: ProcessNotificationProps) => {
  const { type, values = { email: false, event: false } } = props;
  const { t } = useTranslation();
  const updateUser = useUpdateUser();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateUser.mutate({
      changes: {
        notifications: { [type]: { [e.target.id]: e.target.checked } },
      },
    });
  };

  return (
    <Container
      width="full"
      direction="row"
      justify="center"
      align="start"
      className="gap-10"
    >
      <Text>{t("Profile.notifications.newsletter_header")}</Text>
      <Container width="fit" direction="col" align="center" justify="center">
        <label className="flex w-full flex-row items-center justify-start gap-5">
          <input
            type="checkbox"
            id="email"
            checked={values.email}
            className="h-6 w-6 rounded-lg"
            onChange={handleOnChange}
          />
          <Text>{t("Profile.notification.email")}</Text>
        </label>
        <label className="flex w-full flex-row items-center justify-start gap-5">
          <input
            type="checkbox"
            id="event"
            checked={values.event}
            className="h-6 w-6 rounded-lg"
            onChange={handleOnChange}
          />
          <Text>{t("Profile.notification.event")}</Text>
        </label>
      </Container>
    </Container>
  );
};

export default ProcessNotification;
