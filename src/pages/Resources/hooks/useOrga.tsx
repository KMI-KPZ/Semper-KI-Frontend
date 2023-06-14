import { useQuery, UseQueryResult } from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";

interface ReturnProps {
  dataQuery: UseQueryResult<any, Error>;
}

const useOrga = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();

  const dataQuery = useQuery<any, Error>({
    queryKey: ["data"],
    queryFn: async () =>
      axiosCustom
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/getData/`)
        .then((res) => {
          console.log("useOrga | loadData ✅ |", res.data);
          return res.data;
        }),
  });

  return { dataQuery };
};

export default useOrga;
