import React from "react";
import { useTranslation } from "react-i18next";
import Card from "./Card";
import "./CardView.scss";

interface Props {
  title: string;
  cardGroups?: ICardGroup[];
  cards?: ICardItem[];
}

export interface ICardGroup {
  title: string;
  cards: ICardItem[];
}

export interface ICardItem {
  title: string;
  link: string;
  icon?: string;
}

const CardView: React.FC<Props> = ({ title, cards, cardGroups }) => {
  const { t } = useTranslation();
  return (
    <div className="card-view">
      <h1>{t(`card-view.${title}.title`)}</h1>
      {cardGroups !== undefined ? (
        <div className="card-view-row">
          {cardGroups.map((cardgroup: ICardGroup, index: number) => (
            <div className="card-view-column" key={index}>
              <h2>{cardgroup.title}</h2>
              <div className="card-view-group">
                {cardgroup.cards.map(
                  (carditem: ICardItem, cardIndex: number) => (
                    <Card carditem={carditem} key={cardIndex} />
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      ) : null}
      {cards !== undefined ? (
        <div className="card-view-group">
          {cards.map((carditem: ICardItem, cardIndex: number) => (
            <Card carditem={carditem} key={cardIndex} />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default CardView;
