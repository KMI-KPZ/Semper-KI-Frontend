import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const useGetModelFile = (fileID: string) => {
  const { projectID, processID } = useParams();
  const getModel = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/files/download/file/${projectID}/${processID}/${fileID}/`,
        { responseType: "blob" }
      )
      .then((response) => {
        const data: Blob = response.data;

        logger("useGetModel | getModel ✅ |", response);
        return data;
      });

  return useQuery<Blob, Error>({
    queryKey: ["project", projectID, processID, fileID],
    queryFn: getModel,
  });
};

export default useGetModelFile;
