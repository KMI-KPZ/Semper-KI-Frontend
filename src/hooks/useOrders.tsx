import { useQuery } from "@tanstack/react-query";
import { IOrder } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

export interface IOrdersResponse extends Array<object> {}

export const useOrders = () => {
  const { axiosCustom } = useCustomAxios();
  return useQuery<IOrdersResponse, Error>(
    ["orders"],
    async () => {
      const apiUrl = `${process.env.REACT_APP_API_URL}/public/getOrders/`;
      return axiosCustom.get(apiUrl).then((response) => {
        console.log("useOrders | ✅ |", response.data);
        return response.data;
      });
    },
    { initialData: [] }
  );
};
