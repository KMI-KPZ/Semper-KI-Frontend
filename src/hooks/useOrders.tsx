import { useQuery } from "@tanstack/react-query";
import { IOrder } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface OrdersResponse {
  orders: IOrder[];
}

export const useOrders = () => {
  const { axiosCustom } = useCustomAxios();
  return useQuery<OrdersResponse, Error>(["orders"], async () => {
    const apiUrl = `${process.env.REACT_APP_API_URL}/public/getOrders/`;
    return axiosCustom.get(apiUrl).then((response) => response.data);
  });
};
