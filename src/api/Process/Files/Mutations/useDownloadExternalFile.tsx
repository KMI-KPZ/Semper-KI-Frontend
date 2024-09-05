import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";

const useDownloadExternalFile = () => {
  const downloadExternalFile = async (path: string) =>
    authorizedCustomAxios
      .get(path, { responseType: "blob" })
      .then((response) => {
        logger("useDownloadExternalFile | downloadExternalFile ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDownloadExternalFile | downloadExternalFile ❌ |", error);
      });

  return useMutation<Blob, Error, string>({
    mutationFn: downloadExternalFile,
    onSuccess: () => {},
  });
};

export default useDownloadExternalFile;
