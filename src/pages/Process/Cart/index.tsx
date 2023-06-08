import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import CartItem from "./components/item";
import { useTranslation } from "react-i18next";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { LoadingSuspense } from "@component-library/Loading";
import { ErrorView } from "@component-library/Error";
import { Button } from "@component-library/Button";
import useCart from "@/hooks/useCart";
import { IProcessItem } from "..";
import { ErrorType } from "@/types/general";
import { Heading } from "@component-library/Typography";

interface Props {}

interface State {
  showError: boolean;
}

const Cart: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    showError: false,
  });
  const { showError } = state;
  const { cartQuery, updateCart } = useCart();
  const { data: cart } = cartQuery;
  const queryClient = useQueryClient();

  const checkCart = (): { errors: ErrorType[]; errorCount: number } => {
    const errorCount = cart.filter(
      (item: IProcessItem) =>
        item.model === undefined ||
        item.material === undefined ||
        item.postProcessings === undefined
    ).length;

    let errors: ErrorType[] = [];
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
    updateCart.mutate([], {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["cart"]);
      },
    });
  };

  const deleteItem = (index: number) => {
    updateCart.mutate(cart.filter((item, _index) => _index !== index));
  };

  return (
    <LoadingSuspense query={cartQuery}>
      <div className="flex w-full flex-col items-center gap-5">
        <Heading variant="h1">{t("AfterProcess.Cart.Cart.header")}</Heading>
        <section className="flex w-full flex-col items-center justify-start gap-5">
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
            <Heading variant="h2">
              {t("AfterProcess.Cart.Cart.noItems")}
            </Heading>
          )}
        </section>
        {showError === true ? (
          <ErrorView
            errors={errors}
            itemName={t("AfterProcess.Cart.Cart.item", { count: errorCount })}
          />
        ) : null}
        <section className="flex w-full flex-col items-center justify-start gap-5 text-white md:flex-row md:justify-center">
          <Button
            onClick={handleOnClickEdit}
            startIcon={<EditIcon />}
            title={t("AfterProcess.Cart.Cart.edit")}
          />
          <Button
            onClick={handleOnClickClear}
            startIcon={<DeleteIcon />}
            title={t("AfterProcess.Cart.Cart.deleteCart")}
          />
          <Button
            active={errors.length === 0}
            onClick={handleOnClickSendRequest}
            endIcon={<ArrowForwardIcon />}
            title={t("AfterProcess.Cart.Cart.request")}
          />
        </section>
      </div>
    </LoadingSuspense>
  );
};

export default Cart;
