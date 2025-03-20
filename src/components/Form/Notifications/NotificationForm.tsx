import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Heading, Text } from "@component-library/index";
import {
  OrgaNotificationSetting,
  UserNotificationSetting,
} from "@/hooks/useUser";
import NotificationFormItem from "./NotificationFormItem";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";
import useUpdateOrganization from "@/api/Organization/Mutations/useUpdateOrganization";
import logger from "@/hooks/useLogger";

type NotificationFormProps =
  | {
      showProgress: boolean;
      type: "user";
      settings:
        | UserNotificationSetting[]
        | OrgaNotificationSetting[]
        | undefined;
    }
  | {
      showProgress: boolean;
      type: "orga";
      settings: OrgaNotificationSetting[] | undefined;
    };

const NotificationForm: React.FC<NotificationFormProps> = (props) => {
  const { type, settings, showProgress } = props;
  const { t } = useTranslation();
  const updateUser = useUpdateUser();
  const updateOrga = useUpdateOrganization();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    logger("-------", type, showProgress);
    if (type === "user") {
      updateUser.mutate({
        changes: {
          todos: { show: e.target.checked },
        },
      });
    } else {
      updateOrga.mutate({
        changes: {
          todos: { show: e.target.checked },
        },
      });
    }
  };

  return (
    <Container direction="col" width="full" id="NotificationForm">
      <Heading variant="h2">
        {t("components.Form.NotificationForm.heading")}
      </Heading>
      <Divider />
      <Container direction="row" width="fit" className="rounded-md">
        <Text variant="strong">
          {t("components.Form.NotificationForm.progress")}
        </Text>
        <input
          type="checkbox"
          checked={showProgress}
          className="h-6 w-6"
          onChange={handleOnChange}
        />
      </Container>
      <Container>
        <Container
          width="full"
          direction="col"
          justify="center"
          items="start"
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
