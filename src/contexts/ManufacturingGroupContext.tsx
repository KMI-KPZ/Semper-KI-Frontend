import { ManufacturingServiceProps } from "@/api/Service/Querys/useGetServices";
import { PropsWithChildren, createContext } from "react";

type ManufacturingGroupContextType = {
  groupID: number;
  group: ManufacturingServiceProps;
};

export const ManufacturingGroupContext =
  createContext<ManufacturingGroupContextType>({
    groupID: 0,
    group: {} as ManufacturingServiceProps,
  });

interface DefinedProcessContextProviderProps {
  groupID: number;
  group: ManufacturingServiceProps;
}

export const ManufacturingGroupContextProvider: React.FC<
  PropsWithChildren<DefinedProcessContextProviderProps>
> = (props) => {
  const { groupID, children, group } = props;

  // logger("ManufacturingGroupContextProvider", process, children);

  return (
    <ManufacturingGroupContext.Provider value={{ groupID, group }}>
      {children}
    </ManufacturingGroupContext.Provider>
  );
};
