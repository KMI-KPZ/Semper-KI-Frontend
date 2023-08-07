import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { ServiceProps } from "../Service";
import { useOrder } from "@/pages/OrderRoutes/hooks/useOrder";
import { useParams } from "react-router-dom";

interface ReturnProps {
  getService: () => ServiceProps | undefined;
}

export enum ServiceType {
  "MANUFACTURING",
  "MODELING",
  "ASSEMBLY",
}

const useService = (): ReturnProps => {
  const { orderQuery } = useOrder();
  const { subOrderID } = useParams();
  const getService = (): ServiceProps | undefined => {
    const subOrder = orderQuery.data?.subOrders.find(
      (subOrder) => subOrder.id === subOrderID
    );
    return subOrder?.service;
  };

  return { getService };
};

export default useService;
