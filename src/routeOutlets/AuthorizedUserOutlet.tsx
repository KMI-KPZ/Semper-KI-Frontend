import React, { createContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser, {
  AuthorizedUserProps,
  NewUserAddressProps,
  UpdateUserProps,
  UserAddressProps,
  UserType,
} from "@/hooks/useUser";
import { UseMutationResult } from "@tanstack/react-query";
import useCreateAddress from "@/api/User/Mutations/useCreateAddress";
import useDeleteAddress from "@/api/User/Mutations/useDeleteAddress";
import useDeleteUser from "@/api/User/Mutations/useDeleteUser";
import useUpdateAddress from "@/api/User/Mutations/useUpdateAddress";
import useUpdateUserDetails from "@/api/User/Mutations/useUpdateUserDetails";

interface AuthorizedUserOutletProps {}

export type AuthorizedUserContext = {
  user: AuthorizedUserProps;
  deleteUser: UseMutationResult<void, Error, void, unknown>;
  updateUserDetails: UseMutationResult<void, Error, UpdateUserProps, unknown>;
  createAddress: UseMutationResult<void, Error, NewUserAddressProps, unknown>;
  deleteAddress: UseMutationResult<void, Error, string, unknown>;
  updateAddress: UseMutationResult<void, Error, UserAddressProps, unknown>;
};

export const AuthorizedUserContext = createContext<AuthorizedUserContext>({
  user: {
    accessedWhen: new Date(),
    createdWhen: new Date(),
    details: {
      email: "",
      addresses: [],
    },
    hashedID: "",
    lastSeen: new Date(),
    name: "",
    updatedWhen: new Date(),
    usertype: 0,
  },
  deleteUser: {} as UseMutationResult<void, Error, void, unknown>,
  updateUserDetails: {} as UseMutationResult<
    void,
    Error,
    UpdateUserProps,
    unknown
  >,
  createAddress: {} as UseMutationResult<
    void,
    Error,
    NewUserAddressProps,
    unknown
  >,
  deleteAddress: {} as UseMutationResult<void, Error, string, unknown>,
  updateAddress: {} as UseMutationResult<
    void,
    Error,
    UserAddressProps,
    unknown
  >,
});

const AuthorizedUserRouteOutlet: React.FC<AuthorizedUserOutletProps> = (
  props
) => {
  const {} = props;
  const { pathname } = useLocation();
  const { user } = useUser();
  const deleteUser = useDeleteUser();
  const updateUserDetails = useUpdateUserDetails();
  const createAddress = useCreateAddress();
  const deleteAddress = useDeleteAddress();
  const updateAddress = useUpdateAddress();

  return user.usertype !== UserType.ANONYM ? (
    <AuthorizedUserContext.Provider
      value={{
        user,
        deleteUser,
        updateUserDetails,
        createAddress,
        deleteAddress,
        updateAddress,
      }}
    >
      <Outlet />
    </AuthorizedUserContext.Provider>
  ) : (
    <Navigate to={`/login?redirectURL=${pathname}`} />
  );
};

export default AuthorizedUserRouteOutlet;
