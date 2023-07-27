import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  dataQuery: UseQueryResult<any, Error>;
}

const useOrga = (): ReturnProps => {
  const dataQuery = useQuery<any, Error>({
    queryKey: ["data"],
    queryFn: async () =>
      getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/getData/`)
        .then((res) => {
          logger("useOrga | loadData ✅ |", res.data);
          return res.data;
        }),
  });

  return { dataQuery };
};

export default useOrga;
