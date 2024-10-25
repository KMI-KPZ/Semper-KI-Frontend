import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Event } from "@/pages/App/types";

const useCreateEvent = () => {
  const queryClient = useQueryClient();
  const createEvent = async (event: Event) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/events/post/`, event)
      .then((response) => {
        logger("useCreateEvent | createEvent ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateEvent | createEvent ❌ |", error);
      });

  return useMutation<string, Error, Event>({
    mutationFn: createEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};

export default useCreateEvent;
