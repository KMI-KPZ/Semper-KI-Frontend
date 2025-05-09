import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import { AuthorizedUser, UserType } from "@/hooks/useUser";
import TextInput from "@component-library/Form/Inputs/TextInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";

interface ProfileGeneralProps {
  user: AuthorizedUser;
}

interface FormData {
  displayName: string;
  email: string;
}

const ProfileGeneral: React.FC<ProfileGeneralProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();
  const [edit, setEdit] = React.useState(false);
  const updateUser = useUpdateUser();

  const schema = yup.object().shape({
    displayName: yup.string().required(t("yup.required")),
    email: yup.string().email().required(t("yup.required")),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { displayName: user.name, email: user.details.email },
  });

  const handleOnClickButtonSave = (data: FormData) => {
    updateUser.mutate({
      changes: { displayName: data.displayName, email: data.email },
    });
    setEdit((prevState) => !prevState);
  };

  const handleOnClickButtonEdit = () => {
    setEdit((prevState) => !prevState);
  };

  const handleOnClickButtonCancel = () => {
    reset();
    setEdit((prevState) => !prevState);
  };

  const maxLength = 70;

  return (
    <form className="w-full" id="ProfileGeneral">
      <Container width="full" direction="col">
        <Heading variant="h2">
          {t("components.Form.ProfileForm.header")}
        </Heading>
        <Divider />
        {updateUser.isLoading ? (
          <LoadingAnimation variant="circel" />
        ) : edit ? (
          <Container
            width="full"
            direction="col"
            items="center"
            justify="start"
          >
            <TextInput
              register={register}
              label="displayName"
              error={errors.displayName}
              labelText={t("components.Form.ProfileForm.name")}
              labelMaxWidth={maxLength}
            />
            <TextInput
              register={register}
              label="email"
              error={errors.email}
              labelText={t("components.Form.ProfileForm.email")}
              labelMaxWidth={maxLength}
            />
            <Text className="text-red-500">
              {t("components.Form.ProfileForm.hint")}
            </Text>
            <Container>
              <Button
                variant="text"
                size="sm"
                title={t("general.button.cancel")}
                onClick={handleOnClickButtonCancel}
              />

              <Button
                variant="primary"
                size="sm"
                title={t("general.button.save")}
                onClick={handleSubmit(handleOnClickButtonSave)}
              />
            </Container>
          </Container>
        ) : (
          <>
            <Container
              width="full"
              direction="row"
              items="start"
              justify="start"
            >
              <Container
                direction="col"
                width="fit"
                justify="start"
                items="start"
                className="p-3"
                gap={3}
              >
                <Text className="break-all">
                  {t("components.Form.ProfileForm.name")}
                </Text>
                <Text className="break-all">
                  {t("components.Form.ProfileForm.type")}
                </Text>
                <Text className="break-all">
                  {t("components.Form.ProfileForm.email")}
                </Text>
              </Container>
              <Container
                direction="col"
                width="fit"
                justify="start"
                items="start"
                className="p-3"
                gap={3}
              >
                <Text className="break-all">{user.name}</Text>
                <Text className="break-all">
                  {t(
                    `enum.UserType.${
                      UserType[user.usertype] as keyof typeof UserType
                    }`
                  )}
                </Text>
                <Text className="break-all">
                  {user.details.email === undefined
                    ? "---"
                    : user.details.email}
                </Text>
              </Container>
            </Container>
            <Button
              variant="text"
              size="sm"
              title={t("general.button.edit")}
              onClick={handleOnClickButtonEdit}
            />
          </>
        )}
      </Container>
    </form>
  );
};

export default ProfileGeneral;
