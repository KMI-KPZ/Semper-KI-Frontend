import { ManufacturingServiceProps } from "@/api/Service/Querys/useGetServices";
import { PropsWithChildren, createContext } from "react";

type ManufacturingGroupContextType = {
  groupID: number;
  group: ManufacturingServiceProps;
  prevGroups: {}[];
  nextGroups: {}[];
};

export const ManufacturingGroupContext =
  createContext<ManufacturingGroupContextType>({
    groupID: 0,
    group: {} as ManufacturingServiceProps,
    prevGroups: [],
    nextGroups: [],
  });

interface DefinedProcessContextProviderProps {
  groupID: number;
  group: ManufacturingServiceProps;
  allGroups: ManufacturingServiceProps[];
}

export const ManufacturingGroupContextProvider: React.FC<
  PropsWithChildren<DefinedProcessContextProviderProps>
> = (props) => {
  const { groupID, children, group, allGroups } = props;

  const prevGroups: {}[] = allGroups.slice(0, groupID).map(() => ({}));
  const nextGroups: {}[] = allGroups.slice(groupID + 1).map(() => ({}));

  return (
    <ManufacturingGroupContext.Provider
      value={{ groupID, group, prevGroups, nextGroups }}
    >
      {children}
    </ManufacturingGroupContext.Provider>
  );
};
