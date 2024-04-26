import { AuthorizedUserContext } from "@/routeOutlets/AuthorizedUserOutlet";
import { useContext, useEffect } from "react";
import {
  AuthorizedUserProps,
  NewUserAddressProps,
  UpdateUserProps,
  UserAddressProps,
  UserType,
} from "./useUser";
import { UseMutationResult } from "@tanstack/react-query";
import { toast } from "./useToast";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
