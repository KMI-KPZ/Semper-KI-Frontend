import { getCustomAxios } from "@/hooks/useCustomAxios";
import { User } from "@/hooks/useUser/types";
import { useState } from "react";
import logger from "@/hooks/useLogger";
import { SubOrderProps } from "@/pages/OrderRoutes/hooks/useSubOrder";
import { ModelProps } from "@/pages/OrderRoutes/Service/Manufacturing/Model/types";
import { MaterialProps } from "@/pages/OrderRoutes/Service/Manufacturing/Material/Material";

interface ReturnProps {
  data: IAdminData;
  loadData(): void;
  clearData(): void;
}

export interface IAdminData {
  users: User[];
  models: ModelProps[];
  materials: MaterialProps[];
  printers: any[];
  orders: SubOrderProps[];
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
    getCustomAxios()
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
