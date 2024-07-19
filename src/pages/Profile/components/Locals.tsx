import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { AuthorizedUserProps } from "@/hooks/useUser";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import {
  Language,
  app_languages,
} from "@/components/Menu/components/LanguageMenu";
import logger from "@/hooks/useLogger";
import useUpdateUser from "@/api/User/Mutations/useUpdateUser";

interface ProfileLocalsProps {
  user: AuthorizedUserProps;
}

const ProfileLocals: React.FC<ProfileLocalsProps> = (props) => {
  const { user } = props;
  const { t, i18n } = useTranslation();
  const [edit, setEdit] = React.useState(false);
  const [lngCode, setLngCode] = useState(user.details.locale);
  const updateUser = useUpdateUser();

  const handleOnChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLngCode(e.target.value);
  };
  const handleOnClickButton = () => {
    setEdit(!edit);
    // logger(i18n.language, lngCode);
    if (edit && i18n.language !== lngCode) {
      updateUser.mutate(
        { changes: { locale: lngCode } },
        {
          onSuccess: () => {
            i18n.changeLanguage(lngCode);
          },
        }
      );
    }
  };

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">{t("Profile.locals.header")}</Heading>
      <Divider />
      <Container width="full" direction="row" align="center" justify="center">
        <Text className="break-all">{t("Profile.locals.language")}</Text>

        {!edit ? (
          <Text className="break-all">
            {user.details.locale === undefined
              ? "---"
              : t(`Profile.locals.languages.${user.details.locale}`)}
          </Text>
        ) : (
          <select
            onChange={handleOnChangeLanguage}
            value={lngCode}
            className="rounded-lg border-2 p-2"
          >
            {app_languages.map((language: Language, index) => (
              <option value={language.code} key={index}>
                {t(`Profile.locals.languages.${language.code}`)}
              </option>
            ))}
          </select>
        )}
        <Button
          variant="text"
          size="sm"
          title={t(
            edit ? "Profile.locals.button.save" : "Profile.locals.button.edit"
          )}
          onClick={handleOnClickButton}
        >
          {edit ? <CheckIcon /> : <EditIcon />}
        </Button>
      </Container>
    </Container>
  );
};

export default ProfileLocals;
