import React, { useEffect, useState } from "react";
import useCart from "../../hooks/useCart";
import useCheckout from "../../hooks/useCheckout";
import { IProgress } from "../../interface/Interface";

interface Props {}
interface State {}
const Checkout: React.FC<Props> = (props) => {
  const {} = props;
  const [state, setState] = useState<State>({});
  const { cart, loadCart } = useCart();
  const {
    logistics,
    price,
    printable,
    checkLogistics,
    checkPrices,
    checkPrintability,
  } = useCheckout();

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <div className="bg-white flex flex-col gap-5 w-full justify-center items-start p-20">
      <h1>Checkout</h1>
      <div className="flex flex-row gap-3 justify-center items-start">
        <h2>Items : {cart.length}</h2>
      </div>
      <div className="flex flex-row gap-3 items-center justify-between w-full">
        <h2>Druckbarkeit : {printable}</h2>
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={() => checkPrintability(cart)}
        >
          Druckbarkeit prüfen
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center justify-between w-full">
        <h2>Lieferung : {logistics}</h2>
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={() => checkLogistics(cart)}
        >
          Lieferung prüfen
        </div>
      </div>
      <div className="flex flex-row gap-3 items-center justify-between w-full">
        <h2>Preis : {price}</h2>
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 text-white bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={() => checkPrices(cart)}
        >
          Preis prüfen
        </div>
      </div>
    </div>
  );
};

export default Checkout;
