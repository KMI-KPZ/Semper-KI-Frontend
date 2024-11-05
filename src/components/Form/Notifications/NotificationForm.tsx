import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Heading } from "@component-library/index";
import {
  OrgaNotificationSetting,
  UserNotificationSetting,
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
    <Container direction="col" width="full" id="NotificationForm">
      <Heading variant="h2">
        {t("components.Form.NotificationForm.heading")}
      </Heading>
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
                  {t("components.Form.NotificationForm.heading")}
                </th>
                <th className="whitespace-nowrap">
                  {t("components.Form.NotificationForm.email")}
                </th>
                <th>{t("components.Form.NotificationForm.event")}</th>
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
