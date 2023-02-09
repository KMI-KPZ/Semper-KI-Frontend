import React, { useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import CardView, { ICardGroup, ICardItem } from "../CardView/CardView";
import "./Service.scss";

import _ServiceCards from "./ServiceCards.json";
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
    path: "use",
    cards: cardsUse,
  },
  {
    path: "provide",
    cards: cardsProvide,
  },
];

const ServiceRoutes: React.FC = ({}) => {
  return (
    <Routes>
      <Route
        index
        element={<CardView path="service" cardGroups={cardGoupsIndex} />}
      />
      <Route
        path="use"
        element={<CardView path="service.use" cards={cardsUse} />}
      />
      <Route path="use/produce" element={<Navigate to="/process/model" />} />
      <Route path="use/design" element={<h2>Entwerfen lassen</h2>} />
      <Route
        path="use/accompany"
        element={<h2>Gesamtprozess begleiten lasssen</h2>}
      />
      <Route
        path="provide"
        element={<CardView path="service.provide" cards={cardsProvide} />}
      />
      <Route path="provide/produce" element={<h2>Herstellen</h2>} />
      <Route path="provide/design" element={<h2>Entwerfen</h2>} />
      <Route
        path="provide/accompany"
        element={<h2>Gesamtprozess begleiten</h2>}
      />
    </Routes>
  );
};

export default ServiceRoutes;
