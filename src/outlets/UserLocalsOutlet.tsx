import React, { PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";
import useUser, { UserType } from "@/hooks/useUser";
import useSendUserInfos from "@/api/Authentification/Mutations/useSendUserInfos";

interface UserLocalsOutletProps {}

const UserLocalsOutlet: React.FC<PropsWithChildren<UserLocalsOutletProps>> = (
  props
) => {
  const { children } = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const sendUserLocals = useSendUserInfos();

  useEffect(() => {
    // if (user.usertype !== UserType.ANONYM)
    sendUserLocals.mutate();
  }, []);

  return children;
};

export default UserLocalsOutlet;
