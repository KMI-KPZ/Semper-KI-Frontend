import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddIcon from "@mui/icons-material/Add";
import ProcessHeaderCartItem from "./components/Item";
import { IProcessItem } from "../../types";
import { getModelURI } from "@/services/utils";
import IconModel from "@icons/Model.svg";
import { ServiceManufacturingContext } from "../../Manufacturing";
import { Heading } from "@component-library/Typography";
import { Button } from "@component-library/Button";

interface Props {}

const ProcessHeaderCart: React.FC<Props> = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    processState,
    createEmpytProcessItem,
    selectProcessItem: selectProcess,
  } = useContext(ServiceManufacturingContext);

  const addNewItem = () => {
    createEmpytProcessItem();
    navigate("model");
  };

  // const navigateToUpload = () => {
  //   selectProcess(-1);
  // };

  const selectItem = (index: number) => {
    selectProcess(index);
  };

  return (
    <div className="flex min-w-fit max-w-sm flex-col justify-start gap-5 bg-white p-5">
      <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
        <Heading variant="h2">
          {t("Process.Header.Cart.CartItem.title")}
        </Heading>
        <Button
          to=".."
          title={t("Process.Header.Cart.CartItem.button.overview")}
        />
      </div>
      <div className="flex w-full flex-col flex-wrap gap-5">
        {processState.items.map((processItem: IProcessItem, index: number) => (
          <ProcessHeaderCartItem
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
                  src={IconModel}
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
        <ProcessHeaderCartItem
          active={false}
          icon={<AddIcon fontSize="large" />}
          title={t("Process.Header.Cart.CartItem.new")}
          onClickCard={addNewItem}
          isItem={false}
        />
      </div>
    </div>
  );
};

export default ProcessHeaderCart;
