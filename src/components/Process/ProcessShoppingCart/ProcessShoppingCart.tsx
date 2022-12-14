import { ShoppingCartItem } from "./ProcessShoppingCartItem";
import { ShoppingCartAddButton } from "./ProcessShoppingCartAddButton";
import { IProcess, IProcessState } from "../../../interface/Interface";
import React from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  state: IProcessState;
  deleteProcess: (id: number) => void;
  addProcess: (process: IProcess) => void;
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
    <ul className="process-box vertical shoppingcart">
      {state.processList.map((process: IProcess, index: number) => (
        <React.Fragment key={index}>
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
          <li className="shoppingcart-item">
            <hr className="divider large" />
          </li>
        </React.Fragment>
      ))}

      <ShoppingCartAddButton addShoppingCartItem={addShoppingCartItem} />
    </ul>
  );
};
