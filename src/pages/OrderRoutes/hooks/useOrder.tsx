import { getCustomAxios } from "@/hooks/useCustomAxios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import logger from "@/hooks/useLogger";
import { useNavigate, useParams } from "react-router-dom";
import { SubOrderProps } from "./useSubOrder";

interface ReturnProps {
  orderQuery: UseQueryResult<OrderProps, Error>;
  createOrder: UseMutationResult<string, Error, void, unknown>;
  updateOrder: UseMutationResult<string, Error, UpdateOrderProps, unknown>;
  deleteOrder: UseMutationResult<string, Error, string, unknown>;
}

export interface OrderProps {
  id: string;
  date: string;
  state: OrderState;
  subOrders: SubOrderProps[];
}

export interface UpdateOrderProps {
  orderID: string;
  date?: string;
  state?: OrderState;
}

export enum OrderState {
  "DRAFT",
  "MANUFACTURER_SELECTED",
  "VERIFIED",
  "REQUESTED",
  "CLARIFICATION",
  "REJECTED",
  "CONFIRMED",
  "PRODUCTION",
  "DELIVERY",
  "COMPLETED",
}

export const useOrder = (): ReturnProps => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { orderID } = useParams();

  const orderQuery = useQuery<OrderProps, Error>(
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

  const createOrder = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createOrder/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useOrder | createOrder ✅ |", response.data);

          return response.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["orders"]);
      navigate(`/order/${data}`);
    },
  });

  const updateOrder = useMutation<string, Error, UpdateOrderProps>({
    mutationFn: async (props: UpdateOrderProps) => {
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateOrder/`, {
          props,
        })
        .then((res) => {
          logger("useOrder | updateOrder ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, orderID, context) {
      queryClient.invalidateQueries(["order", orderID]);
      queryClient.invalidateQueries(["orders"]);
    },
  });

  const deleteOrder = useMutation<string, Error, string>({
    mutationFn: async (orderID: string) => {
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/deleteOrder/${orderID}`)
        .then((res) => {
          logger("useOrder | deleteOrder ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, orderID, context) {
      queryClient.invalidateQueries(["order", orderID]);
      queryClient.invalidateQueries(["orders"]);
    },
  });

  return {
    createOrder,
    orderQuery,
    updateOrder,
    deleteOrder,
  };
};
