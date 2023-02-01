import React, { useState } from "react";
import {
  IFilterAnswer,
  IFilterItem,
} from "../components/Process/Filter/Interface";
import { IMaterial, IModel } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  loadData(filters: IFilterItem[]): any;
  data: IProcessResponse;
}

export interface IProcessResponse {
  filters: IFilterItem[];
  models: IModel[];
  materials: IMaterial[];
}

const useFilter = () => {
  const { axiosCustom } = useCustomAxios();
  const [data, setData] = useState<IProcessResponse>({
    filters: [],
    models: [],
    materials: [],
  });

  const loadData = (filters: IFilterItem[]): IProcessResponse => {
    console.log("Load Data");
    console.table(filters);
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/getData/`, {
        filters: filters,
      })
      .then((res) => {
        console.log("get Data", res.data);
        // setData(res.data);
      })
      .catch((error) => {
        console.log("get Data error", error);
      });
    return data;
  };

  return { loadData, data };
};

export default useFilter;
