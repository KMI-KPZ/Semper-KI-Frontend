import { Button } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getIconByName, IconExpand } from "../../config/Icons";
import { IManufacturer, IOrder, IProcessItem } from "../../interface/Interface";

interface Props {
  order: IOrder;
}

interface State {
  processOpen: boolean;
  manufacturerOpen: boolean;
}

const OrderItem: React.FC<Props> = (props) => {
  const { order } = props;
  const processBox = useRef<HTMLDivElement>(null);
  const manufacturerBox = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>({
    processOpen: false,
    manufacturerOpen: false,
  });
  const { processOpen, manufacturerOpen } = state;

  const calcManufacturer = (): IManufacturer[] => {
    let manufacturerList: IManufacturer[] = [];
    order.processList.forEach((process: IProcessItem) => {
      const manufacturer = process.manufacturer;
      if (manufacturer !== undefined) {
        manufacturerList.push(manufacturer);
      }
    });
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
        <h2>Bestellung: {order.orderId}</h2>
        <h2>Datum: {new Date().getDate()}</h2>
        <h2>Status: {order.orderState}</h2>
      </section>
      <hr />
      <section className="flex flex-col gap-5">
        <h2>Artikel : {order.processList.length}</h2>
        <div
          className="
          relative
          flex flex-col items-center justify-start mb-6 md:m-0
          "
        >
          <div
            ref={processBox}
            className={`
            flex flex-col items-center justify-start gap-5 w-full
            md:flex-row md:overflow-x-scroll 
            ${processOpen === true ? "" : "max-h-96 overflow-hidden"}
            `}
          >
            {order.processList.map((process: IProcessItem, index: number) => (
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
            ))}
          </div>
          {isElementBiggerThanPx(processBox, 384) === true ? (
            <div
              className="absolute bottom-0 md:hidden border-b-2 border-gray-700 w-full flex flex-row justify-center"
              onClick={handleOnClickProcessExpand}
            >
              <img
                src={IconExpand}
                className={`rounded-full border-2 border-gray-700 p-2 h-12 translate-y-6 bg-white hover:bg-gray-300 hover:cursor-pointer 
              ${processOpen === true ? "rotate-180" : ""}`}
              />
            </div>
          ) : null}
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
            ref={manufacturerBox}
            className={`
            flex flex-col items-center justify-start gap-5 w-full
            md:flex-row md:overflow-x-scroll 
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
          {isElementBiggerThanPx(manufacturerBox, 384) === true ? (
            <div
              className="absolute bottom-0 md:hidden border-b-2 border-gray-700 w-full flex flex-row justify-center"
              onClick={handleOnClickManufacturerExpand}
            >
              <img
                src={IconExpand}
                className={`rounded-full border-2 border-gray-700 p-2 h-12 translate-y-6 bg-white hover:bg-gray-300 hover:cursor-pointer 
              ${manufacturerOpen === true ? "rotate-180" : ""}`}
              />
            </div>
          ) : null}
        </div>
      </section>
      <hr />
      <section className="flex flex-col md:flex-row gap-3 md:gap-5 justify-center items-center text-white">
        <div className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer">
          Auftrag Stonieren
        </div>
        <div className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer">
          Nachrichten
        </div>
        <div className="w-full md:w-fit flex flex-row justify-center px-3 py-2 bg-blue-600 rounded hover:bg-blue-400 hover:cursor-pointer">
          Auftrag nochmal bestellen
        </div>
      </section>
    </li>
  );
};

export default OrderItem;
