import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/pages/App/types";
import { parseEvent } from "./useGetEvent";

const useGetEvents = () => {
  const getEvents = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/events/all/get/`)
      .then((response) => {
        const data: Event[] = response.data.map((event: any) =>
          parseEvent(event)
        );

        logger("useGetEvents | getEvents ✅ |", response);
        return data;
      });

  return useQuery<Event[], Error>({
    queryKey: ["events"],
    queryFn: getEvents,
  });
};

export default useGetEvents;
