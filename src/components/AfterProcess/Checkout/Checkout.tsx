import React, { useEffect, useState } from "react";
import useCart from "../../../hooks/useCart";
import useCheckout, { IRequestState } from "../../../hooks/useCheckout";
import CheckoutItem from "./CheckoutItem";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import LoadingAnimation from "../../Loading/LoadingAnimation";
import Button from "../../General/Button";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
  const { cart, error, status, uploadCart } = useCart();
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
      uploadCart.mutate([]);
    } else {
      showErrorOnTime();
    }
  };
  const handleOnClickPrintable = () => {
    checkPrintability(cart);
    setState((prevState) => ({
      ...prevState,
      checkPrintabilityCalled: true,
    }));
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
      <Button
        onClick={handleOnClickPrintable}
        size="full"
        active={!printable.loading}
      >
        {t("Checkout.button.printable")}
      </Button>
      <Button
        onClick={handleOnClickLogistics}
        size="full"
        active={!logistics.loading}
      >
        {t("Checkout.button.logistics")}
      </Button>
      <Button onClick={handleOnClickPrice} size="full" active={!price.loading}>
        {t("Checkout.button.price")}
      </Button>
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
        <h2>{t("Checkout.success.send")}</h2>
        <h3>{t("Checkout.success.redirect")}</h3>
      </div>
    );
  };

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-center p-2 bg-white w-full">Laden...</h1>
      </div>
    );
  if (status === "error" && error !== null)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-center p-2 bg-white w-full">
          Error: {error.message}
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
        <h1 className="text-center p-2 w-full">{t("Checkout.title")}</h1>
        {renderCheckButtons()}
        <Button
          active={checkAll === true}
          onClick={handleOnClickSend}
          icon={<SendIcon fontSize="large" />}
          iconPos="back"
        >
          <h2 className="text-white">{t("Checkout.button.request")}</h2>
        </Button>
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
            <h2>{t("Checkout.error.no-items")}</h2>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Checkout;
