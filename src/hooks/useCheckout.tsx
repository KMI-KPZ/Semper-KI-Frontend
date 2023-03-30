import axios from "axios";
import React, { useState } from "react";
import { IProcessItem } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  printable: ICheckout[];
  price: ICheckout[];
  logistics: ICheckout[];
  checkPrintability(processList: IProcessItem[]): void;
  checkPrices(processList: IProcessItem[]): void;
  checkLogistics(processList: IProcessItem[]): void;
}

export interface ICheckout {
  loading: boolean;
  error: boolean;
  data: string;
}

const useCheckout = (): ReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const [printable, setPrintable] = useState<ICheckout[]>([]);
  const [price, setPrice] = useState<ICheckout[]>([]);
  const [logistics, setLogistics] = useState<ICheckout[]>([]);

  const checkPrintability = (processList: IProcessItem[]) => {
    Promise.all(
      processList.map((_item, _index) => {
        setPrintable((prevState) => [
          ...prevState.filter((item, index: number) => index < _index),
          {
            loading: true,
            error: false,
            data: "",
          },
          ...prevState.filter((item, index: number) => index > _index),
        ]);
        axiosCustom
          .get(`${process.env.REACT_APP_API_URL}/public/checkPrintability/`)
          .then((res) => {
            console.log("useCheckout | checkPrintability ✅ |", res.data);
            setPrintable((prevState) => [
              ...prevState.filter((item, index: number) => index < _index),
              {
                loading: false,
                error: false,
                data: res.data,
              },
              ...prevState.filter((item, index: number) => index > _index),
            ]);
          })
          .catch((error) => {
            console.log("useCheckout | checkPrintability ❌ |", error);
            setPrintable((prevState) => [
              ...prevState.filter((item, index: number) => index < _index),
              {
                loading: false,
                error: true,
                data: "",
              },
              ...prevState.filter((item, index: number) => index > _index),
            ]);
          });
      })
    );
  };

  const checkPrices = (processList: IProcessItem[]) => {
    Promise.all(
      processList.map((_item, _index) => {
        setPrice((prevState) => [
          ...prevState.filter((item, index: number) => index < _index),
          {
            loading: true,
            error: false,
            data: "",
          },
          ...prevState.filter((item, index: number) => index > _index),
        ]);
        axiosCustom
          .get(`${process.env.REACT_APP_API_URL}/public/checkPrices/`)
          .then((res) => {
            console.log("useCheckout | checkPrices ✅ |", res.data);
            setPrice((prevState) => [
              ...prevState.filter((item, index: number) => index < _index),
              {
                loading: false,
                error: false,
                data: res.data,
              },
              ...prevState.filter((item, index: number) => index > _index),
            ]);
          })
          .catch((error) => {
            console.log("useCheckout | checkPrices ❌ |", error);
            setPrice((prevState) => [
              ...prevState.filter((item, index: number) => index < _index),
              {
                loading: false,
                error: true,
                data: "",
              },
              ...prevState.filter((item, index: number) => index > _index),
            ]);
          });
      })
    );
  };

  const checkLogistics = (processList: IProcessItem[]) => {
    Promise.all(
      processList.map((_item, _index) => {
        setLogistics((prevState) => [
          ...prevState.filter((item, index: number) => index < _index),
          {
            loading: true,
            error: false,
            data: "",
          },
          ...prevState.filter((item, index: number) => index > _index),
        ]);
        axiosCustom
          .get(`${process.env.REACT_APP_API_URL}/public/checkLogistics/`)
          .then((res) => {
            console.log("useCheckout | checkLogistics ✅ |", res.data);
            setLogistics((prevState) => [
              ...prevState.filter((item, index: number) => index < _index),
              {
                loading: false,
                error: false,
                data: res.data,
              },
              ...prevState.filter((item, index: number) => index > _index),
            ]);
          })
          .catch((error) => {
            console.log("useCheckout | checkLogistics ❌ |", error);
            setLogistics((prevState) => [
              ...prevState.filter((item, index: number) => index < _index),
              {
                loading: false,
                error: true,
                data: "",
              },
              ...prevState.filter((item, index: number) => index > _index),
            ]);
          });
      })
    );
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
