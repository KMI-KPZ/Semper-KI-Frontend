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
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

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
    <div className="flex flex-row w-full justify-between gap-5 mb-5">
      <div className="flex flex-row flex-wrap gap-5 2xl:w-4/5 w-full">
        <CartItem
          active={processState.activeItemIndex === -1}
          icon={<CloudUploadIcon fontSize="large" />}
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
          icon={<AddIcon fontSize="large" />}
          title={t("Process.Header.Cart.CartItem.new")}
          onClickCard={addNewItem}
          isItem={false}
        />
      </div>
      <div className="hidden md:flex flex-row items-start justify-end w-fit">
        <CartItem
          active={false}
          icon={<ShoppingCartIcon fontSize="large" />}
          title={t("Process.Header.Cart.CartItem.cart")}
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
