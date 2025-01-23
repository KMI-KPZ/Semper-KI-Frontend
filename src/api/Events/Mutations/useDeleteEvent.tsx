import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const deleteEvent = async (eventID: string) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/events/delete/${eventID}/`
      )
      .then((response) => {
        logger("useDeleteEvent | deleteEvent ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteEvent | deleteEvent ❌ |", error);
      });

  return useMutation<string, Error, string>({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};

export default useDeleteEvent;
