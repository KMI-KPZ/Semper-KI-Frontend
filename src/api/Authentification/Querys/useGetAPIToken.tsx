import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";

const useGetAPIToken = () => {
  const getAPIToken = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/auth/api-key/get/`)
      .then((response) => {
        const data: string = response.data;

        logger("useGetAPIToken | getAPIToken ✅ |", response);
        return data;
      });

  return useQuery<string, Error>({
    queryKey: ["user", "api"],
    queryFn: getAPIToken,
  });
};

export default useGetAPIToken;
