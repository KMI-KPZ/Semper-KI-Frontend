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
  ordersQuery: UseQueryResult<FlatOrderProps[], Error>;
}

export interface FlatOrderProps {
  orderID: string;
  client: string;
  created: Date;
  updated: Date;
  state: OrderState;
  subOrderCount: number;
}

export const useFlatOrders = (): ReturnProps => {
  const ordersQuery = useQuery<FlatOrderProps[], Error>(
    ["orders"],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getFlatOrders/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useOrders | getOrders ✅ |", response.data);
          return response.data.orders.map((order: any) => ({
            ...order,
            created: new Date(order.created),
            updated: new Date(order.updated),
          }));
        });
    }
  );

  return {
    ordersQuery,
  };
};
