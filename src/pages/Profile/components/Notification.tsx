import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Container, LoadingAnimation, Text } from "@component-library/index";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGetUser from "@/api/User/Querys/useGetUser";

interface ProcessNotificationProps {
  type: "newsletter";
}

const ProcessNotification = (props: ProcessNotificationProps) => {
  const { type } = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const updateUser = useUpdateUser();
  const [loadingID, setLoadingID] = React.useState<string | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingID(e.target.id);
    updateUser.mutate(
      {
        changes: {
          notifications: { [type]: { [e.target.id]: e.target.checked } },
        },
      },
      { onSuccess: () => setLoadingID(null) }
    );
  };

  const email: boolean =
    user.details.notificationSettings?.[type]?.email ?? false;

  const event: boolean =
    user.details.notificationSettings?.[type]?.event ?? false;

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
          {updateUser.isLoading && loadingID === "email" ? (
            <LoadingAnimation variant="circel" />
          ) : (
            <input
              type="checkbox"
              id="email"
              checked={email}
              className="h-6 w-6 rounded-lg"
              onChange={handleOnChange}
            />
          )}
          <Text>{t("Profile.notification.email")}</Text>
        </label>
        <label className="flex w-full flex-row items-center justify-start gap-5">
          {updateUser.isLoading && loadingID === "event" ? (
            <LoadingAnimation variant="circel" />
          ) : (
            <input
              type="checkbox"
              id="event"
              checked={event}
              className="h-6 w-6 rounded-lg"
              onChange={handleOnChange}
            />
          )}
          <Text>{t("Profile.notification.event")}</Text>
        </label>
      </Container>
    </Container>
  );
};

export default ProcessNotification;
