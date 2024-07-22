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
import useUser, { AuthorizedUserProps, UserType } from "@/hooks/useUser";
import { preProcessFile } from "typescript";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import TextInput from "@component-library/Form/Inputs/TextInput";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";
import logger from "@/hooks/useLogger";

interface ProfileGeneralProps {
  user: AuthorizedUserProps;
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
    <form className="w-full">
      <Container width="full" direction="col">
        <Heading variant="h2">{t("Profile.general.header")}</Heading>
        <Divider />
        {updateUser.isLoading ? (
          <LoadingAnimation variant="circel" />
        ) : edit ? (
          <Container
            width="full"
            direction="col"
            align="center"
            justify="start"
          >
            <TextInput
              register={register}
              label="displayName"
              error={errors.displayName}
              labelText={t("Profile.general.name")}
              labelMaxWidth={maxLength}
            />
            <TextInput
              register={register}
              label="email"
              error={errors.email}
              labelText={t("Profile.general.email")}
              labelMaxWidth={maxLength}
            />
            <Text className="text-red-500">{t("Profile.general.hint")}</Text>
            <Container>
              <Button
                variant="text"
                size="sm"
                title={t("Profile.locals.button.cancel")}
                onClick={handleOnClickButtonCancel}
              />

              <Button
                variant="primary"
                size="sm"
                title={t("Profile.locals.button.save")}
                onClick={handleSubmit(handleOnClickButtonSave)}
              />
            </Container>
          </Container>
        ) : (
          <>
            <Container
              width="full"
              direction="row"
              align="start"
              justify="start"
            >
              <Container
                direction="col"
                width="fit"
                justify="start"
                align="start"
                className="p-3"
                gap={3}
              >
                <Text className="break-all">{t("Profile.general.name")}</Text>
                <Text className="break-all">{t("Profile.general.type")}</Text>
                <Text className="break-all">{t("Profile.general.email")}</Text>
              </Container>
              <Container
                direction="col"
                width="fit"
                justify="start"
                align="start"
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
              title={t("Profile.locals.button.edit")}
              onClick={handleOnClickButtonEdit}
            />
          </>
        )}
      </Container>
    </form>
  );
};

export default ProfileGeneral;
