import React, { useState } from "react";
import { IFilterAnswer } from "../components/Process/Filter/Interface";
import { IModel } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  getModels(filters: IFilterAnswer[]): IModel[];
}

const useFilter = () => {
  const { axiosCustom } = useCustomAxios();
  const [models, setModels] = useState<IModel[]>([]);

  const getModels = (filters: IFilterAnswer[]): IModel[] => {
    axiosCustom
      .get("http://localhost:8000/getModels/", { params: { filters } })
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
