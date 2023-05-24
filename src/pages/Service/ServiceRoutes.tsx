import CardView, { CardGroupData, CardItemData } from "@/components/CardView";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";

import _ServiceCards from "./ServiceCards.json";
import ServiceView from "./ServiceView";
const ServiceCards = _ServiceCards as CardItemData[];
const cardsUse: CardItemData[] = [
  ...ServiceCards.map((card: CardItemData) => ({
    icon: card.icon,
    link: `/service/use/${card.link}`,
    title: card.title,
  })),
];
const cardsProvide: CardItemData[] = [
  ...ServiceCards.map((card: CardItemData) => ({
    icon: card.icon,
    link: `/service/provide/${card.link}`,
    title: card.title,
  })),
];
const cardGoupsIndex: CardGroupData[] = [
  {
    title: "use",
    cards: cardsUse,
  },
  {
    title: "provide",
    cards: cardsProvide,
  },
];

const ServiceRoutes: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route
        index
        element={
          <CardView title="ServiceRoutes.title" cardGroups={cardGoupsIndex} />
        }
      />
      <Route
        path="use"
        element={
          <CardView
            title={t("Service.ServiceRoutes.use")}
            cardGroups={[{ cards: cardsUse }]}
          />
        }
      />
      <Route path="use/produce" element={<Navigate to="/process/model" />} />
      <Route
        path="use/design"
        element={
          <h2>
            {t("Service.ServiceRoutes.design")}
            {t("Service.ServiceRoutes.let")}
          </h2>
        }
      />
      <Route
        path="use/accompany"
        element={
          <h2>
            {t("Service.ServiceRoutes.accompany")}
            {t("Service.ServiceRoutes.let")}
          </h2>
        }
      />
      <Route
        path="provide"
        element={
          <CardView
            title={t("Service.ServiceRoutes.provide")}
            cardGroups={[{ cards: cardsProvide }]}
          />
        }
      />
      <Route
        path="provide/produce"
        element={<ServiceView title={t("Service.ServiceRoutes.produce")} />}
      />
      <Route
        path="provide/design"
        element={<h2>{t("Service.ServiceRoutes.design")}</h2>}
      />
      <Route
        path="provide/accompany"
        element={<h2>{t("Service.ServiceRoutes.accompany")}</h2>}
      />
    </Routes>
  );
};

export default ServiceRoutes;
