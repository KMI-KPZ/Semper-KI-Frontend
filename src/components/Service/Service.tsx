import React, { useState } from "react";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import CardView, { ICardGroup, ICardItem } from "../Cards/CardView";
import "./Service.scss";

import _ServiceCards from "./ServiceCards.json";
import { useTranslation } from "react-i18next";
const ServiceCards = _ServiceCards as ICardItem[];

const Service: React.FC = ({}) => {
  const { t } = useTranslation();
  const cardGoupsIndex: ICardGroup[] = [
    {
      title: "Nutzen",
      cards: ServiceCards.map((card: ICardItem) => ({
        icon: card.icon,
        link: `/service/use/${card.link}`,
        title: t(`service.use.${card.title}`),
      })),
    },
    {
      title: "Anbieten",
      cards: ServiceCards.map((card: ICardItem) => ({
        icon: card.icon,
        link: `/service/provide/${card.link}`,
        title: t(`service.provide.${card.title}`),
      })),
    },
  ];
  const cardsUse: ICardItem[] = [
    ...ServiceCards.map((card: ICardItem) => ({
      icon: card.icon,
      link: `/service/use/${card.link}`,
      title: t(`service.use.${card.title}`),
    })),
  ];
  const cardsProvide: ICardItem[] = [
    ...ServiceCards.map((card: ICardItem) => ({
      icon: card.icon,
      link: `/service/provide/${card.link}`,
      title: t(`service.provide.${card.title}`),
    })),
  ];
  return (
    <Routes>
      <Route
        index
        element={<CardView title="service" cardGroups={cardGoupsIndex} />}
      />
      <Route
        path="use"
        element={<CardView title="service" cards={cardsUse} />}
      />
      <Route path="use/produce" element={<Navigate to="/process/model" />} />
      <Route path="use/design" element={<h2>Entwerfen lassen</h2>} />
      <Route
        path="use/accompany"
        element={<h2>Gesamtprozess begleiten lasssen</h2>}
      />
      <Route
        path="provide"
        element={<CardView title="service" cards={cardsProvide} />}
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

export default Service;
