import { NewUserAddressProps } from "@/api/User/Mutations/useUpdateUser";
import { UserContext } from "@/contexts/UserContextProvider";
import { UseQueryResult } from "@tanstack/react-query";
import { useContext } from "react";

interface ReturnProps {
  isLoggedIn: boolean;
  user: UserProps;
  query: UseQueryResult<AuthorizedUser, Error>;
}

export type UserProps = AnonymUser | DefaultUser | AdminUser | OrgaUser;
export type AuthorizedUser = DefaultUser | AdminUser | OrgaUser;

export type AnonymUser = {
  usertype: UserType.ANONYM;
};

export type BaseUser = {
  hashedID: string;
  name: string;
  details: UserDetailsProps;
  createdWhen: Date;
  updatedWhen: Date;
  accessedWhen: Date;
  lastSeen: Date;
};

export type DefaultUser = {
  usertype: UserType.USER;
} & BaseUser;

export type AdminUser = {
  usertype: UserType.ADMIN;
} & BaseUser;

export type OrgaUser = {
  organization?: string;
  usertype: UserType.ORGANIZATION;
} & BaseUser;

export interface UserDetailsProps {
  email?: string;
  locale?: AppLanguage;
  addresses?: UserAddressProps[];
  statistics?: {
    lastLogin: string;
    numberOfLoginsTotal: number;
    locationOfLastLogin: string;
  };
  notificationSettings?: {
    user: UserNotificationSetting[];
    organization: OrgaNotificationSetting[];
  };
  todos: { show: boolean };
}

export type GeneralNotificationSettings = {
  event: boolean;
  email: boolean;
};

export type UserNotificationSetting = {
  type: UserNotificationSettingsType;
} & GeneralNotificationSettings;

export type OrgaNotificationSetting = {
  type: OrgaNotificationSettingsType;
} & GeneralNotificationSettings;

export type UserNotificationSettingsType =
  | "verification"
  | "processSent"
  | "responseFromContractor"
  | "statusChange"
  | "newMessage"
  | "actionReminder"
  | "errorOccurred"
  | "newsletter";

export type OrgaNotificationSettingsType =
  | "processReceived"
  | "responseFromClient"
  | "statusChange"
  | "newMessage"
  | "actionReminder"
  | "errorOccurred";

export type AppLanguage = "de-DE" | "en-US";

export interface UpdateUserProps {
  address?: UserAddressProps;
}

export type UserAddressProps = {
  id: string;
  coordinates: [number, number];
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

  return {
    isLoggedIn,
    user,
    query,
  };
};

export default useUser;
