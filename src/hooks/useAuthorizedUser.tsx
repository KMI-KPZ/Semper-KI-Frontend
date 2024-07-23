import { useContext } from "react";
import { AuthorizedUserProps } from "./useUser";
import { useTranslation } from "react-i18next";
import { UseQueryResult } from "@tanstack/react-query";
import { AuthorizedUserContext } from "@/outlets/AuthorizedUserOutlet";

interface useAuthorizedUserReturnProps {
  user: AuthorizedUserProps;
  query: UseQueryResult<AuthorizedUserProps, Error>;
}

const useAuthorizedUser = (): useAuthorizedUserReturnProps => {
  const { user, query } = useContext(AuthorizedUserContext);
  const { t } = useTranslation();

  return {
    user,
    query,
  };
};

export default useAuthorizedUser;
