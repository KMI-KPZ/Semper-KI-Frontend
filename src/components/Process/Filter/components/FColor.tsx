import React, { useEffect, useState } from "react";
import { IFilterItem } from "../Interface";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

interface State {
  text: string;
}

const FColor: React.FC<Props> = ({ filterItem, setFilterItem }) => {
  const [state, setState] = useState<State>({ text: "" });

  useEffect(() => {
    setFilterItem({
      ...filterItem,
      answer:
        state.text === ""
          ? null
          : {
              unit: null,
              value: state.text,
            },
    });
  }, [state]);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text: string = e.target.value;
    setState({
      text,
    });
  };
  return (
    <input
      type="color"
      className="f-input-color"
      onChange={handleChangeInput}
      value={state.text}
    />
  );
};

export default FColor;
