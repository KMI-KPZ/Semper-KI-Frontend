import { getCustomAxios } from "@/hooks/useCustomAxios";
import { IProcessItem } from "@/pages/Process/types";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  ordersQuery: UseQueryResult<Order[], Error>;
  deleteOrder: UseMutationResult<any, unknown, string, unknown>;
  deleteOrderCollection: UseMutationResult<any, unknown, string, unknown>;
  updateOrder: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    IUpdateOrderData,
    unknown
  >;
}

export interface Order {
  id: string;
  date: string;
  state: OrderState;
  subOrders: SubOrder[];
}

export interface SubOrder {
  id: string;
  item: IProcessItem;
  state: OrderState;
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
  "DRAFT",
  "MANUFACTURER_SELECTION",
  "VERIFICATION",
  "REQUESTED",
  "CLARIFICATION",
  "REJECTED",
  "CONFIRMED",
  "PRODUCTION",
  "DELIVERY",
  "COMPLETED",
}

export const useOrders = (shouldLoad?: boolean): ReturnProps => {
  const queryClient = useQueryClient();
  const ordersQuery = useQuery<Order[], Error>(
    ["orders"],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getOrders/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useOrders | getOrders ✅ |", response.data);
          return response.data.map((order: any) => ({
            ...order,
            subOrders: order.orders,
          }));
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
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/deleteOrder/`;
      return getCustomAxios()
        .delete(apiUrl, { data: { id: orderID } })
        .then((response) => {
          logger("useOrders | deleteOrder ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["orders"]);
    },
  });
  const deleteOrderCollection = useMutation<any, Error, string>({
    mutationFn: async (orderCollectionID: string) => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/deleteOrderCollection/`;
      return getCustomAxios()
        .delete(apiUrl, { data: { id: orderCollectionID } })
        .then((response) => {
          logger("useOrders | deleteOrderCollection ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const updateOrder = useMutation<AxiosResponse, Error, IUpdateOrderData>({
    mutationFn: async (props: IUpdateOrderData) => {
      return getCustomAxios()
        .put(`${process.env.VITE_HTTP_API_URL}/public/updateOrder/`, {
          props,
        })
        .then((res) => {
          logger("useOrders | updateOrder ✅ |", res.data);
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
