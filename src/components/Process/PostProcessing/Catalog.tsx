import React, { useState } from "react";
import { IPostProcessing } from "../../../interface/Interface";
import PopUp from "../../PopUp/PopUp";
import ItemCard from "./ItemCard";
import ItemView from "./ItemView";

interface Props<Item> {
  grid: boolean;
  items: Item[];
  checkItem(item: Item): void;
  searchText: string;
}

interface State<Item> {
  popUp: boolean;
  itemOpen: Item | undefined;
}

const Catalog = <Item extends IPostProcessing>(props: Props<Item>) => {
  const { items, checkItem, grid, searchText } = props;
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

  const filterBySearch = (item: Item): boolean => {
    if (searchText === "") {
      return true;
    }
    if (
      item.title.toLocaleLowerCase().includes(searchText) ||
      (item.valueList !== undefined &&
        item.valueList.filter((value) =>
          value.toLocaleLowerCase().includes(searchText)
        ).length > 0) ||
      (item.value !== undefined &&
        item.value.toLocaleLowerCase().includes(searchText))
    )
      return true;
    return false;
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
          {items
            .filter((item) => filterBySearch(item))
            .map((item: Item, index: number) => (
              <ItemCard
                grid={grid}
                item={item}
                openItemView={openItemView}
                checkItem={checkItem}
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
                checkItem={checkItem}
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
