import { useState } from "react";
import { IFilterItem } from "../components/Process/Filter/Interface";
import { IMaterial, IModel, IPostProcessing } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  data: IProcessData;
  loadAllData(filters: IFilterItem[]): void;
  loadModelData(filters: IFilterItem[]): void;
  loadMaterialData(filters: IFilterItem[]): void;
  loadPostProcessingData(filters: IFilterItem[]): void;
}

export interface IProcessData {
  filters: IFilterItem[];
  models: IModel[];
  materials: IMaterial[];
  postProcessing: IPostProcessing[];
}

const useProcessData = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const [data, setData] = useState<IProcessData>({
    filters: [],
    models: [],
    materials: [],
    postProcessing: [],
  });

  const loadAllData = (filters: IFilterItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_HTTP_API_URL}/public/getProcessData/`, {
        filters,
      })
      .then((res) => {
        console.log("useProcessData | loadAllData ✅ |", res.data);
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useProcessData | loadAllData ❌ |", error);
      });
    return data;
  };

  const loadModelData = (filters: IFilterItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_HTTP_API_URL}/public/getModels/`, {
        filters,
      })
      .then((res) => {
        console.log("useProcessData | loadModelData ✅ |", res.data);
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useProcessData | loadModelData ❌ |", error);
      });
    return data;
  };

  const loadMaterialData = (filters: IFilterItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_HTTP_API_URL}/public/getMaterials/`, {
        filters,
      })
      .then((res) => {
        console.log("useProcessData | loadMaterialData ✅ |", res.data);
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useProcessData | loadMaterialData ❌ |", error);
      });
    return data;
  };

  const loadPostProcessingData = (filters: IFilterItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_HTTP_API_URL}/public/getPostProcessing/`, {
        filters,
      })
      .then((res) => {
        console.log("useProcessData | loadPostProcessingData ✅ |", res.data);
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useProcessData | loadPostProcessingData ❌ |", error);
      });
    return data;
  };

  return {
    data,
    loadAllData,
    loadMaterialData,
    loadModelData,
    loadPostProcessingData,
  };
};

export default useProcessData;
