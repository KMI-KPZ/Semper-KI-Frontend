import React, { useState } from "react";
import {
  IFilterAnswer,
  IFilterItem,
} from "../components/Process/Filter/Interface";
import { IMaterial, IModel } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  loadData(filters: IFilterItem[], dataType: string): any;
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

  const loadData = (
    filters: IFilterItem[],
    dataType: string
  ): IProcessResponse => {
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/getData/`, {
        filters,
        dataType,
      })
      .then((res) => {
        console.log("useFilter| loadData Successful", res.data);
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useFilter| loadData error", error);
      });
    return data;
  };

  return { loadData, data };
};

export default useFilter;
