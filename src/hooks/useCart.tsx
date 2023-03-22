import React, { useState } from "react";
import { IProcess } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  cart: IProcess[];
  loadCart(): void;
  updateCart(cart: IProcess[]): void;
}

const useCart = (): ReturnProps => {
  const [cart, setCart] = useState<IProcess[]>([]);
  const { axiosCustom } = useCustomAxios();

  const loadCart = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/getCart/`)
      .then((res) => {
        console.log("useCart| loadCart Successful", res.data);
        setCart(res.data);
      })
      .catch((error) => {
        console.log("useCart| loadCart error", error);
      });
  };
  const updateCart = (cart: IProcess[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/updateCart/`, { cart })
      .then((res) => {
        console.log("useCart| updateCart Successful", res.data);
      })
      .catch((error) => {
        console.log("useCart| updateCart error", error);
      });
  };

  return { cart, loadCart, updateCart };
};

export default useCart;
