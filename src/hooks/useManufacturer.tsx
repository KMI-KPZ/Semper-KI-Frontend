import { useQuery } from "@tanstack/react-query";
import { IManufacturer } from "../interface/Interface";
import { TRequestStatus } from "../interface/types";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  data: IManufacturer[] | undefined;
  status: TRequestStatus;
  error: Error | null;
}

const useManufacturer = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();

  const { data, status, error } = useQuery<IManufacturer[], Error>({
    queryKey: ["manufacturer"],
    queryFn: async () =>
      axiosCustom
        .get(`${process.env.REACT_APP_HTTP_API_URL}/public/getManufacturers/`)
        .then((res) => {
          console.log("useManufacturer | loadManufacturer ✅ |", res.data);
          return res.data;
        }),
  });

  return { data, status, error };
};

export default useManufacturer;
