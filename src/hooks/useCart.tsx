import React, { useState } from "react";
import { IProcessItem } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  cart: IProcessItem[];
  loadCart(): void;
  updateCart(cart: IProcessItem[]): void;
}

const useCart = (): ReturnProps => {
  const [cart, setCart] = useState<IProcessItem[]>([]);
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
  const updateCart = (cart: IProcessItem[]) => {
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
