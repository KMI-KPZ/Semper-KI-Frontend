import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { Event } from "@/pages/App/types";

const useGetMissedEvents = () => {
  const getMissedEvents = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/events/missed/get/`)
      .then((response) => {
        const responseData = response.data;
        const events: Event[] = responseData.events;

        logger("useGetMissedEvents | getMissedEvents ✅ |", response);
        return events;
      });

  return useQuery<Event[], Error>({
    queryKey: ["missedEvents"],
    queryFn: getMissedEvents,
    enabled: false,
  });
};

export default useGetMissedEvents;
