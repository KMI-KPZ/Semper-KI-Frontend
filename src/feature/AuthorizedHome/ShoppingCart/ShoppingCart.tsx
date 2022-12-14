import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Process } from "../../../interface/Interface";
import "./ShoppingCart.scss";
import ShoppingCartItem from "./ShoppingCartItem";

interface Props {
  processList: Process[];
  setProcessList(processList: Process[]): void;
}

const ShoppingCart = ({ processList, setProcessList }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="shopping-cart">
      <h1 className="shopping-cart-headline">Einkaufswagen</h1>
      <section className="shopping-cart-items">
        {processList.length < 1 ? (
          <h2 className="shopping-cart-headline">keine aktiven Prozesse</h2>
        ) : (
          processList.map((process: Process, index: number) => (
            <ShoppingCartItem process={process} key={index} />
          ))
        )}
      </section>
      <section className="shopping-cart-buttons">
        <Button variant="contained" onClick={() => navigate("/process/models")}>
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
