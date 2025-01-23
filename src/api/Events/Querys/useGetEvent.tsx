import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import {
  Event,
  OrgaEvent,
  ProcessEvent,
  ProjectEvent,
} from "@/hooks/useEvents/EventTypes";

export const parseEvent = (data: any): Event | undefined => {
  switch (data.eventType) {
    case "projectEvent":
      const projectEvent: ProjectEvent = {
        createdWhen: new Date(data.createdWhen),
        eventType: data.eventType,
        triggerEvent: data.triggerEvent,
        eventID: data.eventID,
        userHashedID: data.userHashedID,
        eventData: {
          projectID: data.eventData.primaryID,
          reason: data.eventData.reason,
          content: data.eventData.content,
        },
      };
      return projectEvent;
    case "processEvent":
      const processEvent: ProcessEvent = {
        createdWhen: new Date(data.createdWhen),
        eventType: "processEvent",
        triggerEvent: data.triggerEvent,
        eventID: data.eventID,
        userHashedID: data.userHashedID,
        eventData: {
          projectID: data.eventData.primaryID,
          processID: data.eventData.secondaryID,
          reason: data.eventData.reason,
          content: data.eventData.content,
          additionalInformation: data.eventData.additionalInformation,
        },
      };
      return processEvent;
    case "orgaEvent":
      const orgaEvent: OrgaEvent = {
        createdWhen: new Date(data.createdWhen),
        eventType: "orgaEvent",
        triggerEvent: data.triggerEvent,
        eventID: data.eventID,
        userHashedID: data.userHashedID,
        eventData: {
          orgaID: data.eventData.primaryID,
          reason: data.eventData.reason,
          content: data.eventData.content,
        },
      };
      return orgaEvent;
    default:
      return undefined;
  }
};

const useGetEvent = (eventID?: string) => {
  const getEvent = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/events/get/${eventID}/`)
      .then((response) => {
        const data: Event | undefined = parseEvent(response.data);

        logger("useGetEvent | getEvent ✅ |", data);
        return data;
      });

  return useQuery<Event | undefined, Error>({
    queryKey: ["events", eventID],
    queryFn: getEvent,
    enabled: eventID !== undefined && eventID !== "",
  });
};

export default useGetEvent;
