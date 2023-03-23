import React, { useState } from "react";
import { IModel } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  uploadModels(files: File[]): void;
  loading: boolean;
  error: boolean;
  models: IModel[];
}

const useModelUpload = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [models, setModels] = useState<IModel[]>([]);

  const uploadModels = (files: File[]) => {
    const formData = new FormData();
    files.forEach((file) => {
      formData.append(file.name, file);
    });
    setLoading(true);
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/uploadModels/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log("useModelUpload| uploadModels Successful", res.data);
        setModels(res.data.models);
        setLoading(false);
      })
      .catch((error) => {
        console.log("useModelUpload| uploadModels error", error);
        setLoading(false);
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
  };

  return { models, error, loading, uploadModels };
};

export default useModelUpload;
