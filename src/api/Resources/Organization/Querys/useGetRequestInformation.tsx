import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";

const useGetRequestInformation = () => {
  const getRequestInformation = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getRequestInformation/`)
      .then((response) => {
        const data: any = {
          ...response.data,
        };

        logger(
          "useGetRequestInformation | getRequestInformation ✅ |",
          response
        );
        return data;
      });

  return useQuery<any, Error>({
    queryKey: ["resources", "orga", "request"],
    queryFn: getRequestInformation,
  });
};

export default useGetRequestInformation;
