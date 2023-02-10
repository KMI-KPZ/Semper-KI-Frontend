import React, { useState } from "react";
import { EUserType } from "../interface/enums";
import {
  IMaterial,
  IModel,
  IOrder,
  IProcedure,
  IUser,
} from "../interface/Interface";
import {
  TestMaterialList,
  TestModelList,
  TestOrderList,
  TestProcessList,
  TestUser,
} from "../services/TestData";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  data: IAdminData;
  loadData(): void;
}

export interface IAdminData {
  users: IUser[];
  models: IModel[];
  materials: IMaterial[];
  procedures: IProcedure[];
  printers: any[];
  orders: IOrder[];
}

const useAdmin = (userType: EUserType): ReturnProps => {
  const [data, setData] = useState<IAdminData>({
    users: TestUser,
    models: TestModelList,
    materials: TestMaterialList,
    orders: TestOrderList,
    printers: [],
    procedures: [],
  });
  const { axiosCustom } = useCustomAxios();

  const loadData = () => {
    if (userType === EUserType.admin) {
      axiosCustom
        .get(`${process.env.REACT_APP_API_URL}/admin/getData/`)
        .then((res) => {
          console.log("useAdmin| loadData Successful", res.data);
          setData(res.data);
        })
        .catch((error) => {
          console.log("useAdmin| loadData error", error);
        });
    }
  };

  return { data, loadData };
};

export default useAdmin;
