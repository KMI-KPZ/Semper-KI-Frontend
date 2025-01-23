import React from "react";
import {
  FilterItemProps,
  FilterSelectionValue,
} from "@/api/Filter/Querys/useGetFilters";
import { useTranslation } from "react-i18next";
import useSearch from "@/hooks/useSearch";
import { Container, Search } from "@component-library/index";

interface Props {
  filterItem: FilterItemProps;
  setFilterItem(filterItem: FilterItemProps): void;
}

const ProcessFilterMultiSelection: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { filterItem, setFilterItem } = props;
  const options: FilterSelectionValue[] =
    filterItem.question.values !== null && filterItem.question.values.length > 0
      ? filterItem.question.values
      : [];
  const values: string[] = (filterItem.answer?.value as string[]) || [];
  const allChecked = options.length === values.length;
  const { filterDataBySearchInput, handleSearchInputChange } =
    useSearch<string>();

  const setParentFilterItem = (values: string[]) => {
    setFilterItem({
      ...filterItem,
      answer: {
        unit: null,
        value: values,
      },
    });
  };

  const handleSelectOption = (value: string) => {
    toggleValue(value);
  };

  const toggleValue = (value: string) => {
    setParentFilterItem(
      values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value]
    );
  };

  const toggleAllValues = () => {
    setParentFilterItem(allChecked ? [] : options.map((option) => option.id));
  };

  return (
    <Container width="full" direction="col" gap={3} className="pb-3">
      <Search handleSearchInputChange={handleSearchInputChange} />
      <Container
        className="rounded-md border-2 p-5"
        direction="row"
        wrap="wrap"
      >
        <label
          className={`flex flex-row items-center 
            justify-start gap-3 rounded-full border-2
              px-3 py-1 duration-300 
             ${
               allChecked
                 ? "border-blue-900 bg-blue-100 hover:cursor-pointer hover:border-gray-200"
                 : "hover:ultramarinblau border-gray-200 hover:cursor-pointer"
             }`}
          onClick={toggleAllValues}
        >
          {/* <input
            type="checkbox"
            className="h-4 w-4"
            checked={allChecked}
            onChange={toggleAllValues}
          /> */}
          {/* {allChecked
            ? t(
                "Process.components.Service.Filter.components.MultiSelection.button.unCheckAll"
              )
            : t(
                "Process.components.Service.Filter.components.MultiSelection.button.checkAll"
              )} */}
          {t(
            "Process.components.Service.Filter.components.MultiSelection.button.all"
          )}
        </label>
        {options
          .filter((value) => filterDataBySearchInput(value.name))
          .map((value, index) => (
            <label
              className={`flex flex-row items-center 
              justify-start gap-3 rounded-full border-2
                px-3 py-1 duration-300 
               ${
                 values.includes(value.name)
                   ? "border-blue-900 bg-blue-100 hover:cursor-pointer hover:border-gray-200"
                   : "hover:ultramarinblau border-gray-200 hover:cursor-pointer"
               }`}
              key={index}
              onClick={() => handleSelectOption(value.id)}
            >
              {/* <input
                value={name}
                type="checkbox"
                className="h-4 w-4"
                checked={values.includes(name)}
                onChange={handleSelectOption}
              /> */}
              {value.name}
            </label>
          ))}
      </Container>
    </Container>
  );
};

export default ProcessFilterMultiSelection;
