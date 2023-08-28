import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router-dom";

interface usePathIDReturnProps {
  getOrderID(): string | undefined;
  getSubOrderID(): string | undefined;
}

const usePathID = (): usePathIDReturnProps => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { orderID, subOrderID } = useParams();

  const getOrderID = (): string | undefined => {
    if (orderID !== undefined) return orderID;
    return undefined;
  };
  const getSubOrderID = (): string | undefined => {
    if (subOrderID !== undefined) return subOrderID;
    return undefined;
  };

  return { getOrderID, getSubOrderID };
};

export default usePathID;
