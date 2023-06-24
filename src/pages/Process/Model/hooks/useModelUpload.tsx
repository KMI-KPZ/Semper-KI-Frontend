import customAxios from "@/hooks/useCustomAxios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { IModel } from "..";

interface ReturnProps {
  uploadModels: UseMutationResult<IModel[], Error, File[], unknown>;
}

const useModelUpload = (): ReturnProps => {
  const uploadModels = useMutation<IModel[], Error, File[]>({
    mutationFn: async (files: File[]) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append(file.name, file);
      });
      const apiUrl = `${
        import.meta.env.VITE_HTTP_API_URL
      }/public/uploadModels/`;
      return customAxios
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
