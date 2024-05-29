import React, { PropsWithChildren } from "react";
import { Process } from "@/api/Process/Querys/useGetProcess";

interface ProcessContextProviderProps {
  process: Process;
}

export interface ProcessContextProps {
  process: Process;
}

export const ProcessContext = React.createContext<ProcessContextProps>({
  process: {
    client: "",
    contractor: "",
    createdWhen: new Date(),
    processDetails: { amount: 1 },
    files: [],
    messages: [],
    processID: "",
    serviceDetails: undefined,
    serviceStatus: 0,
    processStatus: 0,
    updatedWhen: new Date(),
    serviceType: 0,
    accessedWhen: new Date(),
    processStatusButtons: [],
  },
});

const ProcessContextProvider: React.FC<
  PropsWithChildren<ProcessContextProviderProps>
> = (props) => {
  const { process, children } = props;
  return (
    <ProcessContext.Provider value={{ process }}>
      {children}
    </ProcessContext.Provider>
  );
};

export default ProcessContextProvider;
