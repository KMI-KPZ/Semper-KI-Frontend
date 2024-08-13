import { OntoNode } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { OntoPrinterContext } from "@/contexts/OntoPrinterContextProvider";
import { useContext } from "react";

interface useOntoPrintersReturnProps {
  allPrinters: OntoNode[];
  ownPrinters: OntoNode[];
}

const useOntoPrinters = (): useOntoPrintersReturnProps => {
  const { allPrinters, ownPrinters } = useContext(OntoPrinterContext);

  return { allPrinters, ownPrinters };
};

export default useOntoPrinters;
