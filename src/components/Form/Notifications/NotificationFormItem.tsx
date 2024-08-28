import React from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import {
  OrgaNotificationSetting,
  UserNotificationSetting,
  UserType,
} from "@/hooks/useUser";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";

interface NotificationFormItemProps {
  notification: UserNotificationSetting | OrgaNotificationSetting;
  type: "user" | "orga";
}

const NotificationFormItem = (props: NotificationFormItemProps) => {
  const { notification, type } = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const updateUser = useUpdateUser();
  const updateOrga = useUpdateOrganization();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === "user") {
      updateUser.mutate({
        changes: {
          notifications: {
            [user.usertype === UserType.USER ? "user" : "organization"]: {
              [notification.type]: { [e.target.id]: e.target.checked },
            },
          },
        },
      });
    } else {
      updateOrga.mutate({
        changes: {
          notifications: {
            organization: {
              [notification.type]: { [e.target.id]: e.target.checked },
            },
          },
        },
      });
    }
  };

  return (
    <tr>
      <td>{t(`types.NotificationSettingsType.${notification.type}`)}</td>
      <td>
        <Container width="full">
          <input
            type="checkbox"
            id="email"
            checked={notification.email}
            className="h-6 w-6 rounded-lg"
            onChange={handleOnChange}
          />
        </Container>
      </td>
      <td>
        <Container width="full">
          <input
            type="checkbox"
            id="event"
            checked={notification.event}
            className="h-6 w-6 rounded-lg"
            onChange={handleOnChange}
          />
        </Container>
      </td>
    </tr>
  );
};

export default NotificationFormItem;
