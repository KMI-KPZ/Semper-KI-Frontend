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
  uploadModels(files: File[]): void;
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
      .post(`${process.env.REACT_APP_API_URL}/public/getProcessData/`, {
        filters,
      })
      .then((res) => {
        console.log("useProcessData| loadAllData Successful", res.data);
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useProcessData| loadAllData error", error);
      });
    return data;
  };

  const loadModelData = (filters: IFilterItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/getModels/`, {
        filters,
      })
      .then((res) => {
        console.log("useProcessData| loadModelData Successful", res.data);
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useProcessData| loadModelData error", error);
      });
    return data;
  };

  const loadMaterialData = (filters: IFilterItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/getMaterials/`, {
        filters,
      })
      .then((res) => {
        console.log("useProcessData| loadMaterialData Successful", res.data);
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useProcessData| loadMaterialData error", error);
      });
    return data;
  };

  const loadPostProcessingData = (filters: IFilterItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/getPostProcessing/`, {
        filters,
      })
      .then((res) => {
        console.log(
          "useProcessData| loadPostProcessingData Successful",
          res.data
        );
        setData((prevState) => ({ ...prevState, ...res.data }));
      })
      .catch((error) => {
        console.log("useProcessData| loadPostProcessingData error", error);
      });
    return data;
  };

  const uploadModels = (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(file.name, file);
    });
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/uploadFiles/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        console.log("useProcessData| uploadData Successful", response);
      })
      .catch((error) => {
        console.log("useProcessData| uploadData error", error);
      });
  };

  return {
    data,
    loadAllData,
    loadMaterialData,
    loadModelData,
    loadPostProcessingData,
    uploadModels,
  };
};

export default useProcessData;
