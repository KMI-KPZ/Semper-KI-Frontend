import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IOrderCollection,
  IOrderCollectionEvent,
} from "../../interface/Interface";
import { useOrders } from "../../hooks/useOrders";
import LoadingSuspense from "../General/LoadingSuspense";
import OrderCollection from "./OrderCollection";
import { EUserType } from "../../interface/enums";
import { AppContext } from "../App/App";

interface Props {
  userType: EUserType;
}

const OrderCollectionOverview: React.FC<Props> = (props) => {
  const { userType } = props;
  const { t } = useTranslation();
  const { ordersQuery } = useOrders();
  const [state, setState] = useState<boolean[]>([]);
  const { appState } = useContext(AppContext);
  const { missedEvents } = appState;

  const toggleOpen = (index: number) => {
    setState((prevState) => [
      ...prevState.filter((open, _index) => _index < index),
      !prevState[index],
      ...prevState.filter((open, _index) => _index > index),
    ]);
  };

  useEffect(() => {
    if (ordersQuery.data !== undefined && state.length === 0)
      setState(
        ordersQuery.data.map((open, index) => (index === 0 ? true : false))
      );
  }, [ordersQuery.data]);

  const getOrderCollectionEventByID = (
    orderCollectionID: string
  ): IOrderCollectionEvent | undefined => {
    if (missedEvents === undefined || missedEvents.length < 1) return undefined;
    return missedEvents.find(
      (orderEvent) => orderEvent.orderCollectionID === orderCollectionID
    );
  };

  return (
    <LoadingSuspense query={ordersQuery}>
      <div className="flex flex-col items-center w-full gap-5 overflow-x-auto overflow-y-hidden p-3">
        <h1 className="bg-white w-full py-3 text-center">
          {t(
            userType === EUserType.client
              ? "Orders.OrderCollectionOverview.headline.client"
              : "Orders.OrderCollectionOverview.headline.manufacturer"
          )}
        </h1>
        {ordersQuery.data !== undefined ? (
          <ul className="w-full gap-5 flex flex-col">
            {ordersQuery.data.length > 0 ? (
              ordersQuery.data
                .slice(0)
                .reverse()
                .map((orderCollection: IOrderCollection, index: number) => (
                  <OrderCollection
                    index={index}
                    orderCollection={orderCollection}
                    userType={userType}
                    isOpen={state[index]}
                    toggleOpen={toggleOpen}
                    orderCollectionEvent={getOrderCollectionEventByID(
                      orderCollection.id
                    )}
                    key={index}
                  />
                ))
            ) : (
              <li className="w-full text-center p-3">
                {t("Orders.OrderCollectionOverview.empty")}
              </li>
            )}
          </ul>
        ) : null}
      </div>
    </LoadingSuspense>
  );
};

export default OrderCollectionOverview;
