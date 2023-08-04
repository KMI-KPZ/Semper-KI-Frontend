import { getCustomAxios } from "@/hooks/useCustomAxios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import logger from "@/hooks/useLogger";
import { OrderState } from "../../OrderRoutes/hooks/useOrder";

interface ReturnProps {
  ordersQuery: UseQueryResult<FlatOrder[], Error>;
  deleteOrder: UseMutationResult<any, unknown, string, unknown>;
}

export interface FlatOrder {
  id: string;
  date: string;
  state: OrderState;
  subOrderCount: number;
}

export const useFlatOrders = (): ReturnProps => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery<FlatOrder[], Error>(["orders"], async () => {
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
  });

  const deleteOrder = useMutation<any, Error, string>({
    mutationFn: async (orderCollectionID: string) => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/deleteOrderCollection/`;
      return getCustomAxios()
        .delete(apiUrl, { data: { id: orderCollectionID } })
        .then((response) => {
          logger("useOrders | deleteOrder ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["orders"]);
    },
  });

  return {
    ordersQuery,
    deleteOrder,
  };
};
