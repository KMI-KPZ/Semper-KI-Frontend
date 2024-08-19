import { OntoNode } from "@/api/Resources/Ontology/Querys/useGetOntoNodes";
import useGetOrgaNodeNeighbors from "@/api/Resources/Organization/Querys/useGetOrgaNodeNeighbors";
import useGetOrgaNodes from "@/api/Resources/Organization/Querys/useGetOrgaNodes";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import {
  AppLoadingSuspense,
  LoadingAnimation,
  LoadingSuspense,
} from "@component-library/index";
import React, { PropsWithChildren, createContext } from "react";
import { useTranslation } from "react-i18next";
import { Outlet } from "react-router-dom";

interface OntoPrinterContextProviderProps {}

export type OntoPrinterContext = {
  allPrinters: OntoNode[];
  ownPrinters: OntoNode[];
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
  const ontoPrinters = useGetOrgaNodes("printer");
  const { user } = useAuthorizedUser();
  const orgaPrinter = useGetOrgaNodeNeighbors({
    nodeID: user.organization === undefined ? "" : user.organization,
    nodeType: "printer",
  });

  if (
    ontoPrinters.isFetched &&
    ontoPrinters.data !== undefined &&
    orgaPrinter.isFetched &&
    orgaPrinter.data !== undefined
  )
    return (
      <OntoPrinterContext.Provider
        value={{
          allPrinters: ontoPrinters.data as OntoNode[],
          ownPrinters: orgaPrinter.data as OntoNode[],
        }}
      >
        {children}
        <Outlet />
      </OntoPrinterContext.Provider>
    );

  return <LoadingAnimation />;
};

export default OntoPrinterContextProvider;
