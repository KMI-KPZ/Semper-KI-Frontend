import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { IProcessItem } from "../../interface/Interface";
import OrderItem from "./OrderItem";

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
  const { cart, loadCart, updateCart } = useCart();

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      setState((prevState) => ({
        ...prevState,
        error: checkProcessForError(cart),
      }));
    }
  }, [cart]);

  const checkProcessForError = (processList: IProcessItem[]): boolean => {
    return (
      processList.filter(
        (item: IProcessItem) =>
          item.model === undefined ||
          item.material === undefined ||
          item.postProcessings === undefined
      ).length > 0
    );
  };

  const handleOnClickEdit = () => {
    navigate("/process/model");
  };
  const handleOnClickSendRequest = () => {
    if (error === false) navigate("/checkout");
    else {
      setState((prevState) => ({ ...prevState, showError: true }));
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, showError: false }));
      }, 3000);
    }
  };
  const handleOnClickClear = () => {
    updateCart([]);
    setTimeout(() => {
      loadCart();
    }, 200);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <h1 className="text-center p-2 bg-white w-full">Auftrag</h1>
      <section className="flex flex-col gap-5 items-center justify-start w-full">
        {cart !== undefined && cart.length > 0 ? (
          cart.map((process: IProcessItem, index: number) => (
            <OrderItem process={process} key={index} index={index} />
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
      <section className="text-white flex flex-col gap-5 md:flex-row justify-start items-center md:justify-center">
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={handleOnClickEdit}
        >
          Bearbeiten
        </div>
        <div
          className={`w-full md:w-fit flex flex-row justify-center px-3 py-2 rounded  ${
            error === true
              ? "bg-gray-600 hover:bg-gray-400 hover:cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-400 hover:cursor-pointer"
          }`}
          onClick={handleOnClickSendRequest}
        >
          Auftrag Anfragen
        </div>
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={handleOnClickClear}
        >
          Auftrag leeren
        </div>
      </section>
    </div>
  );
};

export default Order;
