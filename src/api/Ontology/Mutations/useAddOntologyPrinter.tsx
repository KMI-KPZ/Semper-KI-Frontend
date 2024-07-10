import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NewOntoPrinter, OntoPrinter } from "@/pages/Resources/types/types";
interface AddPrinterMutationProps {
  organizationID: string;
  printer: OntoPrinter | NewOntoPrinter;
}

const useAddOntologyPrinter = () => {
  const queryClient = useQueryClient();
  const addOntoPrinter = async ({
    organizationID,
    printer,
  }: AddPrinterMutationProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/addOntoPrinter/`, {
        organization: organizationID,
        printer,
      })
      .then((response) => {
        logger("useAddOntologyPrinter | addOntoPrinter ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useAddOntologyPrinter | addOntoPrinter ❌ |", error);
      });

  return useMutation<void, Error, AddPrinterMutationProps>({
    mutationFn: addOntoPrinter,
    onSuccess: () => {
      queryClient.invalidateQueries(["onto", "printers"]);
    },
  });
};

export default useAddOntologyPrinter;
