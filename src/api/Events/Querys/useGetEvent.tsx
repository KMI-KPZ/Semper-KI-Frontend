import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/pages/App/types";

export const parseEvent = (data: any): Event => {
  const event: Event = {
    ...data,
    createdWhen: new Date(data.createdWhen),
  };

  return event;
};

const useGetEvent = (eventID?: string) => {
  const getEvent = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/events/get/${eventID}/`)
      .then((response) => {
        const data: Event = parseEvent(response.data);

        logger("useGetEvent | getEvent ✅ |", response);
        return data;
      });

  return useQuery<Event, Error>({
    queryKey: ["events", eventID],
    queryFn: getEvent,
    enabled: eventID !== undefined && eventID !== "",
  });
};

export default useGetEvent;
