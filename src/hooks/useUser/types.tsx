export type User = {
  accessed: Date;
  created: Date;
  details: any;
  email: string;
  hashedID: string;
  lastSeen: Date;
  name: string;
  organizations: string[];
  updated: Date;
  usertype: UserType;
};

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
