
export type Event = OrderEvent | OrgaEvent | PermissionEvent; 

export interface OrderEvent {
  eventType: "orderEvent";
  orderCollectionID: string;
  orders: OrderEventItem[];
}

export interface OrderEventItem {
  orderID: string;
  status: number;
  messages: number;
}

export interface OrgaEvent  {
  eventType: "orgaEvent";
  orgaName: string;
}
export interface PermissionEvent  {
  eventType: "permissionEvent";
}

export type DeleteEvent = DeleteOrderEvent | DeleteOrgaEvent;

export type OrderEventType = "message" | "status";

export interface DeleteOrderEvent  {
  eventType: "orderEvent";
  orderCollectionID: string;
  orderID: string;
  type: OrderEventType;
}
export interface DeleteOrgaEvent {
  eventType: "orgaEvent";
}
