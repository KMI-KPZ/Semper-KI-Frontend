import React, { useEffect, useState } from "react";
import { FilterItemProps } from "../Filter";

interface Props {
  filterItem: FilterItemProps;
  setFilterItem(filterItem: FilterItemProps): void;
}

interface State {
  text: string;
}

const ProcessFilterColorPicker: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
  const [state, setState] = useState<State>({ text: "#000000" });

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

export default ProcessFilterColorPicker;
