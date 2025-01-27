import React, { PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useUser, { UserType } from "@/hooks/useUser";
import useSetUserLocal from "@/api/Authentification/Mutations/useSetUserLocal";

interface UserLocalsOutletProps {}

const UserLocalsOutlet: React.FC<PropsWithChildren<UserLocalsOutletProps>> = (
  props
) => {
  const { children } = props;
  const { i18n } = useTranslation();
  const { user } = useUser();
  const setUserLocals = useSetUserLocal();

  useEffect(() => {
    if (user.usertype !== UserType.ANONYM && user.details.locale !== undefined)
      i18n.changeLanguage(user.details.locale);
  }, [user]);

  useEffect(() => {
    if (
      user.usertype === UserType.ANONYM ||
      user.details.locale === undefined
    ) {
      setUserLocals.mutate(i18n.language);
    }
  }, []);

  return children;
};

export default UserLocalsOutlet;
