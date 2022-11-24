import "./ShoppingCart.scss";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { ShoppingCartAddButton } from "./ShoppingCartAddButton";
import { Process, ProcessState } from "../../../interface/Interface";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  state: ProcessState;
  deleteProcess: (id: number) => void;
  addProcess: (process: Process) => void;
  selectProcess: (id: number) => void;
  setProgressState: (progressStateIndex: number) => void;
  setShoppingCardItemExpanded: (processId: number, expanded: boolean) => void;
}

export const ShoppingCart = ({
  state,
  addProcess,
  deleteProcess,
  selectProcess,
  setProgressState,
  setShoppingCardItemExpanded,
}: Props) => {
  const navigate = useNavigate();

  const addShoppingCartItem = () => {
    addProcess({ processId: state.nextID });
    selectProcess(state.nextID);
    setProgressState(0);
    navigate("/Process/Model/Catalog");
  };

  const deleteShoppingCartItem = (index: number) => {
    deleteProcess(index);
  };

  return (
    <div className="ShoppingCart-Box">
      {state.processList.map((process: Process, index: number) => (
        <ShoppingCartItem
          setShoppingCardItemExpanded={setShoppingCardItemExpanded}
          expanded={state.activeProcessList.includes(process.processId)}
          setProgressState={setProgressState}
          key={index}
          deleteShoppingCartItem={deleteShoppingCartItem}
          process={process}
          isActiveProcess={process.processId === state.activeProcess}
          selectProcess={selectProcess}
        />
      ))}
      <ShoppingCartAddButton addShoppingCartItem={addShoppingCartItem} />
    </div>
  );
};
