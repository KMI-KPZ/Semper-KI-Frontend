import React, { useContext } from "react";
import CartItem from "./CartItem";
import { ProcessContext } from "../../ProcessView";
import {
  IconModel,
  IconPlus,
  IconUpload,
  IconDashboard,
  IconDocument,
} from "../../../../constants/Icons";
import { IProcessItem } from "../../../../interface/Interface";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {}

const Cart: React.FC<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    processState,
    createProcessItem,
    selectProcessItem: selectProcess,
  } = useContext(ProcessContext);

  const addNewItem = () => {
    createProcessItem();
    navigate("/process/model");
  };

  const navigateToUpload = () => {
    selectProcess(-1);
  };

  const selectItem = (index: number) => {
    selectProcess(index);
  };

  return (
    <div className="flex flex-col 2xl:flex-row w-full justify-between 2xl:gap-5 gap-10 2xl:mb-5 mb-10">
      <div className="flex flex-row flex-wrap gap-5 2xl:w-4/5 w-full">
        <CartItem
          active={processState.activeItemIndex === -1}
          icon={IconUpload}
          title={t("Process.Header.Cart.CartItem.upload")}
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
                ? `${t("Process.Header.Cart.CartItem.item")} ${index + 1}`
                : processItem.title
            }
            onClickCard={selectItem}
            isItem
          />
        ))}
        <CartItem
          active={false}
          icon={IconPlus}
          title={t("Process.Header.Cart.CartItem.new")}
          onClickCard={addNewItem}
          isItem={false}
        />
      </div>
      <div className="flex flex-col justify-start items-center 2xl:w-1/5 w-full">
        <CartItem
          active={false}
          icon={IconDocument}
          title="Übersicht"
          onClickCard={() => {
            navigate("/cart");
          }}
          isItem={false}
        />
      </div>
    </div>
  );
};

export default Cart;
