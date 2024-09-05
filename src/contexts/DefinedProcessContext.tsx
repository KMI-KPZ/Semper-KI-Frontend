import { DefinedProcess } from "@/api/Process/Querys/useGetProcess";
import { PropsWithChildren, createContext } from "react";

type DefinedProcessContextType = {
  process: DefinedProcess;
};

export const DefinedProcessContext = createContext<DefinedProcessContextType>({
  process: {} as DefinedProcess,
});

interface DefinedProcessContextProviderProps {
  process: DefinedProcess;
}

export const DefinedProcessContextProvider: React.FC<
  PropsWithChildren<DefinedProcessContextProviderProps>
> = (props) => {
  const { process, children } = props;

  return (
    <DefinedProcessContext.Provider value={{ process }}>
      {children}
      {/* <Outlet /> */}
    </DefinedProcessContext.Provider>
  );
};
