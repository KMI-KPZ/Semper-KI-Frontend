import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { IFilterItem } from "../Filter";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const ProcessFilterMultiSelection: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
  const options: string[] =
    filterItem.question.values !== null && filterItem.question.values.length > 0
      ? filterItem.question.values
      : ["default"];
  const [values, setValues] = useState<string[]>([]);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const allChecked = options.length === values.length;

  useEffect(() => {
    setFilterItem({
      ...filterItem,
      answer: {
        unit: null,
        value: values,
      },
    });
  }, [values]);

  useEffect(() => {
    if (dropdown === false) setSearch("");
  }, [dropdown]);

  const handleSelectOption = (value: string) => {
    toggleValue(value);
  };

  const handleOnClickTag = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    value: string
  ) => {
    e.preventDefault();
    toggleValue(value);
  };

  const toggleValue = (value: string) => {
    setValues((prevState) =>
      prevState.includes(value)
        ? [...prevState.filter((_value) => _value !== value)]
        : [...prevState, value]
    );
  };

  const toggleAllValues = () => {
    setValues(allChecked ? [] : options);
  };

  const toggleDropdown = (value?: boolean) => {
    setDropdown((prevState) => (value === undefined ? !prevState : value));
  };

  const handleOnChangeSearchInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(e.currentTarget.value);
  };

  return (
    <div className="f-input-multiselect">
      <div className="f-input-multiselect-dropdown">
        <input
          className="f-input-multiselect"
          value={search}
          type="search"
          onChange={handleOnChangeSearchInput}
          onFocus={() => setDropdown(true)}
          placeholder="Suche..."
        />

        {dropdown === true ? (
          <div className="f-input-multiselect-options">
            <div
              className="f-input-multiselect-option unselectable"
              onClick={(e) => toggleAllValues()}
            >
              <input
                type="checkbox"
                checked={allChecked}
                onChange={(e) => toggleAllValues()}
                onClick={(e) => toggleAllValues()}
              />
              {allChecked ? "Alle Abwählen" : "Alle Wählen"}
            </div>
            {options
              .filter((name) =>
                name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
              )
              .map((name, index) => (
                <div
                  className="f-input-multiselect-option unselectable"
                  onClick={(e) => handleSelectOption(name)}
                  key={index}
                >
                  <input
                    type="checkbox"
                    checked={values.includes(name)}
                    onChange={(e) => handleSelectOption(name)}
                    onClick={(e) => handleSelectOption(name)}
                  />
                  {name}
                </div>
              ))}
            <div
              className={`f-input-multiselect-option ${
                dropdown === true ? "expanded" : null
              }`}
              onClick={() => toggleDropdown()}
            >
              <ExpandMoreIcon />
            </div>
          </div>
        ) : null}
      </div>
      <div className="f-input-multiselect-tags">
        {values.map((value, index) => (
          <div
            key={index}
            className="f-input-multiselect-tag"
            onClick={(e) => handleOnClickTag(e, value)}
          >
            {value}
            <CloseIcon />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProcessFilterMultiSelection;
