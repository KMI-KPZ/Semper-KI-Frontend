import { FilterItemProps } from "@/api/Filter/Querys/useGetFilters";
import { ProcessContext } from "@/contexts/ProcessContext";
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

// const filter: FilterItemProps[] = [
//   {
//     id: 0,
//     isChecked: false,
//     isOpen: false,
//     question: {
//       isSelectable: true,
//       title: "materialCategory",
//       category: "MATERIAL",
//       type: "SELECTION",
//       range: null,
//       values: [
//         {
//           name: "Composites",
//           id: "H51iCEXM_cRjj78tHM2UAa8l0FD7Pte9W7g2aXxW43Y",
//         },
//         {
//           name: "Photopolymers",
//           id: "hLNCuE-IQp4FqREcZrTZJJawttj_AFvSqLTCSnsuC10",
//         },
//         {
//           name: "Thermoplastics",
//           id: "4SWbpwwYDQdy3cYKLLM3rSMG2p3ZjhYpKtXK1Zv2Tmo",
//         },
//         {
//           name: "Plastics",
//           id: "E4YtW7CbzFOAPcO-DCsStiSZ5Qdn_IrDArpJlVqgcUk",
//         },
//         {
//           name: "Metals",
//           id: "nfgVHvb3BZ2Y9DL_i8eHDNyTBQrui7oT-iv8LgU7g5g",
//         },
//       ],
//       units: null,
//     },
//     answer: null,
//   },
//   {
//     id: 1,
//     isChecked: false,
//     isOpen: false,
//     question: {
//       isSelectable: true,
//       title: "tensileStrength",
//       category: "MATERIAL",
//       type: "SLIDER",
//       range: [1, 2000], //vlt dynamisch aus der Datenbank hohlen von allen materialien die grad möglich sind
//       values: null,
//       units: "MPa",
//     },
//     answer: null,
//   },
//   {
//     id: 2,
//     isChecked: false,
//     isOpen: false,
//     question: {
//       isSelectable: true,
//       title: "density",
//       category: "MATERIAL",
//       type: "SLIDER",
//       range: [0.8, 20], //vlt auch aus DB
//       values: null,
//       units: "g/cm³",
//     },
//     answer: null,
//   },

//   {
//     id: 3,
//     isChecked: false,
//     isOpen: false,
//     question: {
//       isSelectable: true,
//       title: "elongationBreak",
//       category: "MATERIAL",
//       type: "SLIDER",
//       range: [1, 800], //vlt auch aus DB
//       values: null,
//       units: "%",
//     },
//     answer: null,
//   },

//   {
//     id: 4,
//     isChecked: false,
//     isOpen: false,
//     question: {
//       isSelectable: true,
//       title: "certificates",
//       category: "MATERIAL",
//       type: "SELECTION",
//       range: null,
//       values: [
//         { id: "bliblablug", name: "ISO 9001" },
//         { id: "bliblablug", name: "ISO 9002" },
//         { id: "bliblablug", name: "ISO 9003" },
//       ], //kp hat chati vorgeschlagen
//       units: null,
//     },
//     answer: null,
//   },
// ];

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
