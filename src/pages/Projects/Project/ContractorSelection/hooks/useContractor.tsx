import { getCustomAxios } from "@/hooks/useCustomAxios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  manufacturerQuery: UseQueryResult<IManufacturer[], Error>;
}

export interface IManufacturer {
  name: string;
  id: string;
}

const useManufacturer = (): ReturnProps => {
  const manufacturerQuery = useQuery<IManufacturer[], Error>({
    queryKey: ["manufacturer"],
    queryFn: async () =>
      getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/getManufacturers/`)
        .then((res) => {
          logger("useManufacturer | getManufacturers ✅ |", res.data);
          return res.data;
        }),
  });

  return { manufacturerQuery };
};

export default useManufacturer;
