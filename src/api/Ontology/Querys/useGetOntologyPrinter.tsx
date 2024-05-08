import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ExistingOntoPrinter } from "@/pages/Resources/types/types";

const useGetOntologyPrinter = (printerID?: string) => {
  const queryClient = useQueryClient();
  const getOntoPrinter = async () =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/onto/getPrinter/`, {
        printerID,
      })
      .then((response) => {
        const responseData = response.data;
        const printer: ExistingOntoPrinter = responseData.map(
          (printer: any): ExistingOntoPrinter => ({
            ...printer,
            type: "existing",
          })
        );

        logger("useGetOntologyPrinter | getOntoPrinter ✅ |", response);
        return printer;
      });

  return useQuery<ExistingOntoPrinter, Error>({
    queryKey: ["onto", "printer", printerID],
    queryFn: getOntoPrinter,
    enabled: printerID !== undefined && printerID !== "",
  });
};

export default useGetOntologyPrinter;
