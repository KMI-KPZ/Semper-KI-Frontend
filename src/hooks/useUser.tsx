import useUserMutations from "@/api/User/useUserMutations";
import { UserContext } from "@/contexts/UserContextProvider";
import { useContext } from "react";

interface ReturnProps {
  isLoggedIn: boolean;
  user: UserProps;
  deleteUser(): void;
  updateUserDetails(details: UserDetailsProps): void;
}

export type UserProps = AnonymUser | AuthorizedUserProps;

export type AnonymUser = {
  usertype: UserType.ANONYM;
};

export interface AuthorizedUserProps {
  accessed: Date;
  created: Date;
  details: UserDetailsProps;
  email: string;
  hashedID: string;
  lastSeen: Date;
  name: string;
  organizations: string[];
  updated: Date;
  usertype: UserType.USER | UserType.ORGANIZATION | UserType.ADMIN;
}

export interface UserDetailsProps {
  address?: string;
}

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
  const { isLoggedIn, user } = useContext(UserContext);
  const { deleteUserMutation, updateUserDetailsMutation } = useUserMutations();

  const deleteUser = () => {
    deleteUserMutation.mutate();
  };
  const updateUserDetails = (details: UserDetailsProps) => {
    updateUserDetailsMutation.mutate(details);
  };

  return {
    deleteUser,
    isLoggedIn,
    updateUserDetails,
    user,
  };
};

export default useUser;
