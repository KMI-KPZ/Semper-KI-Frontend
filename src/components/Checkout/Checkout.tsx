import React, { useEffect, useState } from "react";
import { IconArrowR } from "../../config/Icons";
import useCart from "../../hooks/useCart";
import useCheckout, { IRequestState } from "../../hooks/useCheckout";
import CheckoutItem from "./CheckoutItem";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../LoadingAnimation/LoadingAnimation";
import { useCheckoutWebSocket } from "../../hooks/useCheckoutWebSocket";

interface Props {}
interface State {
  checkLogisticsCalled: boolean;
  checkPricesCalled: boolean;
  checkPrintabilityCalled: boolean;
  loadingAll: boolean;
  errorAll: boolean;
  showError: boolean;
  orderSendSuccesfull: boolean;
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
    orderSendSuccesfull: false,
  });
  const {
    checkLogisticsCalled,
    checkPricesCalled,
    checkPrintabilityCalled,
    errorAll,
    loadingAll,
    showError,
    orderSendSuccesfull,
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

  const showErrorOnTime = (time?: number) => {
    setState((prevState) => ({ ...prevState, showError: true }));
    setTimeout(
      () => {
        setState((prevState) => ({ ...prevState, showError: false }));
      },
      time === undefined ? 3000 : time
    );
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
    if (
      order.loading === false &&
      order.error === false &&
      order.data === "Success"
    ) {
      setState((prevState) => ({ ...prevState, orderSendSuccesfull: true }));
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
    if (order.error === true) {
      showErrorOnTime();
    }
  }, [order]);

  const checkAll: boolean =
    checkLogisticsCalled === true &&
    checkPricesCalled === true &&
    checkPrintabilityCalled === true &&
    errorAll === false &&
    loadingAll === false;

  const handleOnClickSend = () => {
    if (checkAll === true) {
      sendOrder();
    } else {
      showErrorOnTime();
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
    <div className="flex flex-col justify-center items-center bg-white w-full h-full min-h-[500px]">
      <LoadingAnimation color="black" />
    </div>
  );
  const renderError = () => {
    let errorList: string[] = [];
    if (logistics.error === true)
      errorList.push("Fehler beim laden der Logistik");
    if (logistics.loading === true)
      errorList.push("Die Logistik Daten sind noch nicht fertig geladen");
    if (price.error === true) errorList.push("Fehler beim laden des Preise");
    if (price.loading === true)
      errorList.push("Die Preise sind noch nicht fertig geladen");
    if (printable.error === true)
      errorList.push("Fehler beim laden der Druckbarkeit");
    if (printable.loading === true)
      errorList.push("Die Druckbakeits Daten sind noch nicht fertig geladen");
    if (order.error === true)
      errorList.push("Fehler beim absenden der Berstellung");
    if (
      checkLogisticsCalled === false ||
      checkPricesCalled === false ||
      checkPrintabilityCalled === false
    )
      errorList.push("Bitte alle berechnungen durchführen!");

    return errorList.length > 0 ? (
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-center items-center">
        {errorList.map((error, index) => (
          <h2 key={index} className="text-red-400 text-center">
            {error}
          </h2>
        ))}
      </div>
    ) : null;
  };
  const renderOrderSendSuccesfull = () => {
    return (
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-center items-center">
        <h2>Der Auftrag wurde Erfolgreich übermittelt!</h2>
        <h3>Sie werden nun zu Startseite weitergeleitet</h3>
      </div>
    );
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
      {order.loading === false && orderSendSuccesfull === true
        ? renderOrderSendSuccesfull()
        : null}
      {order.loading === true ? renderLoadingAnimation() : null}
      {order.loading === false && orderSendSuccesfull === false ? (
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
                  priceList[index] === undefined
                    ? loadingDummy
                    : priceList[index]
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
      ) : null}
    </div>
  );
};

export default Checkout;
