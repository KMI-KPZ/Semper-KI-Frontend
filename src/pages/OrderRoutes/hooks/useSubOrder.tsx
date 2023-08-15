import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { OrderState, useOrder } from "./useOrder";
import { useNavigate, useParams } from "react-router-dom";
import {
  GeneralServiceProps,
  GerneralUpdateServiceProps,
} from "../Service/Service";

interface ReturnProps {
  deleteSubOrder: UseMutationResult<string, Error, string, unknown>;
  createSubOrder: UseMutationResult<string, Error, void, unknown>;
  updateSubOrder: UseMutationResult<
    string,
    Error,
    UpdateSubOrderProps,
    unknown
  >;
  getCurrentSubOrder: () => SubOrderProps | undefined;
  updateSubOrderWithSubOrderID: UseMutationResult<
    string,
    Error,
    {
      subOrderID: string;
      changes: UpdateSubOrderProps;
    },
    unknown
  >;
}

export interface SubOrderDetailsProps {
  title?: string;
}

export interface SubOrderProps {
  chat: ChatMessageProps[];
  contractor: string;
  created: Date;
  details: SubOrderDetailsProps;
  files: string[];
  service: GeneralServiceProps;
  state: OrderState;
  subOrderID: string;
  updated: string;
}

export interface ChatMessageProps {
  userID: string;
  userName: string;
  date: string;
  text: string;
}

export interface UpdateSubOrderProps {
  chat?: ChatMessageProps;
  state?: OrderState;
  files?: File[];
  details?: SubOrderDetailsProps;
  service?: GerneralUpdateServiceProps;
}

const useSubOrder = (): ReturnProps => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { orderQuery } = useOrder();
  const { orderID, subOrderID } = useParams();

  const getCurrentSubOrder = (): SubOrderProps | undefined => {
    return orderQuery.data?.subOrders.find(
      (subOrder) => subOrder.subOrderID === subOrderID
    );
  };

  const createSubOrder = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createSubOrder/${orderID}/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useSubOrder | createSubOrder ✅ |", response.data);
          return response.data.subOrderID;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["flatOrders"]);
      queryClient.invalidateQueries(["order", orderID]);
    },
  });

  const updateSubOrder = useMutation<string, Error, UpdateSubOrderProps>({
    mutationFn: async (props: UpdateSubOrderProps) => {
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateSubOrder/`, {
          orderID,
          subOrderID,
          changes: props,
        })
        .then((res) => {
          logger("useSubOrder | updateSubOrder ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, orderID, context) {
      queryClient.invalidateQueries(["order", orderID]);
      queryClient.invalidateQueries(["flatOrders"]);
    },
  });

  const updateSubOrderWithSubOrderID = useMutation<
    string,
    Error,
    { subOrderID: string; changes: UpdateSubOrderProps }
  >({
    mutationFn: async (props: {
      subOrderID: string;
      changes: UpdateSubOrderProps;
    }) => {
      const { changes, subOrderID } = props;
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateSubOrder/`, {
          orderID,
          subOrderID,
          changes,
        })
        .then((res) => {
          logger("useSubOrder | updateSubOrder ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["order", orderID]);
      queryClient.invalidateQueries(["flatOrders"]);
    },
  });

  const deleteSubOrder = useMutation<string, Error, string>({
    mutationFn: async (subOrderID: string) => {
      return getCustomAxios()
        .delete(
          `${process.env.VITE_HTTP_API_URL}/public/deleteSubOrder/${orderID}/${subOrderID}/`
        )
        .then((res) => {
          logger("useSubOrder | deleteSubOrder ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, subOrderID, context) {
      queryClient.invalidateQueries(["order", orderID]);
      queryClient.invalidateQueries(["flatOrders"]);
    },
  });

  return {
    createSubOrder,
    deleteSubOrder,
    updateSubOrder,
    getCurrentSubOrder,
    updateSubOrderWithSubOrderID,
  };
};

export default useSubOrder;
