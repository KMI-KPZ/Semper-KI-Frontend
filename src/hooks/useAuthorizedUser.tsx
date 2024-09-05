import { useContext } from "react";
import { AuthorizedUserProps } from "./useUser";
import { UseQueryResult } from "@tanstack/react-query";
import { AuthorizedUserContext } from "@/outlets/AuthorizedUserOutlet";

interface useAuthorizedUserReturnProps {
  user: AuthorizedUserProps;
  query: UseQueryResult<AuthorizedUserProps, Error>;
}

const useAuthorizedUser = (): useAuthorizedUserReturnProps => {
  const { user, query } = useContext(AuthorizedUserContext);

  return {
    user,
    query,
  };
};

export default useAuthorizedUser;
