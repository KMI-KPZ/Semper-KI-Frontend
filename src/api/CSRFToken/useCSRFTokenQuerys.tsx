import {
  authorizedCustomAxios,
  unauthorizedCustomAxios,
} from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface useCSRFTokenQuerysReturnProps {
  CSRFTokenQuery: UseQueryResult<string, Error>;
}

const useCSRFTokenQuerys = (): useCSRFTokenQuerysReturnProps => {
  const CSRFTokenQuery = useQuery<string, Error>({
    queryKey: ["csrf"],
    queryFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/csrfCookie/`;
      return unauthorizedCustomAxios.get(apiUrl).then((response) => {
        logger("useCSRFTokenToken | ✅ |");
        return response.data;
      });
    },
    staleTime: 1000 * 60 * 24,
  });

  return { CSRFTokenQuery };
};

export default useCSRFTokenQuerys;
