import React, { useEffect, useRef, useState } from "react";
import { getIconByName, IconExpand } from "../../constants/Icons";
import { IManufacturer, IOrder, IProcessItem } from "../../interface/Interface";
import { IOrderTest } from "./OrderOverview";
import Button from "../General/Button";

interface Props {
  order: IOrderTest;
}

interface State {
  processOpen: boolean;
  manufacturerOpen: boolean;
}

const OrderItem: React.FC<Props> = (props) => {
  const { order } = props;
  const [state, setState] = useState<State>({
    processOpen: false,
    manufacturerOpen: false,
  });
  const { processOpen, manufacturerOpen } = state;

  const calcManufacturer = (): IManufacturer[] => {
    let manufacturerList: IManufacturer[] = [];
    // order.processList.forEach((process: IProcessItem) => {
    //   const manufacturer = process.manufacturer;
    //   if (manufacturer !== undefined) {
    //     manufacturerList.push(manufacturer);
    //   }
    // });
    return manufacturerList;
  };

  const isElementBiggerThanPx = (
    element: React.RefObject<HTMLDivElement>,
    maxHeight: number
  ): boolean => {
    if (
      element.current !== null &&
      element.current.offsetHeight !== undefined &&
      element.current.offsetHeight >= maxHeight
    ) {
      return true;
    }
    return false;
  };

  const manufacturerList = calcManufacturer();

  const handleOnClickProcessExpand = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setState((prevState) => ({
      ...prevState,
      processOpen: !prevState.processOpen,
    }));
  };
  const handleOnClickManufacturerExpand = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setState((prevState) => ({
      ...prevState,
      manufacturerOpen: !prevState.manufacturerOpen,
    }));
  };

  return (
    <li className="w-full bg-white p-5 gap-5 flex flex-col">
      <section className="flex flex-col md:flex-row justify-between md:justify-start md:gap-[10%] p-2 gap-2">
        <h2 className="break-words">Bestellung: {order.orderId}</h2>
        <h2>Datum: {new Date(order.dates.created).toLocaleDateString()}</h2>
        {/* <h2>Status: {order.orderState}</h2> */}
      </section>
      <hr />
      <section className="flex flex-col gap-5">
        <h2>Artikel</h2>
        <div
          className="
          relative
          flex flex-col items-center justify-start mb-6 md:m-0
          "
        >
          <div
            className={`
            flex flex-col items-center justify-start gap-5 w-full
            md:flex-row md:overflow-x-auto 
            ${processOpen === true ? "" : "max-h-96 overflow-hidden"}
            `}
          >
            {order.userOrders.cart.map(
              (process: IProcessItem, index: number) => (
                <div
                  key={index}
                  className="
                flex flex-row items-center justify-between 
                w-full bg-gray-100
                md:flex-col md:w-fit
              hover:bg-gray-300 hover:cursor-pointer
                "
                >
                  <img
                    className="max-w-[100px] md:max-w-[150px]"
                    src={require("../../assets/images/model_placeholder.png")}
                    alt="Model"
                  />
                  <div>
                    {process.model === undefined
                      ? index
                      : process.model.title === undefined
                      ? "process.model.name"
                      : process.model.title}
                  </div>
                  <div>Bli Bla Blub</div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <hr />
      <section className="flex flex-col gap-5">
        <h2>Hersteller: {manufacturerList.length}</h2>
        <div
          className="
          relative
          flex flex-col items-center justify-start mb-6 md:m-0
          "
        >
          <div
            className={`
            flex flex-col items-center justify-start gap-5 w-full
            md:flex-row md:overflow-x-auto 
            ${manufacturerOpen === true ? "" : "max-h-96 overflow-hidden"}
            `}
          >
            {manufacturerList.map(
              (manufacturer: IManufacturer, index: number) => (
                <div
                  key={index}
                  className="       
                flex flex-row items-center justify-between 
                w-full bg-gray-100
                md:flex-col md:w-fit
                hover:bg-gray-300 hover:cursor-pointer"
                >
                  <img
                    className="max-w-[200px] md:max-w-[300px]"
                    src={require("../../assets/images/firm_logo_placeholder.png")}
                    alt="Model"
                  />
                  {manufacturer.name}
                </div>
              )
            )}
          </div>
        </div>
      </section>
      <hr />
      <section className="flex flex-col md:flex-row gap-3 md:gap-5 justify-center items-center text-white">
        <Button>Stonieren</Button>
        <Button>Nachrichten</Button>
        <Button>nochmal bestellen</Button>
      </section>
    </li>
  );
};

export default OrderItem;
