import customAxios from "@/hooks/useCustomAxios";
import { User } from "@/hooks/useUser/types";
import { IOrder } from "@/pages/Orders/hooks/useOrders";
import { IMaterial } from "@/pages/Process/Material/Material";
import { IModel } from "@/pages/Process/Model/types";
import { useState } from "react";
import logger from "@/hooks/useLogger";

interface ReturnProps {
  data: IAdminData;
  loadData(): void;
  clearData(): void;
}

export interface IAdminData {
  users: User[];
  models: IModel[];
  materials: IMaterial[];
  printers: any[];
  orders: IOrder[];
}

const useAdmin = (): ReturnProps => {
  const [data, setData] = useState<IAdminData>({
    users: [],
    models: [],
    materials: [],
    orders: [],
    printers: [],
  });

  const loadData = () => {
    customAxios
      .get(`${process.env.VITE_HTTP_API_URL}/admin/getData/`)
      .then((res) => {
        logger("useAdmin | loadData ✅ |", res.data);
        setData(res.data);
      })
      .catch((error) => {
        logger("useAdmin | loadData ❌ |", error);
      });
  };

  const clearData = () => {
    setData({
      users: [],
      models: [],
      materials: [],
      orders: [],
      printers: [],
    });
  };

  return { data, loadData, clearData };
};

export default useAdmin;
