import { useQuery, UseQueryResult } from "@tanstack/react-query";
import customAxios from "@/hooks/useCustomAxios";

interface ReturnProps {
  dataQuery: UseQueryResult<any, Error>;
}

const useOrga = (): ReturnProps => {
  const dataQuery = useQuery<any, Error>({
    queryKey: ["data"],
    queryFn: async () =>
      customAxios
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/getData/`)
        .then((res) => {
          console.log("useOrga | loadData ✅ |", res.data);
          return res.data;
        }),
  });

  return { dataQuery };
};

export default useOrga;
