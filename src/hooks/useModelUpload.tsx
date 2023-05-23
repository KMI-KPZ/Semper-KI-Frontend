import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IModel } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  uploadModels: UseMutationResult<IModel[], Error, File[], unknown>;
}

const useModelUpload = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const uploadModels = useMutation<IModel[], Error, File[]>({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(file.name, file);
      });
      const apiUrl = `${
        import.meta.env.VITE_HTTP_API_URL
      }/public/uploadModels/`;
      return axiosCustom
        .post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          console.log("useModelUpload | uploadModels ✅ |", response.data);
          return response.data.models;
        });
    },
  });

  return { uploadModels };
};

export default useModelUpload;
