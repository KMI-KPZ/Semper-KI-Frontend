import CardView, { CardGroupType, CardItemType } from "@/components/CardView";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import ServiceView from "./components/view";

import _ServiceCards from "./data/items.json";
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
