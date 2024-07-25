import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import {
  AuthorizedUserProps,
  OrgaNotificationSetting,
  UserNotificationSetting,
  UserProps,
  UserType,
} from "@/hooks/useUser";
import NotificationFormItem from "./NotificationFormItem";

type NotificationFormProps =
  | {
      type: "user";
      settings:
        | UserNotificationSetting[]
        | OrgaNotificationSetting[]
        | undefined;
    }
  | {
      type: "orga";
      settings: OrgaNotificationSetting[] | undefined;
    };

const NotificationForm: React.FC<NotificationFormProps> = (props) => {
  const { type, settings } = props;
  const { t } = useTranslation();

  return (
    <Container direction="col" width="full">
      <Heading variant="h2">{t("Profile.notifications.header")}</Heading>
      <Divider />
      <Container>
        <Container
          width="full"
          direction="col"
          justify="center"
          align="start"
          className="overflow-auto"
        >
          <table className="table-auto border-separate border-spacing-x-5 border-spacing-y-3 ">
            <thead>
              <tr>
                <th className="text-start">
                  {t("Profile.notifications.header")}
                </th>
                <th>{t("Profile.notifications.email")}</th>
                <th>{t("Profile.notifications.event")}</th>
              </tr>
            </thead>
            <tbody>
              {settings?.map((notification, index) => (
                <NotificationFormItem
                  key={index}
                  type={type}
                  notification={notification}
                />
              ))}
            </tbody>
          </table>
        </Container>
      </Container>
    </Container>
  );
};

export default NotificationForm;
