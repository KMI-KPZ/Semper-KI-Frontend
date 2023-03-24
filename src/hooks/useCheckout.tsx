import React, { useState } from "react";
import { IProcessItem } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  printable: any | undefined;
  price: any | undefined;
  logistics: any | undefined;
  checkPrintability(): void;
  checkPrices(): void;
  checkLogistics(): void;
}

const useCheckout = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const [printable, setPrintable] = useState<any>();
  const [price, setPrice] = useState<any>();
  const [logistics, setLogistics] = useState<any>();

  const checkPrintability = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/checkPrintability/`)
      .then((res) => {
        console.log("useCheckout | checkPrintability ✅ |", res.data);
        setPrintable(res.data);
      })
      .catch((error) => {
        console.log("useCheckout | checkPrintability ❌ |", error);
      });
  };
  const checkPrices = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/checkPrices/`)
      .then((res) => {
        console.log("useCheckout | checkPrices ✅ |", res.data);
        setPrice(res.data);
      })
      .catch((error) => {
        console.log("useCheckout | checkPrices ❌ |", error);
      });
  };
  const checkLogistics = () => {
    axiosCustom
      .get(`${process.env.REACT_APP_API_URL}/public/checkLogistics/`)
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
