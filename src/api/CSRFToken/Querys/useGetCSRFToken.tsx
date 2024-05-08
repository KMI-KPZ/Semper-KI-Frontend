import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetCSRFToken = () => {
  const queryClient = useQueryClient();
  const getCSRFToken = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/csrfCookie/`)
      .then((response) => {
        const responseData = response.data;

        logger("useGetCSRFToken | getCSRFToken ✅ |", response);
        return responseData;
      });

  return useQuery<string, Error>({
    queryKey: ["csrf"],
    queryFn: getCSRFToken,
    staleTime: 1000 * 60 * 24,
  });
};

export default useGetCSRFToken;
