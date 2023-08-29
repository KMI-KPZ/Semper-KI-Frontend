import { getCustomAxios } from "@/hooks/useCustomAxios";
import React, { useEffect, useState } from "react";
import logger from "@/hooks/useLogger";
import { SubOrderProps } from "@/pages/Order/SubOrder/hooks/useSubOrder";

interface ReturnProps {
  order: IRequestState;
  printable: IRequestState;
  price: IRequestState;
  logistics: IRequestState;
  printableList: IRequestState[];
  priceList: IRequestState[];
  logisticsList: IRequestState[];
  checkPrintability(subOrderList: SubOrderProps[]): void;
  checkPrices(subOrderList: SubOrderProps[]): void;
  checkLogistics(subOrderList: SubOrderProps[]): void;
  sendOrder(): void;
}

export interface IRequestState {
  loading: boolean;
  error: boolean;
  data: string;
}

const useVerification = (): ReturnProps => {
  const emptyRequestState: IRequestState = {
    data: "",
    error: false,
    loading: false,
  };

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

  const checkPrintability = (subOrderList: SubOrderProps[]) => {
    Promise.all(
      subOrderList.map((_item, _index) => {
        setPrintableList((prevState) => [
          ...prevState.filter((item, index: number) => index < _index),
          {
            loading: true,
            error: false,
            data: "",
          },
          ...prevState.filter((item, index: number) => index > _index),
        ]);
        getCustomAxios()
          .get(`${process.env.VITE_HTTP_API_URL}/public/checkPrintability/`)
          .then((res) => {
            logger("useCheckout | checkPrintability ✅ |", res.data);
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
            logger("useCheckout | checkPrintability ❌ |", error);
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

  const checkPrices = (subOrderList: SubOrderProps[]) => {
    Promise.all(
      subOrderList.map((_item, _index) => {
        setPriceList((prevState) => [
          ...prevState.filter((item, index: number) => index < _index),
          {
            loading: true,
            error: false,
            data: "",
          },
          ...prevState.filter((item, index: number) => index > _index),
        ]);
        getCustomAxios()
          .get(`${process.env.VITE_HTTP_API_URL}/public/checkPrices/`)
          .then((res) => {
            logger("useCheckout | checkPrices ✅ |", res.data);
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
            logger("useCheckout | checkPrices ❌ |", error);
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

  const checkLogistics = (subOrderList: SubOrderProps[]) => {
    Promise.all(
      subOrderList.map((_item, _index) => {
        setLogisticsList((prevState) => [
          ...prevState.filter((item, index: number) => index < _index),
          {
            loading: true,
            error: false,
            data: "",
          },
          ...prevState.filter((item, index: number) => index > _index),
        ]);
        getCustomAxios()
          .get(`${process.env.VITE_HTTP_API_URL}/public/checkLogistics/`)
          .then((res) => {
            logger("useCheckout | checkLogistics ✅ |", res.data);
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
            logger("useCheckout | checkLogistics ❌ |", error);
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
    getCustomAxios()
      .get(`${process.env.VITE_HTTP_API_URL}/public/sendOrder/`)
      .then((res) => {
        logger("useCheckout | sendOrder ✅ |", res.data);
        setOrder({
          loading: false,
          error: false,
          data: res.data,
        });
      })
      .catch((error) => {
        logger("useCheckout | sendOrder ❌ |", error);
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

export default useVerification;
