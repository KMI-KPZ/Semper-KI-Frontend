import React from "react";
import useCart from "src/hooks/useCart";
import ManufacturerItem from "./ManufacturerItem";

interface Props {}

const ManufacturerView: React.FC<Props> = (props) => {
  const {} = props;
  const { cart, error, status, uploadCart } = useCart();
  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
        <h1 className="text-center p-2 w-full">Hersteller auswählen</h1>
      </div>
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
        {cart !== undefined ? (
          cart.map((processItem, index) => (
            <ManufacturerItem processItem={processItem} key={index} />
          ))
        ) : (
          <h2>ein Fehler ist aufgetreten</h2>
        )}
      </div>
    </div>
  );
};

export default ManufacturerView;
