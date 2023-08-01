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
import { useNavigate } from "react-router-dom";

interface ReturnProps {
  orderQuery: UseQueryResult<Order, Error>;
  deleteSubOrder: UseMutationResult<any, unknown, string, unknown>;
  updateOrder: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    IUpdateOrderData,
    unknown
  >;
  createOrder: UseMutationResult<string, Error, boolean, unknown>;
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

export const useOrder = (orderID?: string): ReturnProps => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const orderQuery = useQuery<Order, Error>(
    ["order", orderID],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getOrder/${orderID}`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useOrdes | getOrder ✅ |", response.data);
          return response.data.map((order: any) => ({
            ...order,
            subOrders: order.orders,
          }));
        });
    },
    {
      enabled: orderID !== undefined,
    }
  );

  const createOrder = useMutation<string, Error, boolean>({
    mutationFn: async (demo: boolean) => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createOrder/`;
      return getCustomAxios()
        .post(apiUrl)
        .then((response) => {
          logger("useOrder | createOrder ✅ |", response.data);

          return response.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["orders"]);
      navigate(variables ? `/demo/${data}` : `/order/${data}`);
    },
  });

  const deleteSubOrder = useMutation<any, Error, string>({
    mutationFn: async (orderID: string) => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/deleteOrder/`;
      return getCustomAxios()
        .delete(apiUrl, { data: { id: orderID } })
        .then((response) => {
          logger("useOrder | deleteOrder ✅ |", response.data);
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
          logger("useOrder | updateOrder ✅ |", res.data);
          return res;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["order"]);
    },
  });

  return {
    createOrder,
    orderQuery,
    deleteSubOrder,
    updateOrder,
  };
};
