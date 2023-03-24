import React, { useState } from "react";
import { IProcessItem } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  printable: boolean | undefined;
  price: number | undefined;
  logistics: boolean | undefined;
  checkPrintability(cart: IProcessItem[]): void;
  checkPrices(cart: IProcessItem[]): void;
  checkLogistics(cart: IProcessItem[]): void;
}

const useCheckout = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const [printable, setPrintable] = useState<boolean>();
  const [price, setPrice] = useState<number>();
  const [logistics, setLogistics] = useState<boolean>();

  const checkPrintability = (cart: IProcessItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/checkPrintability/`, {
        cart,
      })
      .then((res) => {
        console.log("useCheckout | checkPrintability ✅ |", res.data);
        setPrintable(res.data);
      })
      .catch((error) => {
        console.log("useCheckout | checkPrintability ❌ |", error);
      });
  };
  const checkPrices = (cart: IProcessItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/checkPrices/`, { cart })
      .then((res) => {
        console.log("useCheckout | checkPrices ✅ |", res.data);
        setPrice(res.data);
      })
      .catch((error) => {
        console.log("useCheckout | checkPrices ❌ |", error);
      });
  };
  const checkLogistics = (cart: IProcessItem[]) => {
    axiosCustom
      .post(`${process.env.REACT_APP_API_URL}/public/checkLogistics/`, { cart })
      .then((res) => {
        console.log("useCheckout | checkLogistics ✅ |", res.data);
        setLogistics(res.data);
      })
      .catch((error) => {
        console.log("useCheckout | checkLogistics ❌ |", error);
      });
  };

  return {
    checkLogistics,
    checkPrices,
    checkPrintability,
    logistics,
    price,
    printable,
  };
};

export default useCheckout;
