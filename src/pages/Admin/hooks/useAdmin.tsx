import useCustomAxios from "@/hooks/useCustomAxios";
import { User } from "@/hooks/useUser";
import { IOrder } from "@/pages/Orders/hooks/useOrders";
import { IMaterial } from "@/pages/Process/Material";
import { IModel } from "@/pages/Process/Model";
import { useState } from "react";

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
  const { axiosCustom } = useCustomAxios();

  const loadData = () => {
    axiosCustom
      .get(`${import.meta.env.VITE_HTTP_API_URL}/admin/getData/`)
      .then((res) => {
        console.log("useAdmin | loadData ✅ |", res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log("useAdmin | loadData ❌ |", error);
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
