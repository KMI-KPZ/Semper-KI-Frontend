import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { IProcessItem } from "../../../interface/Interface";
import Button from "../../General/Button";
import { useQueryClient } from "@tanstack/react-query";
import CartItem from "./CartItem";
import { useTranslation } from "react-i18next";
import { TError } from "../../../interface/types";
import ErrorView from "../../General/ErrorView";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LoadingSuspense from "../../General/LoadingSuspense";

interface Props {}

interface State {
  showError: boolean;
}

const Order: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    showError: false,
  });
  const { showError } = state;
  const { cart, error: cartError, status, uploadCart } = useCart();
  const queryClient = useQueryClient();

  const checkCart = (): { errors: TError[]; errorCount: number } => {
    const errorCount = cart.filter(
      (item: IProcessItem) =>
        item.model === undefined ||
        item.material === undefined ||
        item.postProcessings === undefined
    ).length;
    let errors: TError[] = [];
    if (cart.length === 0) errors.push("empty");
    if (errorCount > 0 && cart.length > 0) errors.push("incomplete");
    return { errors, errorCount };
  };
  const { errors, errorCount } = checkCart();
  const handleOnClickEdit = () => {
    navigate("/process/model");
  };

  const handleOnClickSendRequest = () => {
    if (errors.length === 0) navigate("/manufacturer");
    else {
      setState((prevState) => ({
        ...prevState,
        showError: true,
      }));
      setTimeout(() => {
        setState((prevState) => ({
          ...prevState,
          showError: false,
        }));
      }, 3000);
    }
  };
  const handleOnClickClear = () => {
    uploadCart.mutate([], {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["cart"]);
      },
    });
  };

  const deleteItem = (index: number) => {
    uploadCart.mutate(cart.filter((item, _index) => _index !== index));
  };

  return (
    <LoadingSuspense error={cartError} status={status}>
      <div className="flex flex-col items-center gap-5 w-full p-5">
        <h1 className="text-center p-2 bg-white w-full">
          {t("AfterProcess.Cart.Cart.header")}
        </h1>
        <section className="flex flex-col gap-5 items-center justify-start w-full">
          {cart.length > 0 ? (
            cart.map((process: IProcessItem, index: number) => (
              <CartItem
                process={process}
                key={index}
                index={index}
                deleteItem={deleteItem}
              />
            ))
          ) : (
            <h2 className="text-center p-2 bg-white w-full">
              {t("AfterProcess.Cart.Cart.noItems")}
            </h2>
          )}
        </section>
        {showError === true ? (
          <ErrorView
            errors={errors}
            itemName={t("AfterProcess.Cart.Cart.item", { count: errorCount })}
          />
        ) : null}
        <section className="w-full text-white flex flex-col gap-5 md:flex-row justify-start items-center md:justify-center">
          <Button onClick={handleOnClickEdit} icon={<EditIcon />}>
            {t("AfterProcess.Cart.Cart.edit")}
          </Button>
          <Button onClick={handleOnClickClear} icon={<DeleteIcon />}>
            {t("AfterProcess.Cart.Cart.deleteCart")}
          </Button>
          <Button
            active={errors.length === 0}
            onClick={handleOnClickSendRequest}
            icon={<ArrowForwardIcon />}
            iconPos="back"
          >
            {t("AfterProcess.Cart.Cart.request")}
          </Button>
        </section>
      </div>
    </LoadingSuspense>
  );
};

export default Order;
