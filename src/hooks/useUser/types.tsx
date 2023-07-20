export type User = {
  address: Address;
  email: string;
  hashedID: string;
  name: string;
  organization: string;
  type: UserType;
  created: Date;
  accessed: Date;
  updated: Date;
};
export enum UserType {
  "client",
  "manufacturer",
  "admin",
  "anonym",
}

export interface Address {
  city: string;
  houseNumber: string;
  street: string;
  country: string;
  zipcode: string;
}
