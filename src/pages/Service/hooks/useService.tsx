import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { GeneralServiceProps, ServiceProps } from "../Service";
import { useParams } from "react-router-dom";
import { useOrder } from "@/pages/Order/hooks/useOrder";

interface ReturnProps {
  getService: () => GeneralServiceProps | undefined;
}

export enum ServiceType {
  "UNDEFINED",
  "MANUFACTURING",
  "MODELING",
}

const useService = (): ReturnProps => {
  const { orderQuery } = useOrder();
  const { subOrderID } = useParams();
  const getService = (): GeneralServiceProps | undefined => {
    const subOrder = orderQuery.data?.subOrders.find(
      (subOrder) => subOrder.subOrderID === subOrderID
    );
    return subOrder?.service;
  };

  return { getService };
};

export default useService;
