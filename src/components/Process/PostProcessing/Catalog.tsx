import React, { useState } from "react";
import { IPostProcessing } from "../../../interface/Interface";
import PopUp from "../../PopUp/PopUp";
import ItemCard from "./ItemCard";
import ItemView from "./ItemView";

interface Props<Item> {
  grid: boolean;
  items: Item[];
  selectItem(item: Item): void;
}

interface State<Item> {
  popUp: boolean;
  itemOpen: Item | undefined;
}

const Catalog = <Item extends IPostProcessing>(props: Props<Item>) => {
  const { items, selectItem, grid } = props;
  const [state, setState] = useState<State<Item>>({
    popUp: false,
    itemOpen: undefined,
  });
  const { itemOpen, popUp } = state;
  const openItemView = (item: Item) => {
    setState((prevState) => ({ ...prevState, popUp: true, itemOpen: item }));
  };
  const closeItemView = () => {
    setState((prevState) => ({
      ...prevState,
      popUp: false,
      itemOpen: undefined,
    }));
  };

  return (
    <div
      className={`flex gap-y-5 ${
        grid === true
          ? "flex-row flex-wrap justify-between"
          : "flex-col flex-nowrap "
      }`}
    >
      {items.length > 0 ? (
        <>
          {items.map((item: Item, index: number) => (
            <ItemCard
              grid={grid}
              item={item}
              openItemView={openItemView}
              selectItem={selectItem}
              key={index}
            />
          ))}
          <PopUp
            open={popUp === true && itemOpen !== undefined}
            onOutsideClick={closeItemView}
          >
            {itemOpen !== undefined ? (
              <ItemView
                closeItemView={closeItemView}
                item={itemOpen}
                selectItem={selectItem}
              />
            ) : null}
          </PopUp>
        </>
      ) : (
        "nichts gefunden"
      )}
    </div>
  );
};

export default Catalog;
