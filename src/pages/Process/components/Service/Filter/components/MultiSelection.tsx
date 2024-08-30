import React from "react";
import { FilterItemProps } from "../Filter";
import { useTranslation } from "react-i18next";
import useSearch from "@/hooks/useSearch";
import { Search } from "@component-library/index";

interface Props {
  filterItem: FilterItemProps;
  setFilterItem(filterItem: FilterItemProps): void;
}

const ProcessFilterMultiSelection: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { filterItem, setFilterItem } = props;
  const options: string[] =
    filterItem.question.values !== null && filterItem.question.values.length > 0
      ? filterItem.question.values
      : ["default"];
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

  const handleSelectOption = (e: React.ChangeEvent<HTMLInputElement>) => {
    toggleValue(e.currentTarget.value);
  };

  const toggleValue = (value: string) => {
    setParentFilterItem(
      values.includes(value)
        ? values.filter((v) => v !== value)
        : [...values, value]
    );
  };

  const toggleAllValues = () => {
    setParentFilterItem(allChecked ? [] : options);
  };

  return (
    <div className="f-input-multiselect">
      <div className="f-input-multiselect-dropdown">
        <Search handleSearchInputChange={handleSearchInputChange} />
        <div>
          <label className="flex flex-row items-center justify-start gap-3">
            <input
              type="checkbox"
              className="h-4 w-4"
              checked={allChecked}
              onChange={toggleAllValues}
            />
            {allChecked
              ? t(
                  "Service.Manufacturing.Filter.components.MultiSelection.button.unCheckAll"
                )
              : t(
                  "Service.Manufacturing.Filter.components.MultiSelection.button.checkAll"
                )}
          </label>
          {options
            .filter((name) => filterDataBySearchInput(name))
            .map((name, index) => (
              <label
                className="flex flex-row items-center justify-start gap-3"
                key={index}
              >
                <input
                  value={name}
                  type="checkbox"
                  className="h-4 w-4"
                  checked={values.includes(name)}
                  onChange={handleSelectOption}
                />
                {name}
              </label>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProcessFilterMultiSelection;
