import { NewUserAddressProps } from "@/api/User/Mutations/useUpdateUser";
import { UserContext } from "@/contexts/UserContextProvider";
import { UseQueryResult } from "@tanstack/react-query";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
interface ReturnProps {
  isLoggedIn: boolean;
  user: UserProps;
  query: UseQueryResult<AuthorizedUserProps, Error>;
}

export type UserProps = AnonymUser | AuthorizedUserProps;

export type AnonymUser = {
  usertype: UserType.ANONYM;
};

export interface AuthorizedUserProps {
  hashedID: string;
  name: string;
  details: UserDetailsProps;
  createdWhen: Date;
  updatedWhen: Date;
  accessedWhen: Date;
  lastSeen: Date;
  organization?: string;
  usertype: UserType.USER | UserType.ORGANIZATION | UserType.ADMIN;
}

export interface UserDetailsProps {
  email?: string;
  locale?: string;
  addresses?: UserAddressProps[];
  statistics?: {
    lastLogin: string;
    numberOfLoginsTotal: number;
    locationOfLastLogin: string;
  };
  notificationSettings?: {
    newsletter?: {
      event?: boolean;
      email?: boolean;
    };
  };
}

export interface UpdateUserProps {
  address?: UserAddressProps;
}

export type UserAddressProps = {
  id: string;
} & NewUserAddressProps;

export enum UserType {
  "USER",
  "ORGANIZATION",
  "ADMIN",
  "ANONYM",
}

export interface Address {
  city: string;
  houseNumber: string;
  street: string;
  country: string;
  zipcode: string;
}

const useUser = (): ReturnProps => {
  const { isLoggedIn, user, query } = useContext(UserContext);
  const { t } = useTranslation();

  return {
    isLoggedIn,
    user,
    query,
  };
};

export default useUser;
