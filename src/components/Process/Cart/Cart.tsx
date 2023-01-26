import React, { useContext } from "react";
import CartItem from "./CartItem";
import "./Cart.scss";
import { IconUpload, IconPlus, IconModel } from "../../../config/Icons";
import { useNavigate } from "react-router-dom";
import { IProcess } from "../../../interface/Interface";
import { IProcessContext, ProcessContext } from "../ProcessView";

interface Props {}

const Cart: React.FC<Props> = ({}) => {
  const navigate = useNavigate();
  const { processState, createEmptryProcess, selectProcess } =
    useContext(ProcessContext);

  const addNewItem = () => {
    createEmptryProcess();
  };

  const navigateToUpload = () => {
    selectProcess(-1);
  };

  const selectItem = (index: number) => {
    selectProcess(index);
  };

  return (
    <div className="process-cart">
      <CartItem
        active={processState.activeProcessList.includes(-1)}
        icon={IconUpload}
        title="Upload"
        onClickCard={navigateToUpload}
        isItem={false}
      />
      {processState.processList.map((process: IProcess, index: number) => (
        <CartItem
          key={index}
          index={index}
          active={processState.activeProcessList.includes(index)}
          icon={IconModel}
          title={
            process.title === undefined ? `Item ${index + 1}` : process.title
          }
          onClickCard={selectItem}
          isItem
        />
      ))}
      <CartItem
        active={false}
        icon={IconPlus}
        title="Neu"
        onClickCard={addNewItem}
        isItem={false}
      />
    </div>
  );
};

export default Cart;
