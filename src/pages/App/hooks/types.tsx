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
  status: number;
  messages: number;
}

export interface OrgaEvent extends Event {
  eventType: "orgaEvent";
  orgaName: string;
}

export interface DeleteEvent {
  eventType: EventType;
}
export type OrderEventType = "message" | "status";

export interface DeleteOrderEvent extends DeleteEvent {
  eventType: "orderEvent";
  orderCollectionID: string;
  orderID: string;
  type: OrderEventType;
}
export interface DeleteOrgaEvent extends DeleteEvent {
  eventType: "orgaEvent";
}
