import React from "react";
import { IPostProcessing } from "../../../interface/Interface";

interface Props<Item> {
  item: Item;
  grid: boolean;
  selectItem(item: Item): void;
  openItemView(item: Item): void;
}

const ItemCard = <Item extends IPostProcessing>(props: Props<Item>) => {
  const { grid, item, openItemView, selectItem } = props;

  const handleOnClickSelect = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    selectItem(item);
  };

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    openItemView(item);
  };

  return (
    <div
      className={`flex justify-start items-center bg-white overflow-hidden hover:cursor-pointer hover:bg-gray-300 ${
        grid === true
          ? "flex-col basis-[48%] sm:basis-[32%] md:basis-[23.5%]"
          : "w-full flex-row"
      }`}
      onClick={handleOnClickCard}
    >
      <img
        className={`object-cover ${
          grid === true
            ? "min-w-full max-w-[200%] h-44"
            : "w-44 max-h-44 min-h-full "
        }`}
        src={item.URI}
        alt="Model"
      />
      <div
        className={`flex justify-around md:justify-between items-center p-3 gap-2  h-full ${
          grid === true ? "flex-col " : "w-full flex-row gap-5"
        }`}
      >
        <h2 className="text-2xl font-bold">{item.title}</h2>
        <div
          className={`text-white flex flex-row justify-center items-center  p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer ${
            grid === true ? "w-full" : "w-fit"
          }`}
          onClick={handleOnClickSelect}
        >
          Auswählen
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
