import React from "react";
import { useTranslation } from "react-i18next";
import Card from "./Card";
// import "./CardView.scss";

interface Props {
  path: string;
  onClickCard?(link: string): void;
  cardGroups?: ICardGroup[];
  cards?: ICardItem[];
  children?: JSX.Element;
}

export interface ICardGroup {
  path: string;
  cards: ICardItem[];
}

export interface ICardItem {
  title: string;
  link: string;
  icon?: string;
}

const CardView: React.FC<Props> = (props) => {
  const { path, cards, cardGroups, onClickCard, children } = props;
  const { t } = useTranslation();

  const renderCards = (cards: ICardItem[], prefix: string[]): JSX.Element => (
    <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-5 w-full">
      {cards.map((carditem: ICardItem, cardIndex: number) => (
        <Card
          onClickCard={onClickCard}
          carditem={carditem}
          key={cardIndex}
          prefix={prefix}
        />
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-5 justify-center items-center w-full p-4 md:p-0 max-w-7xl">
      <h1 className="text-center">{t(`card-view.${path}.title`)}</h1>
      {children}
      {cardGroups !== undefined ? (
        <div className="flex flex-col gap-5 justify-center items-center w-full">
          {cardGroups.map((cardgroup: ICardGroup, index: number) => (
            <div
              className="flex flex-col gap-5 justify-center items-center w-full"
              key={index}
            >
              <h2 className="text-center">
                {t(`card-view.${path}.${cardgroup.path}.title`)}
              </h2>
              {renderCards(cardgroup.cards, [path, cardgroup.path])}
            </div>
          ))}
        </div>
      ) : null}
      {cards !== undefined ? renderCards(cards, [path]) : null}
    </div>
  );
};

export default CardView;
