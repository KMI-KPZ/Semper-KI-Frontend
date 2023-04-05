import axios from "axios";
import React, { useEffect, useState } from "react";
import { IProcessItem } from "../interface/Interface";
import useCustomAxios from "./useCustomAxios";

interface ReturnProps {
  order: IRequestState;
  printable: IRequestState;
  price: IRequestState;
  logistics: IRequestState;
  printableList: IRequestState[];
  priceList: IRequestState[];
  logisticsList: IRequestState[];
  checkPrintability(processList: IProcessItem[]): void;
  checkPrices(processList: IProcessItem[]): void;
  checkLogistics(processList: IProcessItem[]): void;
  sendOrder(): void;
}

export interface IRequestState {
  loading: boolean;
  error: boolean;
  data: string;
}

const useCheckout = (): ReturnProps => {
  const emptyRequestState: IRequestState = {
    data: "",
    error: false,
    loading: false,
  };
  const { axiosCustom } = useCustomAxios();
  const [printable, setPrintable] = useState<IRequestState>(emptyRequestState);
  const [printableList, setPrintableList] = useState<IRequestState[]>([]);
  const [price, setPrice] = useState<IRequestState>(emptyRequestState);
  const [priceList, setPriceList] = useState<IRequestState[]>([]);
  const [logistics, setLogistics] = useState<IRequestState>(emptyRequestState);
  const [logisticsList, setLogisticsList] = useState<IRequestState[]>([]);
  const [order, setOrder] = useState<IRequestState>(emptyRequestState);

  const updateRequestState = (
    list: IRequestState[],
    setState: React.Dispatch<React.SetStateAction<IRequestState>>
  ) => {
    let conclusion: IRequestState = emptyRequestState;
    list.forEach((item) => {
      if (item.data !== emptyRequestState.data) conclusion.data = item.data;
      if (item.error !== emptyRequestState.error) conclusion.error = item.error;
      if (item.loading !== emptyRequestState.loading)
        conclusion.loading = item.loading;
    });
    setState(conclusion);
  };

  useEffect(() => {
    updateRequestState(printableList, setPrintable);
  }, [printableList]);
  useEffect(() => {
    updateRequestState(priceList, setPrice);
  }, [priceList]);
  useEffect(() => {
    updateRequestState(logisticsList, setLogistics);
  }, [logisticsList]);

  const checkPrintability = (processList: IProcessItem[]) => {
    Promise.all(
      processList.map((_item, _index) => {
        setPrintableList((prevState) => [
          ...prevState.filter((item, index: number) => index < _index),
          {
            loading: true,
            error: false,
            data: "",
          },
          ...prevState.filter((item, index: number) => index > _index),
        ]);
        axiosCustom
          .get(
            `${process.env.REACT_APP_HTTP_API_URL}/public/checkPrintability/`
          )
          .then((res) => {
            console.log("useCheckout | checkPrintability ✅ |", res.data);
            setPrintableList((prevState) => [
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
            setPrintableList((prevState) => [
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
        setPriceList((prevState) => [
          ...prevState.filter((item, index: number) => index < _index),
          {
            loading: true,
            error: false,
            data: "",
          },
          ...prevState.filter((item, index: number) => index > _index),
        ]);
        axiosCustom
          .get(`${process.env.REACT_APP_HTTP_API_URL}/public/checkPrices/`)
          .then((res) => {
            console.log("useCheckout | checkPrices ✅ |", res.data);
            setPriceList((prevState) => [
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
            setPriceList((prevState) => [
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
        setLogisticsList((prevState) => [
          ...prevState.filter((item, index: number) => index < _index),
          {
            loading: true,
            error: false,
            data: "",
          },
          ...prevState.filter((item, index: number) => index > _index),
        ]);
        axiosCustom
          .get(`${process.env.REACT_APP_HTTP_API_URL}/public/checkLogistics/`)
          .then((res) => {
            console.log("useCheckout | checkLogistics ✅ |", res.data);
            setLogisticsList((prevState) => [
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
            setLogisticsList((prevState) => [
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

  const sendOrder = () => {
    setOrder({
      loading: true,
      error: false,
      data: "",
    });
    axiosCustom
      .get(`${process.env.REACT_APP_HTTP_API_URL}/public/sendOrder/`)
      .then((res) => {
        console.log("useCheckout | sendOrder ✅ |", res.data);
        setOrder({
          loading: false,
          error: false,
          data: res.data,
        });
      })
      .catch((error) => {
        console.log("useCheckout | sendOrder ❌ |", error);
        setOrder({
          loading: false,
          error: true,
          data: "",
        });
      });
  };

  return {
    checkLogistics,
    checkPrices,
    checkPrintability,
    sendOrder,
    order,
    logistics,
    price,
    printable,
    logisticsList,
    priceList,
    printableList,
  };
};

export default useCheckout;
