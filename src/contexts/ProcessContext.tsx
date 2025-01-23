import React, { PropsWithChildren, useState } from "react";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { FilterItemProps } from "@/api/Filter/Querys/useGetFilters";

interface ProcessContextProviderProps {
  process: Process;
  filters: FilterItemProps[];
}

export interface ProcessContextProps {
  process: Process;
  filters: FilterItemProps[];
  setFilters: React.Dispatch<React.SetStateAction<FilterItemProps[]>>;
  editFilters: FilterItemProps[];
  setEditFilters: React.Dispatch<React.SetStateAction<FilterItemProps[]>>;
  loadedFilter: FilterItemProps[];
}

export const ProcessContext = React.createContext<ProcessContextProps>({
  process: {} as Process,
  filters: [],
  setFilters: () => {},
  editFilters: [],
  setEditFilters: () => {},
  loadedFilter: [],
});

const ProcessContextProvider: React.FC<
  PropsWithChildren<ProcessContextProviderProps>
> = (props) => {
  const { process, children, filters: loadedFilter } = props;

  const [filters, setFilters] = useState<FilterItemProps[]>(loadedFilter);
  const [editFilters, setEditFilters] =
    useState<FilterItemProps[]>(loadedFilter);

  return (
    <ProcessContext.Provider
      value={{
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
