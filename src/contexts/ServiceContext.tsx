import { Process } from "@/api/Process/Querys/useGetProcess";
import { ServiceProps } from "@/api/Service/Querys/useGetServices";
import { PropsWithChildren, createContext } from "react";

type ServiceContextType = {
  serviceDetails: ServiceProps;
};

export const ServiceContext = createContext<ServiceContextType>({
  serviceDetails: {},
});

interface ServiceContextProviderProps {
  process: Process;
}

export const ServiceContextProvider: React.FC<
  PropsWithChildren<ServiceContextProviderProps>
> = (props) => {
  const { process, children } = props;

  return (
    <ServiceContext.Provider value={{ serviceDetails: process.serviceDetails }}>
      {children}
    </ServiceContext.Provider>
  );
};
