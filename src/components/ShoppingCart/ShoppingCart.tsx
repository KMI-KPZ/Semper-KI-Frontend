import React from "react";
import { useNavigate } from "react-router-dom";
import { IProcessItem } from "../../interface/Interface";
import ShoppingCartItem from "./ShoppingCartItem";

interface Props {
  processList: IProcessItem[];
  setProcessList(processList: IProcessItem[]): void;
}

const ShoppingCart: React.FC<Props> = (props) => {
  const { processList, setProcessList } = props;
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <h1 className="text-center p-2 bg-white w-full">Einkaufswagen</h1>
      <section className="flex flex-col gap-5 items-center justify-start w-full">
        {processList.length < 1 ? (
          <h2 className="text-center p-2 bg-white w-full">
            keine aktiven Prozesse
          </h2>
        ) : (
          processList.map((process: IProcessItem, index: number) => (
            <ShoppingCartItem process={process} key={index} />
          ))
        )}
      </section>
      <section className="text-white flex flex-col gap-5 md:flex-row justify-start items-center md:justify-center">
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={() => navigate("/process/model")}
        >
          Bearbeiten
        </div>
        <div className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer">
          Auftrag Anfragen
        </div>
        <div
          className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer"
          onClick={() => setProcessList([])}
        >
          Warenkorb leeren
        </div>
      </section>
    </div>
  );
};

export default ShoppingCart;
