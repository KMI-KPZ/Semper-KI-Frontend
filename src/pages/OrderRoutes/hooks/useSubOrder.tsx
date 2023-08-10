import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { OrderState, useOrder } from "./useOrder";
import {
  ServiceManufacturingProps,
  UpdateServiceManufacturingProps,
} from "../Service/Manufacturing/types";
import { ServiceModellingProps } from "../Service/Modelling/Modelling";
import { useNavigate, useParams } from "react-router-dom";
import { GeneralServiceProps } from "../Service/Service";

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
}

export interface SubOrderProps {
  chat: ChatMessageProps[];
  contractor: string;
  created: Date;
  details: any;
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
  service?: UpdateServiceManufacturingProps;
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
      queryClient.invalidateQueries(["orders"]);
      queryClient.invalidateQueries(["order", orderID]);
    },
  });

  const updateSubOrder = useMutation<string, Error, UpdateSubOrderProps>({
    mutationFn: async (props: UpdateSubOrderProps) => {
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateSubOrder/`, {
          orderID,
          subOrderID,
          ...props,
        })
        .then((res) => {
          logger("useSubOrder | updateSubOrder ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, orderID, context) {
      queryClient.invalidateQueries(["order", orderID]);
      queryClient.invalidateQueries(["orders"]);
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
      queryClient.invalidateQueries(["orders"]);
    },
  });

  return { createSubOrder, deleteSubOrder, updateSubOrder, getCurrentSubOrder };
};

export default useSubOrder;
