import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { NewOntoPrinter, OntoPrinter } from "@/pages/Resources/types/types";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface useOntologyPrinterMutationsReturnProps {
  addPrinterMutation: UseMutationResult<
    string,
    Error,
    AddPrinterMutationProps,
    unknown
  >;
}

interface AddPrinterMutationProps {
  organizationID: string;
  printer: OntoPrinter | NewOntoPrinter;
}

const useOntologyPrinterMutations =
  (): useOntologyPrinterMutationsReturnProps => {
    const queryClient = useQueryClient();

    const addPrinterMutation = useMutation<
      string,
      Error,
      AddPrinterMutationProps
    >({
      mutationFn: async ({ organizationID, printer }) => {
        const url = `${process.env.VITE_HTTP_API_URL}/public/orga/addPrinter/`;
        return authorizedCustomAxios
          .post(url, {
            organization: organizationID,
            printer,
          })
          .then((response) => {
            logger(
              "useOntologyPrinterMutations | addPrinterMutation ✅ |",
              response.data
            );
            return response.data;
          });
      },
      onSuccess() {
        queryClient.invalidateQueries(["onto", "printers"]);
      },
    });

    return { addPrinterMutation };
  };

export default useOntologyPrinterMutations;
