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
import { SubOrderProps } from "@/pages/Order/SubOrder/hooks/useSubOrder";

interface ReturnProps {
  orderQuery: UseQueryResult<OrderProps, Error>;
  createOrder: UseMutationResult<string, Error, void, unknown>;
  updateOrder: UseMutationResult<string, Error, UpdateOrderProps, unknown>;
  deleteOrder: UseMutationResult<string, Error, string, unknown>;
}

export interface OrderProps {
  orderID: string;
  client: string;
  created: Date;
  updated: Date;
  state: OrderState;
  subOrders: SubOrderProps[];
  details: OrderDetailsProps;
}

export interface OrderDetailsProps {
  title?: string;
}

export interface UpdateOrderProps {
  changes?: OrderChangesProps;
  deletions?: OrderDeletionsProps;
}

export interface OrderChangesProps {
  state?: OrderState;
  details?: OrderDetailsProps;
}
export interface OrderDeletionsProps {
  details?: { title?: "" };
  state?: "";
}

export enum OrderState {
  "DRAFT" = 0,
  "SERVICE_COMPLICATIONS" = 100,
  "SERVICE_READY" = 200,
  "CONTRACTOR_SELECTED" = 300,
  "VERIFYING" = 400,
  "VERIFIED" = 500,
  "REQUESTED" = 600,
  "CLARIFICATION" = 700,
  "CONTRACTOR_REJECTED" = 800,
  "CONTRACTOR_CONFIRMED" = 900,
  "CLIENT_REJECTED" = 1000,
  "CLIENT_CONFIRMED" = 1100,
  "PRODUCTION" = 1200,
  "DELIVERY" = 1300,
  "COMPLETED" = 1400,
}

export const useOrder = (): ReturnProps => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { orderID } = useParams();

  const orderQuery = useQuery<OrderProps, Error>(
    ["order", orderID],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getOrder/${orderID}/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useOrdes | getOrder ✅ |", response.data);
          const order = {
            ...response.data,
            created: new Date(response.data.created),
            updated: new Date(response.data.updated),
          };
          return order;
        });
    },
    {
      enabled: orderID !== undefined,
      onError: (error) => {
        logger("useOrder | getOrder ❌ |", error);
        navigate("/orders");
      },
    }
  );

  const createOrder = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createOrder/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useOrder | createOrder ✅ |", response.data);
          return response.data.orderID;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["flatOrders"]);
      navigate(`/order/${data}`);
    },
  });

  const updateOrder = useMutation<string, Error, UpdateOrderProps>({
    mutationFn: async ({ changes = {}, deletions = {} }) => {
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateOrder/`, {
          orderID,
          changes,
          deletions,
        })
        .then((res) => {
          logger("useOrder | updateOrder ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["order", orderID]);
      queryClient.invalidateQueries(["flatOrders"]);
    },
  });

  const deleteOrder = useMutation<string, Error, string>({
    mutationFn: async (orderID: string) => {
      return getCustomAxios()
        .delete(
          `${process.env.VITE_HTTP_API_URL}/public/deleteOrder/${orderID}/`
        )
        .then((res) => {
          logger("useOrder | deleteOrder ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, orderID, context) {
      queryClient.invalidateQueries(["order", orderID]);
      queryClient.invalidateQueries(["flatOrders"]);
    },
  });

  return {
    createOrder,
    orderQuery,
    updateOrder,
    deleteOrder,
  };
};
