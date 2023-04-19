import React from "react";
import { useTranslation } from "react-i18next";
import { IOrderCollection } from "../../interface/Interface";
import { useOrders } from "../../hooks/useOrders";
import Loading from "../Loading/Loading";
import OrderCollection from "./OrderCollection";
import { EUserType } from "../../interface/enums";

interface Props {
  userType: EUserType;
}

const OrderOverview: React.FC<Props> = (props) => {
  const { userType } = props;
  const { t } = useTranslation();
  const { data, status, error } = useOrders();

  return (
    <Loading error={error} status={status}>
      <div className="flex flex-col items-center w-full gap-5 overflow-x-auto overflow-y-hidden p-3">
        <h1 className="bg-white w-full py-3 text-center">
          {t(
            userType === EUserType.client
              ? "orderview.headline.client"
              : "orderview.headline.manufacturer"
          )}
        </h1>
        {data !== undefined ? (
          <ul className="w-full gap-5 flex flex-col">
            {data.length > 0 ? (
              data.map((orderCollection: IOrderCollection, index: number) => (
                <OrderCollection
                  orderCollection={orderCollection}
                  userType={userType}
                  key={index}
                />
              ))
            ) : (
              <li className="w-full text-center p-3">
                keine vorhandenen Bestellungen
              </li>
            )}
          </ul>
        ) : null}
      </div>
    </Loading>
  );
};

export default OrderOverview;
