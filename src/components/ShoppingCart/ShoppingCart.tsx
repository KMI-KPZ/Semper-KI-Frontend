import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { IProcess } from "../../interface/Interface";
import "./ShoppingCart.scss";
import ShoppingCartItem from "./ShoppingCartItem";

interface Props {
  processList: IProcess[];
  setProcessList(processList: IProcess[]): void;
}

const ShoppingCart: React.FC<Props> = (props) => {
  const { processList, setProcessList } = props;
  const navigate = useNavigate();

  return (
    <div className="shopping-cart">
      <h1 className="shopping-cart-headline">Einkaufswagen</h1>
      <section className="shopping-cart-items">
        {processList.length < 1 ? (
          <h2 className="shopping-cart-headline">keine aktiven Prozesse</h2>
        ) : (
          processList.map((process: IProcess, index: number) => (
            <ShoppingCartItem process={process} key={index} />
          ))
        )}
      </section>
      <section className="shopping-cart-buttons">
        <Button variant="contained" onClick={() => navigate("/process/model")}>
          Bearbeiten
        </Button>
        <Button variant="contained">Auftrag Anfragen</Button>
        <Button variant="contained" onClick={() => setProcessList([])}>
          Warenkorb leeren
        </Button>
      </section>
    </div>
  );
};

export default ShoppingCart;
