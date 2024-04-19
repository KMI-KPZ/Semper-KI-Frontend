import { AuthorizedUserContext } from "@/routeOutlets/AuthorizedUserOutlet";
import { useContext } from "react";
import {
  AuthorizedUserProps,
  NewUserAddressProps,
  UpdateUserProps,
  UserAddressProps,
} from "./useUser";
import { UseMutationResult } from "@tanstack/react-query";

interface useAuthorizedUserReturnProps {
  user: AuthorizedUserProps;
  deleteUser: UseMutationResult<void, Error, void, unknown>;
  updateUserDetails: UseMutationResult<void, Error, UpdateUserProps, unknown>;
  createAddress: UseMutationResult<void, Error, NewUserAddressProps, unknown>;
  deleteAddress: UseMutationResult<void, Error, string, unknown>;
  updateAddress: UseMutationResult<void, Error, UserAddressProps, unknown>;
}

const useAuthorizedUser = (): useAuthorizedUserReturnProps => {
  const {
    user,
    deleteUser,
    updateUserDetails,
    createAddress,
    deleteAddress,
    updateAddress,
  } = useContext(AuthorizedUserContext);

  return {
    deleteUser,
    updateUserDetails,
    user,
    createAddress,
    deleteAddress,
    updateAddress,
  };
};

export default useAuthorizedUser;
