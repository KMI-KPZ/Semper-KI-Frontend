import useDeleteUser from "@/api/User/Mutations/useDeleteUser";
import useUpdateUserDetails from "@/api/User/Mutations/useUpdateUserDetails";
import { UserContext } from "@/contexts/UserContextProvider";
import { useContext } from "react";

interface ReturnProps {
  isLoggedIn: boolean;
  user: UserProps;
  deleteUser(): void;
  updateUserDetails(details: UpdateUserProps): void;
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
  email: string;
  addresses: UserAddressProps[];
}

export interface UpdateUserProps {
  address?: UserAddressProps;
}

export interface UserAddressProps {
  firstName: string;
  lastName: string;
  company?: string;
  street: string;
  houseNumber: number;
  zipcode: string;
  city: string;
  country: string;
  standard: boolean;
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
  const deleteUserMutation = useDeleteUser();
  const updateUserDetailsMutation = useUpdateUserDetails();

  const deleteUser = () => {
    deleteUserMutation.mutate();
  };
  const updateUserDetails = (details: UpdateUserProps) => {
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
