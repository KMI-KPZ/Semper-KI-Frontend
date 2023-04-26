import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import CardView, { ICardGroup, ICardItem } from "../CardView/CardView";
import "./Service.scss";

import _ServiceCards from "./ServiceCards.json";
import ServiceView from "./ServiceView";
const ServiceCards = _ServiceCards as ICardItem[];
const cardsUse: ICardItem[] = [
  ...ServiceCards.map((card: ICardItem) => ({
    icon: card.icon,
    link: `/service/use/${card.link}`,
    title: card.title,
  })),
];
const cardsProvide: ICardItem[] = [
  ...ServiceCards.map((card: ICardItem) => ({
    icon: card.icon,
    link: `/service/provide/${card.link}`,
    title: card.title,
  })),
];
const cardGoupsIndex: ICardGroup[] = [
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
          <CardView title="service.use" cardGroups={[{ cards: cardsUse }]} />
        }
      />
      <Route path="use/produce" element={<Navigate to="/process/model" />} />
      <Route path="use/design" element={<h2>Entwerfen lassen</h2>} />
      <Route
        path="use/accompany"
        element={<h2>Gesamtprozess begleiten lasssen</h2>}
      />
      <Route
        path="provide"
        element={
          <CardView
            title="service.provide"
            cardGroups={[{ cards: cardsProvide }]}
          />
        }
      />
      <Route
        path="provide/produce"
        element={<ServiceView title="provide-produce" />}
      />
      <Route path="provide/design" element={<h2>Entwerfen</h2>} />
      <Route
        path="provide/accompany"
        element={<h2>Gesamtprozess begleiten</h2>}
      />
    </Routes>
  );
};

export default ServiceRoutes;
