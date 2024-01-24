import { customAxios } from "@/api/customAxios";
import { OntoPrinterContext } from "@/contexts/OntoPrinterContextProvider";
import { OntoPrinterFlat } from "@/pages/Resources/types/types";
import { useContext } from "react";

interface useOntoPrintersReturnProps {
  allPrinters: OntoPrinterFlat[];
  ownPrinters: OntoPrinterFlat[];
}

const useOntoPrinters = (): useOntoPrintersReturnProps => {
  const { allPrinters, ownPrinters } = useContext(OntoPrinterContext);

  return { allPrinters, ownPrinters };
};

export default useOntoPrinters;
