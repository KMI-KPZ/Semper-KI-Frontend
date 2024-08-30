import React, { PropsWithChildren, useState } from "react";
import { Process } from "@/api/Process/Querys/useGetProcess";
import { FilterItemProps } from "@/pages/Process/components/Service/Filter/Filter";

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
  process: {
    client: "",
    contractor: "",
    createdWhen: new Date(),
    processDetails: { amount: 1 },
    files: [],
    messages: {},
    processID: "",
    serviceDetails: undefined,
    serviceStatus: 0,
    processStatus: 0,
    updatedWhen: new Date(),
    serviceType: 0,
    accessedWhen: new Date(),
    processStatusButtons: [],
  },
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
