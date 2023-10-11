import React, { createContext, useState } from "react";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { Outlet } from "react-router-dom";
import { GeneralServiceProps } from "../hooks/useService";

type ServiceContextType = {
  service: GeneralServiceProps | undefined;
};

export const ServiceContext = createContext<ServiceContextType>({
  service: undefined,
});

interface ServiceContextProviderProps {}

export const ServiceContextProvider: React.FC<ServiceContextProviderProps> = (
  props
) => {
  const {} = props;
  const { getCurrentProcess } = useProcess();

  return (
    <ServiceContext.Provider value={{ service: getCurrentProcess()?.service }}>
      <Outlet />
    </ServiceContext.Provider>
  );
};
