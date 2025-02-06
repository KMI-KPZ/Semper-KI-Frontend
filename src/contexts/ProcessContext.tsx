import React, { PropsWithChildren, useState } from "react";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { FilterItemProps } from "@/api/Filter/Querys/useGetFilters";

interface ProcessContextProviderProps {
  process: Process;
  filters: FilterItemProps[];
  loadGroupID: number | undefined;
  setLoadGroupID(groupID: number): void;
}

export interface ProcessContextProps {
  process: Process;
  filters: FilterItemProps[];
  setFilters: React.Dispatch<React.SetStateAction<FilterItemProps[]>>;
  editFilters: FilterItemProps[];
  setEditFilters: React.Dispatch<React.SetStateAction<FilterItemProps[]>>;
  loadedFilter: FilterItemProps[];
  loadGroupID: number | undefined;
  setLoadGroupID(groupID: number | undefined): void;
}

export const ProcessContext = React.createContext<ProcessContextProps>({
  process: {} as Process,
  filters: [],
  setFilters: () => {},
  editFilters: [],
  setEditFilters: () => {},
  loadedFilter: [],
  loadGroupID: undefined,
  setLoadGroupID: () => {},
});

const ProcessContextProvider: React.FC<
  PropsWithChildren<ProcessContextProviderProps>
> = (props) => {
  const {
    process,
    children,
    filters: loadedFilter,
    loadGroupID,
    setLoadGroupID,
  } = props;

  const [filters, setFilters] = useState<FilterItemProps[]>(loadedFilter);
  const [editFilters, setEditFilters] =
    useState<FilterItemProps[]>(loadedFilter);

  return (
    <ProcessContext.Provider
      value={{
        loadGroupID,
        setLoadGroupID,
        process,
        filters,
        setFilters,
        editFilters,
        setEditFilters,
        loadedFilter,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
};

export default ProcessContextProvider;
