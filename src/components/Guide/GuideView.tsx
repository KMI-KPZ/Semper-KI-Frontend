import React from "react";
import { Route, Routes } from "react-router-dom";
import CardView, { ICardGroup, ICardItem } from "../Cards/CardView";
import { IFilterItem } from "../Process/Filter/Interface";
import Guide from "./Guide";
import _GuideCards from "./GuideCards.json";
const GuideCards = _GuideCards as ICardItem[];

interface Props {
  setFilter(filter: IFilterItem[]): void;
}

const cardsUse: ICardItem[] = [
  ...GuideCards.map((card: ICardItem) => ({
    icon: card.icon,
    link: `/guide/use/${card.link}`,
    title: card.title,
  })),
];
const cardsProvide: ICardItem[] = [
  ...GuideCards.map((card: ICardItem) => ({
    icon: card.icon,
    link: `/guide/provide/${card.link}`,
    title: card.title,
  })),
];
const cardGoupsGuide: ICardGroup[] = [
  {
    path: "use",
    cards: cardsUse,
  },
  {
    path: "provide",
    cards: cardsProvide,
  },
];

const GuideView: React.FC<Props> = ({ setFilter }) => {
  return (
    <Routes>
      <Route
        index
        element={<CardView path="guide" cardGroups={cardGoupsGuide} />}
      />
      <Route
        path="use"
        element={<CardView path="guide.use" cards={cardsUse} />}
      />
      <Route
        path="provide"
        element={<CardView path="guide.provide" cards={cardsProvide} />}
      />
      <Route path="use/produce" element={<Guide setFilter={setFilter} />} />
    </Routes>
  );
};

export default GuideView;
