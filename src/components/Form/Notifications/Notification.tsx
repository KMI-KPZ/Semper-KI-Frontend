import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Container, LoadingAnimation, Text } from "@component-library/index";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import useGetUser from "@/api/User/Querys/useGetUser";
import useUser, {
  OrgaNotificationSetting,
  UserNotificationSetting,
  UserNotificationSettingsType,
  UserType,
} from "@/hooks/useUser";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganizationInfos";
import useOrganization from "@/hooks/useOrganization";

interface ProcessNotificationProps {
  notification: UserNotificationSetting | OrgaNotificationSetting;
  type: "user" | "orga";
}

const ProcessNotification = (props: ProcessNotificationProps) => {
  const { notification, type } = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const updateUser = useUpdateUser();
  const updateOrga = useUpdateOrganization();
  const [loadingID, setLoadingID] = React.useState<string | null>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingID(e.target.id);
    if (type === "user") {
      updateUser.mutate(
        {
          changes: {
            notifications: {
              [user.usertype === UserType.USER ? "user" : "organization"]: {
                [notification.type]: { [e.target.id]: e.target.checked },
              },
            },
          },
        },
        { onSuccess: () => setLoadingID(null) }
      );
    } else {
      updateOrga.mutate(
        {
          changes: {
            notifications: {
              organization: {
                [notification.type]: { [e.target.id]: e.target.checked },
              },
            },
          },
        },
        { onSuccess: () => setLoadingID(null) }
      );
    }
  };

  return (
    <tr>
      <td>{t(`types.NotificationSettingsType.${notification.type}`)}</td>
      <td>
        <Container width="full">
          {updateUser.isLoading && loadingID === "email" ? (
            <LoadingAnimation variant="circel" />
          ) : (
            <input
              type="checkbox"
              id="email"
              checked={notification.email}
              className="h-6 w-6 rounded-lg"
              onChange={handleOnChange}
            />
          )}
        </Container>
      </td>
      <td>
        <Container width="full">
          {updateUser.isLoading && loadingID === "event" ? (
            <LoadingAnimation variant="circel" />
          ) : (
            <input
              type="checkbox"
              id="event"
              checked={notification.event}
              className="h-6 w-6 rounded-lg"
              onChange={handleOnChange}
            />
          )}
        </Container>
      </td>
    </tr>
  );
};

export default ProcessNotification;
