import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useDeleteEventProps {
  eventID: string;
}

const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  const deleteEvent = async (props: useDeleteEventProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/events/delete/${props.eventID}/`
      )
      .then((response) => {
        logger("useDeleteEvent | deleteEvent ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteEvent | deleteEvent ❌ |", error);
      });

  return useMutation<string, Error, useDeleteEventProps>({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};

export default useDeleteEvent;
