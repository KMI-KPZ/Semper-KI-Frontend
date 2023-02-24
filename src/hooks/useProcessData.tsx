import React, { useEffect, useState } from "react";
import { IFilterItem } from "../components/Process/Filter/Interface";
import { IMaterial, IModel } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  data: IProcessData;
  loadData(filters: IFilterItem[]): any;
}

export interface IProcessData {
  filters: IFilterItem[];
  models: IModel[];
  materials: IMaterial[];
}

const useProcessData = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const [data, setData] = useState<IProcessData>({
    filters: [],
    models: [],
    materials: [],
  });

  const loadData = (filters: IFilterItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/getData/`, {
        filters,
      })
      .then((res) => {
        console.log("useData| loadData Successful", res.data);
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useData| loadData error", error);
      });
    return data;
  };

  return { loadData, data };
};

export default useProcessData;
