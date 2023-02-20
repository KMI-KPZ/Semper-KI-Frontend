import React, { useEffect, useState } from "react";
import { IFilterItem } from "../Interface";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

interface State {
  text: string;
}

const FTextArea: React.FC<Props> = (props) => {
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

  const handleChangeInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text: string = e.target.value;
    setState({ text });
  };
  return (
    <textarea
      className="f-input-textarea"
      onChange={handleChangeInput}
      value={state.text}
    />
  );
};

export default FTextArea;
