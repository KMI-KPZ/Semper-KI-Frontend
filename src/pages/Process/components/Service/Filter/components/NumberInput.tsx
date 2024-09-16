import React, { useEffect, useState } from "react";
import { FilterItemProps } from "@/api/Filter/Querys/useGetFilters";

interface Props {
  filterItem: FilterItemProps;
  setFilterItem(filterItem: FilterItemProps): void;
}

interface State {
  value: string;
}

const ProcessFilterNumberInput: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
  const [state, setState] = useState<State>({ value: "" });

  useEffect(() => {
    setFilterItem({
      ...filterItem,
      answer:
        state.value === ""
          ? null
          : {
              unit: null,
              value: state.value,
            },
    });
  }, [state]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setState({
      value,
    });
  };
  return (
    <input
      type="number"
      className="rounded-xl border-2 px-5 py-3 text-center"
      onChange={handleChangeInput}
      value={state.value}
    />
  );
};

export default ProcessFilterNumberInput;
