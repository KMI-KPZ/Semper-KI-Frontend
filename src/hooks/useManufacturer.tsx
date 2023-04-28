import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { IManufacturer } from "../interface/Interface";
import { TUseQueryStatus } from "../interface/types";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  manufacturerQuery: UseQueryResult<IManufacturer[], Error>;
}

const useManufacturer = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();

  const manufacturerQuery = useQuery<IManufacturer[], Error>({
    queryKey: ["manufacturer"],
    queryFn: async () =>
      axiosCustom
        .get(`${process.env.REACT_APP_HTTP_API_URL}/public/getManufacturers/`)
        .then((res) => {
          console.log("useManufacturer | loadManufacturer ✅ |", res.data);
          return res.data;
        }),
  });

  return { manufacturerQuery };
};

export default useManufacturer;
