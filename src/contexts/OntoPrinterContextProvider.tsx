import useGetFlatOntologyPrinters from "@/api/Ontology/Querys/useGetFlatOntologyPrinters";
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
  const printersQuery = useGetFlatOntologyPrinters();

  if (printersQuery.isFetched && printersQuery.data !== undefined)
    return (
      <OntoPrinterContext.Provider
        value={{
          allPrinters: printersQuery.data,
          ownPrinters: printersQuery.data,
        }}
      >
        {children}
      </OntoPrinterContext.Provider>
    );
  return <AppLoadingSuspense />;
};

export default OntoPrinterContextProvider;
