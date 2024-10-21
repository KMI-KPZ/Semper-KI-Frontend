import { useContext } from "react";
import { AuthorizedUser } from "./useUser";
import { UseQueryResult } from "@tanstack/react-query";
import { AuthorizedUserContext } from "@/outlets/AuthorizedUserOutlet";

interface useAuthorizedUserReturnProps {
  user: AuthorizedUser;
  query: UseQueryResult<AuthorizedUser, Error>;
}

const useAuthorizedUser = (): useAuthorizedUserReturnProps => {
  const { user, query } = useContext(AuthorizedUserContext);

  return {
    user,
    query,
  };
};

export default useAuthorizedUser;
