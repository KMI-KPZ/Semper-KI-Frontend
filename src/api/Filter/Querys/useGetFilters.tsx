import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";

export type FilterCategoryType =
  | "SELECTED"
  | "GENERAL"
  | "MODEL"
  | "MATERIAL"
  | "PROCEEDING"
  | "MANUFACTURER"
  | "POSTPROCESSING"
  | "ADDITIVE"
  | "TEST";

export type FilterType =
  | "TEXT"
  | "TEXTAREA"
  | "NUMBER"
  | "DATE"
  | "COLOR"
  | "SLIDER"
  | "SLIDERSELECTION"
  | "SELECTION"
  | "MULTISELECTION";

export interface FilterItemProps {
  id: number;
  isChecked: boolean;
  isOpen: boolean;
  question: FilterQuestionProps;
  answer: FilterAnswerProps | null;
}

export interface FilterQuestionProps {
  isSelectable: boolean;
  title: string;
  category: FilterCategoryType;
  type: FilterType;
  values: FilterSelectionValue[] | null;
  range: number[] | null;
  units: string[] | string | null;
}

export interface FilterSelectionValue {
  name: string;
  id: string;
}

export interface FilterAnswerProps {
  unit: string | null;
  value:
    | string
    | string[]
    | number
    | RangeMinMaxProps
    | FilterSelectionValue
    | FilterSelectionValue[];
}

export interface RangeMinMaxProps {
  min: number;
  max: number;
}

const useGetFilters = () => {
  const getFilters = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/filters/get/`
      )
      .then((response) => {
        const responseData = response.data;
        const filters: FilterItemProps[] = responseData.filters;

        logger("useGetFilters | getFilters ✅ |", response);
        return filters;
      });

  return useQuery<FilterItemProps[], Error>({
    queryKey: ["filters"],
    queryFn: getFilters,
  });
};

export default useGetFilters;
