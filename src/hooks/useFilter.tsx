import React, { useState } from "react";
import {
  IFilterAnswer,
  IFilterItem,
} from "../components/Process/Filter/Interface";
import { IModel } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  getModels(filters: IFilterItem[]): IModel[];
}

const useFilter = () => {
  const { axiosCustom } = useCustomAxios();
  const [models, setModels] = useState<IModel[]>([]);

  const getModels = (filters: IFilterItem[]): IModel[] => {
    axiosCustom
      .post(
        `${process.env.REACT_APP_API_URL}/private/getModels/`,
        JSON.stringify(filters)
      )
      .then((res) => {
        console.log("getModels", res);
        setModels(res.data);
      })
      .catch((error) => {
        console.log("getModels error", error);
      });
    return models;
  };

  return { getModels };
};

export default useFilter;
