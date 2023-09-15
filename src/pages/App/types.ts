
export type Event = OrderEvent | OrgaEvent | PermissionEvent; 

export interface OrderEvent {
  eventType: "orderEvent";
  orderID: string;
  subOrders: OrderEventItem[];
}

export interface OrderEventItem {
  subOrderID: string;
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
  orderID: string;
  subOrderID: string;
  type: OrderEventType;
}
export interface DeleteOrgaEvent {
  eventType: "orgaEvent";
}
