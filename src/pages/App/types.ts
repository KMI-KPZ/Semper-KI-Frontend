export interface Event {
  eventID: string;
  userHashedID: string;
  event: ProjectEvent;
  createdWhen: Date;
}

export type EventType = "projectEvent";

export interface ProjectEvent {
  events: ProjectEventItem[];
  eventType: "projectEvent";
  triggerEvent: boolean;
}

export interface ProjectEventItem {
  projectID: string;
  processes: ProcessEventItem[];
}

export interface ProcessEventItem {
  processID: string;
  files?: number;
  processStatus?: number;
}
