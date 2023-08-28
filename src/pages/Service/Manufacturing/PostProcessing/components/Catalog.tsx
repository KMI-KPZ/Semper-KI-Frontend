import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import ProcessPostProcessingItem from "./Item";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import ProcessPostProcessingCard from "./Card";
import { PostProcessingProps } from "../PostProcessing";
import Modal from "@component-library/Modal";

interface Props<Item> {
  grid: boolean;
  items: Item[];
  checkItem(item: Item): void;
  searchText: string;
}

interface State<Item> {
  modalOpen: boolean;
  itemOpen: Item | undefined;
}

const ProcessPostProcessingCatalog = <Item extends PostProcessingProps>(
  props: Props<Item>
) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { items, checkItem, grid, searchText } = props;
  const [state, setState] = useState<State<Item>>({
    modalOpen: false,
    itemOpen: undefined,
  });
  const { itemOpen, modalOpen } = state;
  const openItemView = (item: Item) => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: true,
      itemOpen: item,
    }));
  };
  const closeItemView = () => {
    setState((prevState) => ({
      ...prevState,
      modalOpen: false,
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

  const handleOnClickCard = () => {
    navigate("../..");
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
              <ProcessPostProcessingCard
                grid={grid}
                item={item}
                openItemView={openItemView}
                checkItem={checkItem}
                key={index}
              />
            ))}
          <div
            className={`bezier flex flex-row items-center justify-center self-center overflow-hidden bg-türkis p-5 text-white transition  duration-300 hover:cursor-pointer hover:bg-grau-400 ${
              grid === true
                ? "h-fit basis-[48%] sm:basis-[32%] md:basis-[23.5%]"
                : "w-full "
            }`}
            onClick={handleOnClickCard}
          >
            {t("Process.PostProcessing.Catalog.button")}
            <NavigateNextIcon fontSize="large" />
          </div>
          <Modal
            open={modalOpen === true && itemOpen !== undefined}
            closeModal={closeItemView}
          >
            {itemOpen !== undefined ? (
              <ProcessPostProcessingItem
                closeItemView={closeItemView}
                item={itemOpen}
                checkItem={checkItem}
              />
            ) : null}
          </Modal>
        </>
      ) : (
        t("Process.PostProcessing.Catalog.empty")
      )}
    </div>
  );
};

export default ProcessPostProcessingCatalog;
