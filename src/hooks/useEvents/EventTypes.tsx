import { ProcessOrigin } from "@/api/Process/Querys/useGetProcess";

export type Event = OrgaEvent | ProjectEvent | ProcessEvent;

export interface GeneralEvent {
  eventID: string;
  userHashedID: string;
  createdWhen: Date;
  triggerEvent: boolean;
  eventType: EventType;
  eventData: EventData;
}

export type EventType = "projectEvent" | "orgaEvent" | "processEvent";
export type EventData = OrgaEventData | ProjectEventData | ProcessEventData;

export type OrgaEvent = {
  eventType: "orgaEvent";
  eventData: OrgaEventData;
} & GeneralEvent;

export type ProjectEvent = {
  eventType: "projectEvent";
  eventData: ProjectEventData;
} & GeneralEvent;

export type ProcessEvent = {
  eventType: "processEvent";
  eventData: ProcessEventData;
} & GeneralEvent;

export type EventDataReason =
  | "messages"
  | "file"
  | "files"
  | "serviceDetails"
  | "serviceType"
  | "serviceStatus"
  | "processDetails"
  | "processStatus"
  | "provisionalContractor"
  | "dependenciesIn"
  | "dependenciesOut"
  | "test"
  | "roleChanged"
  | "userDeleted";

export type ProcessEventDataReason =
  | "messages"
  | "file"
  | "files"
  | "serviceDetails"
  | "serviceType"
  | "serviceStatus"
  | "processDetails"
  | "processStatus"
  | "provisionalContractor"
  | "dependenciesIn"
  | "dependenciesOut";

export type OrgaEventDataReason = "roleChanged" | "userDeleted";

export type ProjectEventDataReason = "test";

export type GeneralEventData = {
  reason: EventDataReason;
  content: string;
};

export type ProjectEventData = {
  projectID: string;
  reason: ProjectEventDataReason;
  content: string;
} & GeneralEventData;

export type OrgaEventData = {
  orgaID: string;
  reason: OrgaEventDataReason;
  content: string;
} & GeneralEventData;

export type ProcessEventData = {
  projectID: string;
  processID: string;
  reason: ProcessEventDataReason;
  content: string;
  additionalInformation?: ProcessEventDataAdditionalInformation;
} & GeneralEventData;

export type ProcessEventDataAdditionalInformation = {
  origin: ProcessOrigin;
  createdBy: string;
};
