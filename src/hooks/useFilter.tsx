import useUpdateFilters from "@/api/Filter/Mutations/useUpdateFilters";
import useGetFilters from "@/api/Filter/Querys/useGetFilters";
import { FilterItemProps } from "@/pages/Process/components/Service/Filter/MaufacturingFilter/Filter";
import {
  DefinedUseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";

interface useFilterReturnProps {
  filtersQuery: DefinedUseQueryResult<FilterItemProps[], Error>;
  updateFilters: UseMutationResult<void, Error, FilterItemProps[]>;
}

const useFilter = (): useFilterReturnProps => {
  const filtersQuery = useGetFilters();
  const updateFilters = useUpdateFilters();

  return { filtersQuery, updateFilters };
};

export default useFilter;
