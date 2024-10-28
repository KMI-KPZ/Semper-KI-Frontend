export type Event = OrgaEvent | ProjectEvent|ProcessEvent;

export interface GeneralEvent {
  eventID: string;
  userHashedID: string;
  createdWhen: Date;
  triggerEvent: boolean;
  eventType: EventType;
  eventData: EventData;
}

export type EventType = "projectEvent"| "orgaEvent"|"processEvent";
export type EventData = OrgaEventData | ProjectEventData|ProcessEventData;

export type OrgaEvent = {
  eventType: "orgaEvent";
  eventData: OrgaEventData;
} & GeneralEvent;


export type OrgaEventData = {
  orgaID: string;
}

export type ProjectEvent = {
  eventType: "projectEvent";
  eventData: ProjectEventData;
} & GeneralEvent;


export interface ProjectEventData {
  projectID: string;
}

export type ProcessEvent = {
  eventType: "processEvent";
  eventData: ProcessEventData;
} & GeneralEvent;


export interface ProcessEventData {
  projectID: string;
  processID: string;
  reason: "Message" | "File" | "Status";
  reasonValue:number;
}


