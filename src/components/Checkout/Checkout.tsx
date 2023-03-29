import React, { useEffect, useState } from "react";
import { IconArrowR } from "../../config/Icons";
import useCart from "../../hooks/useCart";
import useCheckout, { ICheckout } from "../../hooks/useCheckout";
import CheckoutItem from "./CheckoutItem";
import SendIcon from "@mui/icons-material/Send";

interface Props {}
interface State {}

const Checkout: React.FC<Props> = (props) => {
  const {} = props;
  const [state, setState] = useState<State>({});
  const { cart, loadCart } = useCart();
  const {
    checkLogistics,
    checkPrices,
    checkPrintability,
    logistics,
    price,
    printable,
  } = useCheckout();
  const loadingDummy: ICheckout = { error: false, loading: false, data: "" };

  useEffect(() => {
    loadCart();
  }, []);

  const handleOnClickPrintable = () => {
    checkPrintability(cart);
  };
  const handleOnClickPrice = () => {
    checkPrices(cart);
  };
  const handleOnClickLogistics = () => {
    checkLogistics(cart);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
        <h1 className="text-center p-2 w-full">Auftrag Anfragen</h1>
        <div className="flex flex-col gap-3 md:flex-row w-full">
          <div
            onClick={handleOnClickPrintable}
            className="text-white flex flex-row justify-center text-center items-center whitespace-nowrap w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer"
          >
            Druckbarkeit prüfen
          </div>
          <div
            onClick={handleOnClickLogistics}
            className="text-white flex flex-row justify-center text-center items-center whitespace-nowrap w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer"
          >
            Lieferzeit berechnen
          </div>
          <div
            onClick={handleOnClickPrice}
            className="text-white flex flex-row justify-center text-center items-center whitespace-nowrap w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer"
          >
            Preis berechnen
          </div>
        </div>
        <div className="text-white flex flex-row gap-5 justify-center text-center items-center whitespace-nowrap w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer">
          <h2 className="text-white">Anfragen</h2>
          <SendIcon fontSize="large" />
        </div>
      </div>
      <div
        className="flex flex-col gap-y-3 justify-center items-center
      sm:flex-row sm:flex-wrap sm:justify-between sm:items-start w-full"
      >
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <CheckoutItem
              key={index}
              process={item}
              logistics={
                logistics[index] === undefined ? loadingDummy : logistics[index]
              }
              price={price[index] === undefined ? loadingDummy : price[index]}
              printable={
                printable[index] === undefined ? loadingDummy : printable[index]
              }
            />
          ))
        ) : (
          <h2>keine Items vorhanden</h2>
        )}
      </div>
    </div>
  );
};

export default Checkout;
