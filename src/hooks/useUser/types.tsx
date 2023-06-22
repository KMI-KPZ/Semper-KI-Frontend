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

export type EventType = "orderEvent" | "orgaEvent";
export interface Event {
  eventType: EventType;
}

export interface OrderEvent extends Event {
  eventType: "orderEvent";
  orderCollectionID: string;
  orders: OrderEventItem[];
}

export interface OrderEventItem {
  orderID: string;
  status?: number;
  messages?: number;
}

export interface OrgaEvent extends Event {
  eventType: "orgaEvent";
  orgaName: string;
}

export interface DeleteEvent {
  eventType: EventType;
}

export interface DeleteOrderEvent extends DeleteEvent {
  eventType: "orderEvent";
  orderCollectionID: string;
  orderID: string;
  type: "message" | "status";
}
export interface DeleteOrgaEvent extends DeleteEvent {
  eventType: "orgaEvent";
}
