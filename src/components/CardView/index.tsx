import React from "react";
import { useTranslation } from "react-i18next";
import Card from "./components/Card";

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
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap">
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
    <div className="flex w-full max-w-7xl flex-col items-center justify-center gap-5 p-4 md:p-0">
      {title !== undefined ? <h1 className="text-center">{t(title)}</h1> : null}
      <div className="flex w-full flex-col items-center justify-center gap-5">
        {cardGroups.map((cardgroup: CardGroupData, index: number) => (
          <div
            className="flex w-full flex-col items-center justify-center gap-5"
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
