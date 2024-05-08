import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Event } from "@/pages/App/types";
import useUser, { UserType } from "@/hooks/useUser";

const useGetMissedEvents = () => {
  const queryClient = useQueryClient();
  const { user } = useUser();
  const getMissedEvents = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getMissedEvents/`)
      .then((response) => {
        const responseData = response.data;
        const events: Event[] = responseData.events;

        logger("useGetMissedEvents | getMissedEvents ✅ |", response);
        return events;
      });

  return useQuery<Event[], Error>({
    queryKey: ["key"],
    queryFn: getMissedEvents,
    enabled: user.usertype !== UserType.ANONYM,
  });
};

export default useGetMissedEvents;
