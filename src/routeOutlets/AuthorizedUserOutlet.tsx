import React, { PropsWithChildren, createContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUser, {
  AuthorizedUserProps,
  UpdateUserProps,
  UserAddressProps,
  UserType,
} from "@/hooks/useUser";
import { UseMutationResult } from "@tanstack/react-query";
import useCreateAddress, {
  NewUserAddressProps,
} from "@/api/User/Mutations/useCreateAddress";
import useDeleteAddress from "@/api/User/Mutations/useDeleteAddress";
import useDeleteUser from "@/api/User/Mutations/useDeleteUser";
import useUpdateAddress from "@/api/User/Mutations/useUpdateAddress";
import useUpdateUserDetails from "@/api/User/Mutations/useUpdateUserDetails";
import logger from "@/hooks/useLogger";
import { Button, Container } from "@component-library/index";
import { useTranslation } from "react-i18next";

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

const AuthorizedUserRouteOutlet: React.FC<
  PropsWithChildren<AuthorizedUserOutletProps>
> = (props) => {
  const { t } = useTranslation();
  const { children } = props;
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
      {children}
      <Outlet />
    </AuthorizedUserContext.Provider>
  ) : children === undefined ? (
    <Navigate to={`/login?redirectURL=${pathname}`} />
  ) : (
    <Container direction="col" className="bg-white p-5" width="full">
      <h1>{t("routeOutlets.AuthorizedUserOutlet.login")}</h1>
      <Button
        title={t("routeOutlets.AuthorizedUserOutlet.button.login")}
        variant="primary"
        to={`/login?redirectURL=${pathname}`}
      />
    </Container>
  );
};

export default AuthorizedUserRouteOutlet;
