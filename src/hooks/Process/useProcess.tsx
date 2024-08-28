import { Process } from "@/api/Process/Querys/useGetProcess";
import { ProcessContext } from "@/contexts/ProcessContext";
import { FilterItemProps } from "@/pages/Process/components/Service/Filter/MaufacturingFilter/Filter";
import { useContext } from "react";

interface ReturnProps {
  process: Process;
  filters: FilterItemProps[];
  setFilters: React.Dispatch<React.SetStateAction<FilterItemProps[]>>;
}

const useProcess = (): ReturnProps => {
  const { process, filters, setFilters } = useContext(ProcessContext);

  return {
    process,
    filters,
    setFilters,
  };
};

export default useProcess;
