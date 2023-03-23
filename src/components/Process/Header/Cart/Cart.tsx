import React, { useContext } from "react";
import CartItem from "./CartItem";
import { ProcessContext } from "../../ProcessView";
import { IconModel, IconPlus, IconUpload } from "../../../../config/Icons";
import { IProcessItem } from "../../../../interface/Interface";

interface Props {}

const Cart: React.FC<Props> = () => {
  const {
    processState,
    createProcessItem,
    selectProcessItem: selectProcess,
  } = useContext(ProcessContext);

  const addNewItem = () => {
    createProcessItem();
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
        active={processState.activeItemIndex === -1}
        icon={IconUpload}
        title="Upload"
        onClickCard={navigateToUpload}
        isItem={false}
      />
      {processState.items.map((processItem: IProcessItem, index: number) => (
        <CartItem
          key={index}
          process={processItem}
          index={index}
          active={processState.activeItemIndex === index}
          icon={IconModel}
          title={
            processItem.title === undefined
              ? `Item ${index + 1}`
              : processItem.title
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
