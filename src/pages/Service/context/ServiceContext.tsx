import React, { createContext, useContext, useState } from "react";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { Outlet } from "react-router-dom";
import { GeneralServiceProps } from "../hooks/useService";
import { ProcessContext } from "@/pages/Projects/context/ProcessContext";

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
  const { process } = useContext(ProcessContext);

  return (
    <ServiceContext.Provider value={{ service: process.service }}>
      <Outlet />
    </ServiceContext.Provider>
  );
};
