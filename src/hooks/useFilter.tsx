import { ProcessContext } from "@/contexts/ProcessContext";
import { FilterItemProps } from "@/pages/Process/components/Service/Filter/Filter";
import _FilterItems from "@/hooks/Data/FilterQuestions.json";
import { useContext } from "react";

const hydrateInternFilter = (
  filter: FilterItemProps[],
  guideAnswers: FilterItemProps[]
): FilterItemProps[] => {
  let filteritems: FilterItemProps[] = filter;
  filteritems.forEach((filterItem: FilterItemProps, index: number) => {
    guideAnswers.forEach((guideItem: FilterItemProps) => {
      if (filterItem.id === guideItem.id) {
        filteritems[index].answer = guideItem.answer;
        filteritems[index].isChecked = guideItem.isChecked;
        filteritems[index].isOpen = guideItem.isOpen;
      }
    });
  });
  return filteritems;
};

interface useFilterReturnProps {
  activeFilters: FilterItemProps[];
  editFilters: FilterItemProps[];
  differenzCount: number;
  applyFilters: () => void;
  resetFilters: () => void;
  cancelFilters: () => void;
  hydrateFilter: (guideAnswers: FilterItemProps[]) => void;
  setEditFilters: React.Dispatch<React.SetStateAction<FilterItemProps[]>>;
}

const useFilter = (): useFilterReturnProps => {
  const { filters, setFilters, editFilters, setEditFilters, loadedFilter } =
    useContext(ProcessContext);

  const applyFilters = () => {
    setFilters(editFilters);
  };
  const cancelFilters = () => {
    setEditFilters(filters);
  };
  const resetFilters = () => {
    setFilters(loadedFilter);
    setEditFilters(loadedFilter);
  };

  const hydrateFilter = (guideAnswers: FilterItemProps[]) => {
    setFilters((prev) => hydrateInternFilter(prev, guideAnswers));
  };

  const differenzCount: number = editFilters.filter(
    (filterItem: FilterItemProps) => {
      const compareItem: FilterItemProps | undefined = filters.find(
        (item) => item.id === filterItem.id
      );
      if (compareItem === undefined) return true;
      return (
        filterItem.isChecked !== compareItem.isChecked ||
        filterItem.answer !== filterItem.answer ||
        (filterItem.answer !== null &&
          compareItem.answer !== null &&
          (filterItem.answer.value !== compareItem.answer.value ||
            filterItem.answer.unit !== compareItem.answer.unit))
      );
    }
  ).length;

  return {
    activeFilters: filters,
    editFilters,
    differenzCount,
    setEditFilters,
    applyFilters,
    resetFilters,
    hydrateFilter,
    cancelFilters,
  };
};

export default useFilter;
