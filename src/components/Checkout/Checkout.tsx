import React, { useEffect, useState } from "react";
import { IconArrowR } from "../../config/Icons";
import useCart from "../../hooks/useCart";
import useCheckout, { IRequestState } from "../../hooks/useCheckout";
import CheckoutItem from "./CheckoutItem";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";

interface Props {}
interface State {
  checkLogisticsCalled: boolean;
  checkPricesCalled: boolean;
  checkPrintabilityCalled: boolean;
  loadingAll: boolean;
  errorAll: boolean;
  showError: boolean;
}

const Checkout: React.FC<Props> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    checkLogisticsCalled: false,
    checkPricesCalled: false,
    checkPrintabilityCalled: false,
    loadingAll: false,
    errorAll: false,
    showError: false,
  });
  const {
    checkLogisticsCalled,
    checkPricesCalled,
    checkPrintabilityCalled,
    errorAll,
    loadingAll,
    showError,
  } = state;
  const { cart, loadCart } = useCart();
  const {
    order,
    sendOrder,
    printable,
    printableList,
    checkPrintability,
    price,
    priceList,
    checkPrices,
    logistics,
    logisticsList,
    checkLogistics,
  } = useCheckout();
  const loadingDummy: IRequestState = {
    error: false,
    loading: false,
    data: "",
  };

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    if (
      logisticsList.length === priceList.length &&
      priceList.length === printableList.length &&
      printableList.length > 0
    ) {
      if (
        logistics.loading === false &&
        price.loading === false &&
        printable.loading === false
      )
        setState((prevState) => ({ ...prevState, loadingAll: false }));
      else setState((prevState) => ({ ...prevState, loadingAll: true }));
      if (
        logistics.error === false &&
        price.error === false &&
        printable.error === false
      )
        setState((prevState) => ({ ...prevState, errorAll: false }));
      else setState((prevState) => ({ ...prevState, errorAll: false }));
    }
  }, [logistics, price, printable]);

  useEffect(() => {
    if (order.loading === false && order.error === false && order.data !== "")
      navigate("/");
  }, [order]);

  const checkAll: boolean =
    checkLogisticsCalled === true &&
    checkPricesCalled === true &&
    checkPrintabilityCalled === true &&
    errorAll === false &&
    loadingAll === false;

  const handleOnClickSend = () => {
    if (checkAll === true) {
      setState((prevState) => ({ ...prevState, showError: false }));
      sendOrder();
    } else {
      setState((prevState) => ({ ...prevState, showError: true }));
      setTimeout(() => {
        setState((prevState) => ({ ...prevState, showError: false }));
      }, 3000);
    }
  };
  const handleOnClickPrintable = () => {
    checkPrintability(cart);
    setState((prevState) => ({ ...prevState, checkPrintabilityCalled: true }));
  };
  const handleOnClickPrice = () => {
    checkPrices(cart);
    setState((prevState) => ({ ...prevState, checkPricesCalled: true }));
  };
  const handleOnClickLogistics = () => {
    checkLogistics(cart);
    setState((prevState) => ({ ...prevState, checkLogisticsCalled: true }));
  };

  const renderCheckButtons = () => (
    <div className="flex flex-col gap-3 md:flex-row w-full">
      <div
        onClick={handleOnClickPrintable}
        className="text-white flex flex-row justify-center text-center items-center whitespace-nowrap w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer"
      >
        Druckbarkeit prüfen
      </div>
      <div
        onClick={handleOnClickLogistics}
        className="text-white flex flex-row justify-center text-center items-center whitespace-nowrap w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer"
      >
        Lieferzeit berechnen
      </div>
      <div
        onClick={handleOnClickPrice}
        className="text-white flex flex-row justify-center text-center items-center whitespace-nowrap w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer"
      >
        Preis berechnen
      </div>
    </div>
  );

  const renderLoadingAnimation = () => (
    <div className="bg-white w-full p-5 flex flex-col gap-5 justify-center items-center">
      <LoadingAnimation color="black" />
    </div>
  );
  const renderError = () => {
    let errorList: string[] = [];
    if (errorAll === true) errorList.push("!!! ERROR !!!");

    return errorList.length > 0 ? (
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-center items-center">
        {errorList.map((error) => (
          <h2 className="text-red-400 text-center">{error}</h2>
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
        <h1 className="text-center p-2 w-full">Auftrag Anfragen</h1>
        {renderCheckButtons()}
        <div
          className={`text-white flex flex-row gap-5 justify-center text-center items-center whitespace-nowrap w-full p-2 rounded bg-blue-600 hover:bg-blue-400 hover:cursor-pointer ${
            checkAll === true
              ? "bg-blue-600 hover:bg-blue-400 hover:cursor-pointer"
              : "bg-slate-600 hover:bg-slate-400 hover:cursor-not-allowed"
          }`}
          onClick={handleOnClickSend}
        >
          <h2 className="text-white">Anfragen</h2>
          <SendIcon fontSize="large" />
        </div>
      </div>
      {showError === true ? renderError() : null}
      {order.loading === true ? renderLoadingAnimation() : null}
      <div
        className="flex flex-col gap-y-3 justify-center items-center
      sm:flex-row sm:flex-wrap sm:justify-between sm:items-start w-full"
      >
        {cart.length > 0 ? (
          cart.map((item, index) => (
            <CheckoutItem
              key={index}
              process={item}
              logistics={
                logisticsList[index] === undefined
                  ? loadingDummy
                  : logisticsList[index]
              }
              price={
                priceList[index] === undefined ? loadingDummy : priceList[index]
              }
              printable={
                printableList[index] === undefined
                  ? loadingDummy
                  : printableList[index]
              }
            />
          ))
        ) : (
          <h2>keine Items vorhanden</h2>
        )}
      </div>
    </div>
  );
};

export default Checkout;
