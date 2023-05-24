import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import CartItem from "./components/item";
import { IProcessItem, ProcessContext } from "../..";
import { getModelURI } from "@/services/utils";

interface Props {}

const Cart: React.FC<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    processState,
    createEmpytProcessItem,
    selectProcessItem: selectProcess,
  } = useContext(ProcessContext);

  const addNewItem = () => {
    createEmpytProcessItem();
    navigate("/process/model");
  };

  // const navigateToUpload = () => {
  //   selectProcess(-1);
  // };

  const selectItem = (index: number) => {
    selectProcess(index);
  };

  return (
    <div className="mb-5 flex w-full flex-row justify-between gap-5">
      <div className="flex w-full flex-row flex-wrap gap-5 2xl:w-4/5">
        {/* <CartItem
          active={processState.activeItemIndex === -1}
          icon={<CloudUploadIcon fontSize="large" />}
          title={t("Process.Header.Cart.CartItem.upload")}
          onClickCard={navigateToUpload}
          isItem={false}
        /> */}
        {processState.items.map((processItem: IProcessItem, index: number) => (
          <CartItem
            key={index}
            process={processItem}
            index={index}
            active={processState.activeItemIndex === index}
            icon={
              processItem.model !== undefined ? (
                <img
                  className="h-8 w-8 object-cover"
                  src={getModelURI(processItem.model)}
                />
              ) : (
                <img
                  //TODO
                  // src={IconModel}
                  alt="icon"
                  className="h-8 w-8 object-cover"
                />
              )
            }
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
      <div className="hidden w-fit flex-row items-start justify-end md:flex">
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
