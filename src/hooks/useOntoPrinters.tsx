import { OntoNodePrinter } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { OntoPrinterContext } from "@/contexts/OntoPrinterContextProvider";
import { useContext } from "react";

interface useOntoPrintersReturnProps {
  allPrinters: OntoNodePrinter[];
  ownPrinters: OntoNodePrinter[];
}

const useOntoPrinters = (): useOntoPrintersReturnProps => {
  const { allPrinters, ownPrinters } = useContext(OntoPrinterContext);

  return { allPrinters, ownPrinters };
};

export default useOntoPrinters;
