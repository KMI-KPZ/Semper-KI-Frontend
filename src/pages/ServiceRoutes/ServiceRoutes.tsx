import CardView, { CardGroupType, CardItemType } from "@/components/CardView";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import ServiceItem from "./components/Item";

import _ServiceCards from "./data/items.json";
import Service from "./Service/Service";
const ServiceCards = _ServiceCards as CardItemType[];
const cardsUse: CardItemType[] = [
  ...ServiceCards.map((card: CardItemType) => ({
    icon: card.icon,
    link: `/service/use/${card.link}`,
    title: card.title,
  })),
];
const cardsProvide: CardItemType[] = [
  ...ServiceCards.map((card: CardItemType) => ({
    icon: card.icon,
    link: `/service/provide/${card.link}`,
    title: card.title,
  })),
];
const cardGoupsIndex: CardGroupType[] = [
  {
    title: "use",
    cards: cardsUse,
  },
  {
    title: "provide",
    cards: cardsProvide,
  },
];

export interface IService {
  title: string;
  chapters: IServiceChapter[];
}

export interface IServiceChapter {
  title: string;
  icon: string;
  questions: IServiceQuestion[];
}

export interface IServiceQuestion {
  title: string;
  type: EServiceQuestionType;
  options?: string[];
  range?: [number, number];
  answer?: number | string;
}

export enum EServiceQuestionType {
  "text",
  "textarea",
  "selection",
  "number",
}

const ServiceRoutes: React.FC = () => {
  const { t } = useTranslation();

  return (
    <Routes>
      <Route index element={<div>Übersicht</div>} />
      <Route path="/:serviceName" element={<Service />} />
    </Routes>
  );
};

export default ServiceRoutes;
