import { ManufactoringProcessProps } from "@/api/Process/Querys/useGetProcess";
import { PropsWithChildren, createContext } from "react";

type ManufacturingProcessContextType = {
  process: ManufactoringProcessProps;
};

export const ManufacturingProcessContext =
  createContext<ManufacturingProcessContextType>({
    process: {} as ManufactoringProcessProps,
  });

interface DefinedProcessContextProviderProps {
  process: ManufactoringProcessProps;
}

export const ManufacturingProcessContextProvider: React.FC<
  PropsWithChildren<DefinedProcessContextProviderProps>
> = (props) => {
  const { process, children } = props;

  // logger("ManufacturingProcessContextProvider", process, children);

  return (
    <ManufacturingProcessContext.Provider value={{ process }}>
      {children}
    </ManufacturingProcessContext.Provider>
  );
};
