import React, { useEffect, useState } from "react";
import { FilterItemProps } from "../Filter";

interface Props {
  filterItem: FilterItemProps;
  setFilterItem(filterItem: FilterItemProps): void;
}

interface State {
  text: string;
}

const ProcessFilterTextInput: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
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
      type="text"
      className="rounded-xl border-2 px-5 py-3"
      onChange={handleChangeInput}
      value={state.text}
    />
  );
};

export default ProcessFilterTextInput;
