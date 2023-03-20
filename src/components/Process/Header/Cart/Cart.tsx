import React, { useContext } from "react";
import CartItem from "./CartItem";
import { ProcessContext } from "../../ProcessView";
import { IconModel, IconPlus, IconUpload } from "../../../../config/Icons";
import { IProcess } from "../../../../interface/Interface";

interface Props {}

const Cart: React.FC<Props> = () => {
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
    <div className="flex flex-row flex-wrap gap-5 max-w-full mb-5">
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
          process={process}
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
