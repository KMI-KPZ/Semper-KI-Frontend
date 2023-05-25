import useCustomAxios from "@/hooks/useCustomAxios";
import { IProcessItem } from "@/pages/Process";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface ReturnProps {
  ordersQuery: UseQueryResult<IOrderCollection[], Error>;
  deleteOrder: UseMutationResult<any, unknown, string, unknown>;
  deleteOrderCollection: UseMutationResult<any, unknown, string, unknown>;
  updateOrder: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    IUpdateOrderData,
    unknown
  >;
}

export interface IOrderCollection {
  id: string;
  date: string;
  state: OrderCollectionState;
  orders: IOrder[];
}

export interface IOrder {
  id: string;
  item: IProcessItem;
  orderState: OrderState;
  chat: { messages: IChatMessage[] };
  files: string[];
  updatedWhen: string;
}

export interface IChatMessage {
  userID: string;
  userName: string;
  date: string;
  text: string;
}

export interface IUpdateOrderData {
  orderCollectionID: string;
  orderID?: string;
  chat?: IChatMessage;
  state?: OrderState;
  files?: File[];
}

export enum OrderState {
  "requested" = 0,
  "verify" = 1,
  "rejected" = 2,
  "confirmed" = 3,
  "production" = 4,
  "delivery" = 5,
  "finished" = 6,
}

export enum OrderCollectionState {
  "requested",
  "progress",
  "finished",
}

export const useOrders = (shouldLoad?: boolean): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const queryClient = useQueryClient();
  const ordersQuery = useQuery<IOrderCollection[], Error>(
    ["orders"],
    async () => {
      const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/getOrders/`;
      return axiosCustom.get(apiUrl).then((response) => {
        console.log("useOrders | getOrders ✅ |", response.data);
        return response.data;
      });
    },
    {
      enabled:
        (shouldLoad !== undefined && shouldLoad === true) ||
        shouldLoad === undefined
          ? true
          : false,
    }
  );

  const deleteOrder = useMutation<any, Error, string>({
    mutationFn: async (orderID: string) => {
      const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/deleteOrder/`;
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
      const apiUrl = `${
        import.meta.env.VITE_HTTP_API_URL
      }/public/deleteOrderCollection/`;
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
        .put(`${import.meta.env.VITE_HTTP_API_URL}/public/updateOrder/`, {
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
    ordersQuery,
    deleteOrder,
    deleteOrderCollection,
    updateOrder,
  };
};
