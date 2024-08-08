import useGetOntoNodeNeighbors from "@/api/Resources/Ontology/Querys/useGetOntoNodeNeighbors";
import useGetOntoNodes from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import { OntoPrinter, OntoPrinterFlat } from "@/pages/Resources/types/types";
import { AppLoadingSuspense, LoadingSuspense } from "@component-library/index";
import React, { PropsWithChildren, createContext } from "react";
import { useTranslation } from "react-i18next";

interface OntoPrinterContextProviderProps {}

export type OntoPrinterContext = {
  allPrinters: OntoPrinterFlat[];
  ownPrinters: OntoPrinterFlat[];
};

export const OntoPrinterContext = createContext<OntoPrinterContext>({
  allPrinters: [],
  ownPrinters: [],
});

const OntoPrinterContextProvider: React.FC<
  PropsWithChildren<OntoPrinterContextProviderProps>
> = (props) => {
  const { children } = props;
  const { t } = useTranslation();
  const ontoPrinters = useGetOntoNodes("printer");
  const orgaPrinter = useGetOntoNodeNeighbors({
    nodeID: "",
    nodeType: "printer",
  });

  if (ontoPrinters.isFetched && ontoPrinters.data !== undefined && orgaPrinter.isFetched && orgaPrinter.data !== undefined) {
    return (
      <OntoPrinterContext.Provider
        value={{
          allPrinters: ontoPrinters,
          ownPrinters: orgaPrinter,
        }}
      >
        {children}
      </OntoPrinterContext.Provider>
    );
  return <AppLoadingSuspense />;
};

export default OntoPrinterContextProvider;
