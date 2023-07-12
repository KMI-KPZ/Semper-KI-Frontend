import customAxios from "@/hooks/useCustomAxios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IManufacturer } from "../Manufacturer";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  manufacturerQuery: UseQueryResult<IManufacturer[], Error>;
}

const useManufacturer = (): ReturnProps => {
  const manufacturerQuery = useQuery<IManufacturer[], Error>({
    queryKey: ["manufacturer"],
    queryFn: async () =>
      customAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/getManufacturers/`)
        .then((res) => {
          logger("useManufacturer | getManufacturers ✅ |", res.data);
          return res.data;
        }),
  });

  return { manufacturerQuery };
};

export default useManufacturer;
