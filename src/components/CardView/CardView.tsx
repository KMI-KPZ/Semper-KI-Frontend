import React from "react";
import { useTranslation } from "react-i18next";
import Card from "./Card";

type Props = {
  title?: string;
  cardGroups: CardGroupData[];
};

export type CardGroupData = {
  title?: string;
  cards: CardItemData[];
};

export type CardItemData = {
  title: string;
  link: string;
  icon?: React.ReactNode;
  onClick?(): void;
};

const CardView: React.FC<Props> = (props) => {
  const { cardGroups, title } = props;
  const { t } = useTranslation();

  const renderCards = (cards: CardItemData[]): JSX.Element => (
    <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-5 w-full">
      {cards.map((carditem: CardItemData, cardIndex: number) => (
        <Card
          onClickCard={carditem.onClick}
          carditem={carditem}
          key={cardIndex}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full p-4 md:p-0 max-w-7xl">
      {title !== undefined ? <h1 className="text-center">{t(title)}</h1> : null}
      <div className="flex flex-col gap-5 justify-center items-center w-full">
        {cardGroups.map((cardgroup: CardGroupData, index: number) => (
          <div
            className="flex flex-col gap-5 justify-center items-center w-full"
            key={index}
          >
            {cardgroup.title !== undefined ? (
              <h3 className="text-center">{t(cardgroup.title)}</h3>
            ) : null}
            {renderCards(cardgroup.cards)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardView;
