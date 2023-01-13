import React, { useEffect, useState } from "react";
import { IFilterItem } from "../Interface";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

interface State {
  value: string;
}

const FNumber: React.FC<Props> = ({ filterItem, setFilterItem }) => {
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
      className="f-input-number"
      onChange={handleChangeInput}
      value={state.value}
    />
  );
};

export default FNumber;
