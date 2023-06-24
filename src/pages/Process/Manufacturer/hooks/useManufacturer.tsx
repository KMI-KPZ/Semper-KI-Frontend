import customAxios from "@/hooks/useCustomAxios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IManufacturer } from "..";

interface ReturnProps {
  manufacturerQuery: UseQueryResult<IManufacturer[], Error>;
}

const useManufacturer = (): ReturnProps => {
  const manufacturerQuery = useQuery<IManufacturer[], Error>({
    queryKey: ["manufacturer"],
    queryFn: async () =>
      customAxios
        .get(`${import.meta.env.VITE_HTTP_API_URL}/public/getManufacturers/`)
        .then((res) => {
          console.log("useManufacturer | getManufacturers ✅ |", res.data);
          return res.data;
        }),
  });

  return { manufacturerQuery };
};

export default useManufacturer;
