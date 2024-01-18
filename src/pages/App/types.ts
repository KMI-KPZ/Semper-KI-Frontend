
export type Event = ProjectEvents | OrgaEvents | PermissionEvent; 

export interface ProjectEvents {
  eventType: "projectEvent";
  events: ProjectEventItem[];
}

export interface ProjectEventItem {
  projectID: string;
  processes: ProcessEventItem[];
}

export interface ProcessEventItem {
  processStatus?: number;
  messages?: number;
  processID:string;
}

export interface OrgaEvents  {
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
