import { getCustomAxios } from "@/hooks/useCustomAxios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import logger from "@/hooks/useLogger";

interface Props {
  processID: string;
  fileName: string;
}
interface State {
  processID: string;
  fileName: string;
  load: boolean;
}

interface ReturnProps {
  processFileQuery: UseQueryResult<any, Error>;
}

const useProcessFile = (props: Props): ReturnProps => {
  const { fileName, processID } = props;

  const processFileQuery = useQuery<any, Error>({
    queryKey: ["Process", "file", processID, fileName],
    queryFn: async () =>
      getCustomAxios()
        .post(
          `${process.env.VITE_HTTP_API_URL}/public/getFileFromProcess/`,
          { id: processID, filename: fileName },
          { responseType: "blob" }
        )
        .then((response) => {
          logger("useProcessFiles | ProcessFileQuery ✅ | ", fileName);
          return response.data;
        }),
    enabled: false,
  });

  return { processFileQuery };
};

export default useProcessFile;
