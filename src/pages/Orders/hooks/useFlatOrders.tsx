import { getCustomAxios } from "@/hooks/useCustomAxios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import logger from "@/hooks/useLogger";
import { OrderDetailsProps, OrderState } from "@/pages/Order/hooks/useOrder";
import { t } from "i18next";

interface ReturnProps {
  ordersQuery: UseQueryResult<FlatOrderProps[], Error>;
}

export interface FlatOrderProps {
  orderID: string;
  client: string;
  created: Date;
  updated: Date;
  details: OrderDetailsProps;
  state: OrderState;
  subOrderCount: number;
}

export const isFlatOrder = (order: any): order is FlatOrderProps => {
  return (
    "orderID" in order &&
    order.orderID !== undefined &&
    typeof order.orderID === "string" &&
    "client" in order &&
    order.client !== undefined &&
    typeof order.client === "string" &&
    "created" in order &&
    order.created !== undefined &&
    typeof order.created === "string" &&
    "updated" in order &&
    order.updated !== undefined &&
    typeof order.updated === "string" &&
    "details" in order &&
    order.details !== undefined &&
    "state" in order &&
    order.state !== undefined &&
    "subOrderCount" in order &&
    order.subOrderCount !== undefined &&
    typeof order.subOrderCount === "number"
  );
};

export const useFlatOrders = (): ReturnProps => {
  const flatOrdersQuery = useQuery<FlatOrderProps[], Error>(
    ["flatOrders"],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getFlatOrders/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useFlatOrders | flatOrdersQuery ✅ |", response.data);
          return response.data.orders.map((order: any, index: number) => {
            if (isFlatOrder(order)) {
              return {
                ...order,
                created: new Date(order.created),
                updated: new Date(order.updated),
              };
            } else {
              logger("useFlatOrders | flatOrdersQuery ❌ |", order);
              return {
                orderID: order.orderID === undefined ? "error" : order.orderID,
                client: "error",
                created: new Date(),
                updated: new Date(),
                details: {
                  title: "error",
                  description: "error",
                  items: [],
                },
                state: "error",
                subOrderCount: 0,
              };
            }
          });
        });
    }
  );

  return {
    ordersQuery: flatOrdersQuery,
  };
};
