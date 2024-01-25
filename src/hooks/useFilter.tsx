import useFilterMutations from "@/api/Filter/useFilterMutations";
import useFilterQuerys from "@/api/Filter/useFilterQuerys";
import { authorizedCustomAxios } from "@/api/customAxios";
import { FilterItemProps } from "@/pages/Service/Manufacturing/Filter/Filter";
import {
  DefinedUseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { AxiosResponse } from "axios";

interface useFilterReturnProps {
  filtersQuery: DefinedUseQueryResult<FilterItemProps[], Error>;
  updateFilterMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    FilterItemProps[],
    unknown
  >;
}

const useFilter = (): useFilterReturnProps => {
  const { filtersQuery } = useFilterQuerys();
  const { updateFilterMutation } = useFilterMutations();

  return { filtersQuery, updateFilterMutation };
};

export default useFilter;
