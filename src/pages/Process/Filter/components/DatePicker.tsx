import React, { useEffect, useState } from "react";
import { IFilterItem } from "../Filter";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

interface State {
  dd: string;
  mm: string;
  yyyy: string;
}

const getTodayDate = (): { dd: string; mm: string; yyyy: string } => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = String(today.getFullYear());
  return { dd, mm, yyyy };
};

const ProcessFilterDatePicker: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
  const [state, setState] = useState<State>(getTodayDate());

  useEffect(() => {
    const date: string = getDate();
    setFilterItem({
      ...filterItem,
      answer:
        date === ""
          ? null
          : {
              unit: null,
              value: date,
            },
    });
  }, [state]);

  const handleChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date: string = e.target.value;
    setState({
      dd: date.substring(8),
      mm: date.substring(5, 7),
      yyyy: date.substring(0, 4),
    });
  };

  const getDate = (): string => {
    return state.dd !== "" && state.mm !== "" && state.yyyy !== ""
      ? state.yyyy + "-" + state.mm + "-" + state.dd
      : "";
  };

  return (
    <input
      type="date"
      className="f-input-date"
      onChange={handleChangeDate}
      value={getDate()}
    />
  );
};

export default ProcessFilterDatePicker;
