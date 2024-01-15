import { customAxios } from "@/api/customAxios";
import { AuthorizedUserContext } from "@/routeOutlets/AuthorizedUserOutlet";
import { useContext } from "react";
import {
  AuthorizedUserProps,
  UpdateUserProps,
  UserDetailsProps,
} from "./useUser";

interface useAuthorizedUserReturnProps {
  user: AuthorizedUserProps;
  deleteUser: () => void;
  updateUserDetails: (details: UpdateUserProps) => void;
}

const useAuthorizedUser = (): useAuthorizedUserReturnProps => {
  const { user, deleteUser, updateUserDetails } = useContext(
    AuthorizedUserContext
  );

  return { deleteUser, updateUserDetails, user };
};

export default useAuthorizedUser;
