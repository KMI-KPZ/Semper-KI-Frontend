import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const useGetCsrfCookie = () => {
  const queryClient = useQueryClient();
  const getCsrfCookie = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/auth/csrfCookie/`)
      .then((response) => {
        const responseData = response.data;

        logger("useGetCSRFToken | getCSRFToken ✅ |", response);
        return responseData;
      });

  return useQuery<string, Error>({
    queryKey: ["csrf"],
    queryFn: getCsrfCookie,
    staleTime: 1000 * 60 * 24,
  });
};

export default useGetCsrfCookie;
