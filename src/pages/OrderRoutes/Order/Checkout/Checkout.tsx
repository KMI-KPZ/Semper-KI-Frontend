import React, { useEffect, useState } from "react";
import useCheckout, { IRequestState } from "./hooks/useCheckout";
import OrderCheckoutItem from "./components/Item";
import SendIcon from "@mui/icons-material/Send";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { LoadingAnimation, LoadingSuspense } from "@component-library/Loading";
import { Heading } from "@component-library/Typography";

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

const OrderCheckout: React.FC<Props> = (props) => {
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
      }, 1500);
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
    // if (checkAll === true) {
    //   sendOrder();
    //   updateCart.mutate([]);
    // } else {
    //   showErrorOnTime();
    // }
  };
  const handleOnClickPrintable = () => {
    // checkPrintability(cart);
    // setState((prevState) => ({
    //   ...prevState,
    //   checkPrintabilityCalled: true,
    // }));
  };
  const handleOnClickPrice = () => {
    // checkPrices(cart);
    // setState((prevState) => ({ ...prevState, checkPricesCalled: true }));
  };
  const handleOnClickLogistics = () => {
    // checkLogistics(cart);
    // setState((prevState) => ({ ...prevState, checkLogisticsCalled: true }));
  };

  const renderCheckButtons = () => (
    <div className="flex w-full flex-col gap-3 md:flex-row">
      <Button
        onClick={handleOnClickPrintable}
        width="full"
        active={!printable.loading}
        title={t("AfterProcess.Checkout.Checkout.button.printable")}
      />
      <Button
        onClick={handleOnClickLogistics}
        width="full"
        active={!logistics.loading}
        title={t("AfterProcess.Checkout.Checkout.button.logistics")}
      />
      <Button
        onClick={handleOnClickPrice}
        width="full"
        active={!price.loading}
        title={t("AfterProcess.Checkout.Checkout.button.price")}
      />
    </div>
  );
  const renderLoadingAnimation = () => (
    <div className="flex h-full min-h-[500px] w-full flex-col items-center justify-center bg-white">
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
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
        {errorList.map((error, index) => (
          <Heading variant="h2" key={index}>
            {error}
          </Heading>
        ))}
      </div>
    ) : null;
  };
  const renderOrderSendSuccesfull = () => {
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
        <Heading variant="h2">
          {t("AfterProcess.Checkout.Checkout.success.send")}
        </Heading>
        <Heading variant="h3">
          {t("AfterProcess.Checkout.Checkout.success.redirect")}
        </Heading>
      </div>
    );
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {order.loading === false && orderSendSuccesfull === true ? (
        renderOrderSendSuccesfull()
      ) : (
        <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
          <Heading variant="h1">
            {t("AfterProcess.Checkout.Checkout.title")}
          </Heading>
          {renderCheckButtons()}
          <Button
            active={checkAll === true}
            onClick={handleOnClickSend}
            endIcon={<SendIcon fontSize="large" />}
            title={t("AfterProcess.Checkout.Checkout.button.request")}
          >
            <Heading variant="h2">
              {t("AfterProcess.Checkout.Checkout.button.request")}
            </Heading>
          </Button>
        </div>
      )}
      {showError === true ? renderError() : null}
      {order.loading === true ? renderLoadingAnimation() : null}
      {order.loading === false && orderSendSuccesfull === false ? (
        <div
          className="flex w-full flex-col items-center justify-center
      gap-y-3 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between"
        >
          {true ? (
            [].map((item, index) => (
              <OrderCheckoutItem
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
            <Heading variant="h2">
              {t("AfterProcess.Checkout.Checkout.error.no-items")}
            </Heading>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default OrderCheckout;
