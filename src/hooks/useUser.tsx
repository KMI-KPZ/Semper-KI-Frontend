import useUserMutations from "@/api/User/useUserMutations";
import { UserContext } from "@/contexts/UserContextProvider";
import { UseQueryResult } from "@tanstack/react-query";
import { useContext } from "react";

interface ReturnProps {
  isLoggedIn: boolean;
  user: UserProps | undefined;
  deleteUser(): void;
  updateUserDetails(details: UserDetailsProps): void;
}

export type UserProps = {
  accessed: Date;
  created: Date;
  details: UserDetailsProps;
  email: string;
  hashedID: string;
  lastSeen: Date;
  name: string;
  organizations: string[];
  updated: Date;
  usertype: UserType;
};

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
