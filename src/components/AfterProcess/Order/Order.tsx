import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { IProcessItem } from "../../../interface/Interface";
import OrderItem from "./OrderItem";
import Button from "../../General/Button";
import { useQueryClient } from "@tanstack/react-query";

interface Props {}

interface State {
  error: boolean;
  showError: boolean;
}

const Order: React.FC<Props> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const [state, setState] = useState<State>({ error: false, showError: false });
  const { error, showError } = state;
  const { cart, error: cartError, status, uploadCart } = useCart();
  const queryClient = useQueryClient();

  const checkProcessOK = (processList: IProcessItem[]): boolean => {
    return (
      processList.filter(
        (item: IProcessItem) =>
          item.model !== undefined &&
          item.material !== undefined &&
          item.postProcessings !== undefined
      ).length > 0
    );
  };

  const handleOnClickEdit = () => {
    navigate("/process/model");
  };

  const handleOnClickSendRequest = () => {
    if (checkProcessOK(cart)) navigate("/manufacturer");
    else {
      setState((prevState) => ({ ...prevState, showError: true }));
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, showError: false }));
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

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-center p-2 bg-white w-full">Laden...</h1>
      </div>
    );
  if (status === "error" && cartError !== null)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-center p-2 bg-white w-full">
          Error: {cartError.message}
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <h1 className="text-center p-2 bg-white w-full">Auftrag</h1>
      <section className="flex flex-col gap-5 items-center justify-start w-full">
        {cart.length > 0 ? (
          cart.map((process: IProcessItem, index: number) => (
            <OrderItem
              process={process}
              key={index}
              index={index}
              deleteItem={deleteItem}
            />
          ))
        ) : (
          <h2 className="text-center p-2 bg-white w-full">keine Produkte</h2>
        )}
      </section>
      {showError === true ? (
        <h2 className="text-red-500 text-bold">
          Bitte die makierten Produkte vervollständigen
        </h2>
      ) : null}
      <section className="w-full text-white flex flex-col gap-5 md:flex-row justify-start items-center md:justify-center">
        <Button onClick={handleOnClickEdit}>Bearbeiten</Button>
        <Button active={!error} onClick={handleOnClickSendRequest}>
          Anfragen
        </Button>
        <Button onClick={handleOnClickClear}>Leeren</Button>
      </section>
    </div>
  );
};

export default Order;
