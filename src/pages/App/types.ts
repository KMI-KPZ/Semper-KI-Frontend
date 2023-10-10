
export type Event = ProjectEvent | OrgaEvent | PermissionEvent; 

export interface ProjectEvent {
  eventType: "projectEvent";
  projectID: string;
  processes: ProjectEventItem[];
}

export interface ProjectEventItem {
  processID: string;
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

export type DeleteEvent = DeleteProjectEvent | DeleteOrgaEvent;

export type ProjectEventType = "message" | "status";

export interface DeleteProjectEvent  {
  eventType: "projectEvent";
  projectID: string;
  processID: string;
  type: ProjectEventType;
}
export interface DeleteOrgaEvent {
  eventType: "orgaEvent";
}
