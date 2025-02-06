import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import { AuthorizedUser } from "@/hooks/useUser";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {
  Language,
  app_languages,
} from "@/components/Menu/components/LanguageMenu";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";
import useSetUserLocal from "@/api/Authentification/Mutations/useSetUserLocal";

interface ProfileLocalsProps {
  user: AuthorizedUser;
}

const ProfileLocals: React.FC<ProfileLocalsProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();
  const [edit, setEdit] = React.useState(false);
  const [lngCode, setLngCode] = useState<string | undefined>(
    user.details.locale
  );
  const setUserLocal = useSetUserLocal();

  const updateUser = useUpdateUser();

  const handleOnChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLngCode(e.target.value);
  };
  const handleOnClickButton = () => {
    setEdit(!edit);
    // logger(i18n.language, lngCode);
    if (edit && lngCode !== undefined) {
      setUserLocal.mutate(lngCode);
    }
  };

  return (
    <Container width="full" direction="col" id="ProfileLocals">
      <Heading variant="h2">{t("Profile.Locals.header")}</Heading>
      <Divider />
      <Container width="full" direction="row" items="center" justify="center">
        <Text className="break-all">{t("Profile.Locals.language")}</Text>

        {updateUser.isLoading ? (
          <LoadingAnimation variant="circel" />
        ) : !edit ? (
          <Text className="break-all">
            {user.details.locale === undefined
              ? "---"
              : t(`Profile.Locals.languages.${user.details.locale}`)}
          </Text>
        ) : (
          <select
            onChange={handleOnChangeLanguage}
            value={lngCode}
            className="rounded-lg border-2 p-2"
          >
            {app_languages.map((language: Language, index) => (
              <option value={language.code} key={index}>
                {t(`Profile.Locals.languages.${language.code}`)}
              </option>
            ))}
          </select>
        )}
        <Button
          variant="text"
          size="sm"
          title={t(edit ? "general.button.save" : "general.button.edit")}
          onClick={handleOnClickButton}
        >
          {edit ? <CheckIcon /> : <EditIcon />}
        </Button>
      </Container>
    </Container>
  );
};

export default ProfileLocals;
