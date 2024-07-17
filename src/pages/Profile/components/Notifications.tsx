import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import { AuthorizedUserProps, UserProps } from "@/hooks/useUser";
import { GeneralInput } from "@component-library/Form/GeneralInput";
import { useForm } from "react-hook-form";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import useUpdateAddress from "@/api/User/Mutations/useUpdateAddress";

interface ProfileNotificationsProps {
  user: AuthorizedUserProps;
}

interface FormData {
  newsletter_email: boolean;
  newsletter_event: boolean;
}

const ProfileNotifications: React.FC<ProfileNotificationsProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();
  const [edit, setEdit] = React.useState(false);
  // const updateUser = useUpdateUser

  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      newsletter_email: user.details.notificationSettings.newsletter.email,
      newsletter_event: user.details.notificationSettings.newsletter.event,
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    setEdit(false);
  };

  const handleOnCLickButtonEdit = () => {
    setEdit((prevState) => !prevState);
  };

  return (
    <Container direction="col" width="full">
      <Heading variant="h2">{t("Profile.notifications.header")}</Heading>
      <Divider />
      {edit ? (
        <Container width="full" direction="col" align="center" justify="center">
          <GeneralInput
            label="newsletter_email"
            labelText={t("Profile.notifications.newsletter_email")}
            register={register}
            type="checkbox"
          />
          <GeneralInput
            label="newsletter_event"
            labelText={t("Profile.notifications.newsletter_event")}
            register={register}
            type="checkbox"
          />
          <Button
            variant="primary"
            title={t("Profile.notifications.buttons.save")}
            onClick={handleSubmit(onSubmit)}
          />
        </Container>
      ) : (
        <Container width="full" direction="col">
          <Text>
            {t("Profile.notifications.newsletter_email")}:{" "}
            {user.details.notificationSettings.newsletter.email ? (
              <CheckIcon />
            ) : (
              <CloseIcon />
            )}
          </Text>
          <Text>
            {t("Profile.notifications.newsletter_event")}:{" "}
            {user.details.notificationSettings.newsletter.event ? (
              <CheckIcon />
            ) : (
              <CloseIcon />
            )}
          </Text>
          <Button
            title={t("Profile.notifications.buttons.edit")}
            onClick={handleOnCLickButtonEdit}
          />
        </Container>
      )}
    </Container>
  );
};

export default ProfileNotifications;
