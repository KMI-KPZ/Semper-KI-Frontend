import React, { PropsWithChildren, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Container } from "@component-library/index";
import useSendUserLocals from "@/api/Authentification/Mutations/useSendUserLocals";
import useUser, { UserType } from "@/hooks/useUser";

interface UserLocalsOutletProps {}

const UserLocalsOutlet: React.FC<PropsWithChildren<UserLocalsOutletProps>> = (
  props
) => {
  const { children } = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const sendUserLocals = useSendUserLocals();

  useEffect(() => {
    // if (user.usertype !== UserType.ANONYM)
    sendUserLocals.mutate();
  }, []);

  return children;
};

export default UserLocalsOutlet;
