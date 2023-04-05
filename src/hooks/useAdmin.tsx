import { useState } from "react";
import {
  IMaterial,
  IModel,
  IOrder,
  IProcedure,
  IUser,
} from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  data: IAdminData;
  loadData(): void;
  clearData(): void;
}

export interface IAdminData {
  users: IUser[];
  models: IModel[];
  materials: IMaterial[];
  procedures: IProcedure[];
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
    procedures: [],
  });
  const { axiosCustom } = useCustomAxios();

  const loadData = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_HTTP_API_URL}/admin/getData/`)
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
      procedures: [],
    });
  };

  return { data, loadData, clearData };
};

export default useAdmin;
