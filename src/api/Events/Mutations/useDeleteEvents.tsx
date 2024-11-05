import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteEvents = () => {
  const queryClient = useQueryClient();
  const deleteEvents = async () =>
    authorizedCustomAxios
      .delete(`${process.env.VITE_HTTP_API_URL}/public/events/all/delete/`)
      .then((response) => {
        logger("useDeleteEvents | deleteEvents ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteEvents | deleteEvents ❌ |", error);
      });

  return useMutation<string, Error, void>({
    mutationFn: deleteEvents,
    onSuccess: () => {
      queryClient.invalidateQueries(["events"]);
    },
  });
};

export default useDeleteEvents;
