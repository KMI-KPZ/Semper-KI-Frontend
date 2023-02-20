import React from "react";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import "./CardView.scss";

interface Props {
  path: string;
  onClickCard?(link: string): void;
  cardGroups?: ICardGroup[];
  cards?: ICardItem[];
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
  const { path, cards, cardGroups, onClickCard } = props;
  const { t } = useTranslation();

  const calcRowCount = (): string => {
    let rowCount = 2;
    return `row-${rowCount}`;
  };

  return (
    <div className="card-view row-1">
      <h1>{t(`card-view.${path}.title`)}</h1>
      {cardGroups !== undefined ? (
        <div className="card-view-row">
          {cardGroups.map((cardgroup: ICardGroup, index: number) => (
            <div className="card-view-column" key={index}>
              <h2>{t(`card-view.${path}.${cardgroup.path}.title`)}</h2>
              <div className={`card-view-group ${calcRowCount()}`}>
                {cardgroup.cards.map(
                  (carditem: ICardItem, cardIndex: number) => (
                    <Card
                      onClickCard={onClickCard}
                      carditem={carditem}
                      key={cardIndex}
                      prefix={[path, cardgroup.path]}
                    />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {cards !== undefined ? (
        <div className={`card-view-group ${calcRowCount()}`}>
          {cards.map((carditem: ICardItem, cardIndex: number) => (
            <Card
              carditem={carditem}
              key={cardIndex}
              prefix={[path]}
              onClickCard={onClickCard}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CardView;
