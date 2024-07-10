import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExistingOntoPrinter } from "@/pages/Resources/types/types";

const useLoadOntologyPrinter = () => {
  const queryClient = useQueryClient();
  const loadPrinter = async (printerURI: string) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/onto/getPrinter/`, {
        printerURI,
      })
      .then((response) => {
        logger("useLoadOntologyPrinter | loadPrinter ✅ |", response);
        const responseData = response.data;
        const printer: ExistingOntoPrinter = responseData.map(
          (printer: any): ExistingOntoPrinter => ({
            ...printer,
            type: "existing",
          })
        );
        return printer;
      });

  return useMutation<ExistingOntoPrinter, Error, string>({
    mutationFn: loadPrinter,
  });
};

export default useLoadOntologyPrinter;
