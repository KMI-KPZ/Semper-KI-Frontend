import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AppContext } from "../App";
import { LoadingSuspense } from "@component-library/Loading";
import { IOrderCollection, useOrders } from "./hooks/useOrders";
import { OrderCollectionEvent, UserType } from "@/hooks/useUser";
import OrderCollection from "./components/OrderCollection";

interface Props {
  userType: UserType;
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
  ): OrderCollectionEvent | undefined => {
    if (missedEvents === undefined || missedEvents.length < 1) return undefined;
    return missedEvents.find(
      (orderEvent) => orderEvent.orderCollectionID === orderCollectionID
    );
  };

  return (
    <LoadingSuspense query={ordersQuery}>
      <div className="flex w-full flex-col items-center gap-5 overflow-x-auto overflow-y-hidden p-3">
        <h1 className="w-full bg-white py-3 text-center">
          {t(
            userType === UserType.client
              ? "Orders.OrderCollectionOverview.headline.client"
              : "Orders.OrderCollectionOverview.headline.manufacturer"
          )}
        </h1>
        {ordersQuery.data !== undefined ? (
          <ul className="flex w-full flex-col gap-5">
            {ordersQuery.data.length > 0 ? (
              ordersQuery.data.map(
                (orderCollection: IOrderCollection, index: number) => (
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
                )
              )
            ) : (
              <li className="w-full p-3 text-center">
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
