import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { IProcessItem } from "../../interface/Interface";
import ShoppingCartItem from "./ShoppingCartItem";

interface Props {}

const ShoppingCart: React.FC<Props> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const { cart, loadCart, updateCart } = useCart();

  useEffect(() => {
    loadCart();
  }, []);

  const handleOnClickEdit = () => {
    navigate("/process/model");
  };
  const handleOnClickSendRequest = () => {
    navigate("/checkout");
  };
  const handleOnClickClear = () => {
    updateCart([]);
    setTimeout(() => {
      loadCart();
    }, 200);
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <h1 className="text-center p-2 bg-white w-full">Einkaufswagen</h1>
      <section className="flex flex-col gap-5 items-center justify-start w-full">
        {cart.length > 0 ? (
          cart.map((process: IProcessItem, index: number) => (
            <ShoppingCartItem process={process} key={index} />
          ))
        ) : (
          <h2 className="text-center p-2 bg-white w-full">
            keine aktiven Prozesse
          </h2>
        )}
      </section>
      <section className="text-white flex flex-col gap-5 md:flex-row justify-start items-center md:justify-center">
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={handleOnClickEdit}
        >
          Bearbeiten
        </div>
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={handleOnClickSendRequest}
        >
          Auftrag Anfragen
        </div>
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={handleOnClickClear}
        >
          Warenkorb leeren
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
