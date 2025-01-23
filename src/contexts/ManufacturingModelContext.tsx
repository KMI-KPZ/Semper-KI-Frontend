import { ProcessModel } from "@/api/Process/Querys/useGetProcess";
import { PropsWithChildren, createContext } from "react";

type ManufacturingModelContextType = {
  model: ProcessModel;
};

export const ManufacturingModelContext =
  createContext<ManufacturingModelContextType>({
    model: {} as ProcessModel,
  });

interface DefinedProcessContextProviderProps {
  model: ProcessModel;
}

export const ManufacturingModelContextProvider: React.FC<
  PropsWithChildren<DefinedProcessContextProviderProps>
> = (props) => {
  const { model, children } = props;

  // logger("ManufacturingModelContextProvider", process, children);

  return (
    <ManufacturingModelContext.Provider value={{ model }}>
      {children}
    </ManufacturingModelContext.Provider>
  );
};
