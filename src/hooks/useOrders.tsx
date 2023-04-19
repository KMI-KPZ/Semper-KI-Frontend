import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { EOrderState } from "../interface/enums";
import { IChatMessage, IOrderCollection } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  data: IOrderCollection[] | undefined;
  status: "error" | "success" | "loading";
  error: Error | null;
  deleteOrder: UseMutationResult<any, unknown, string, unknown>;
  deleteOrderCollection: UseMutationResult<any, unknown, string, unknown>;
  updateOrder: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    IUpdateOrderData,
    unknown
  >;
}

export interface IUpdateOrderData {
  orderCollectionID: string;
  orderID: string;
  chat?: IChatMessage;
  state?: EOrderState;
  files?: File[];
}

export const useOrders = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const queryClient = useQueryClient();
  const { data, status, error } = useQuery<IOrderCollection[], Error>(
    ["orders"],
    async () => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/getOrders/`;
      return axiosCustom.get(apiUrl).then((response) => {
        console.log("useOrders | loadOrders ✅ |", response.data);
        return response.data;
      });
    }
  );

  const deleteOrder = useMutation<any, Error, string>({
    mutationFn: async (orderID: string) => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/deleteOrder/`;
      return axiosCustom
        .delete(apiUrl, { data: { id: orderID } })
        .then((response) => {
          console.log("useOrders | deleteOrder ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["orders"]);
    },
  });
  const deleteOrderCollection = useMutation<any, Error, string>({
    mutationFn: async (orderCollectionID: string) => {
      const apiUrl = `${process.env.REACT_APP_HTTP_API_URL}/public/deleteOrderCollection/`;
      return axiosCustom
        .delete(apiUrl, { data: { id: orderCollectionID } })
        .then((response) => {
          console.log("useOrders | deleteOrderCollection ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const updateOrder = useMutation<AxiosResponse, Error, IUpdateOrderData>({
    mutationFn: async (props: IUpdateOrderData) => {
      return axiosCustom
        .post(`${process.env.REACT_APP_HTTP_API_URL}/public/uploadOrder/`, {
          props,
        })
        .then((res) => {
          console.log("useOrders | updateOrder ✅ |", res.data);
          return res;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  return {
    data,
    status,
    error,
    deleteOrder,
    deleteOrderCollection,
    updateOrder,
  };
};
