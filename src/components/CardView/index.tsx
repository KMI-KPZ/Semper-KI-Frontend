import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import Card from "./components/Card";

type Props = {
  title?: string;
  cardGroups: CardGroupType[];
};

export type CardGroupType = {
  title?: string;
  cards: CardItemType[];
};

export type CardItemType = {
  title: string;
  link: string;
  icon?: React.ReactNode;
  onClick?(): void;
};

const CardView: React.FC<Props> = (props) => {
  const { cardGroups, title } = props;
  const { t } = useTranslation();

  const renderCards = (cards: CardItemType[]): JSX.Element => (
    <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row md:flex-wrap">
      {cards.map((carditem: CardItemType, cardIndex: number) => (
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
      {title !== undefined ? <Heading variant="h1">{t(title)}</Heading> : null}
      <div className="flex w-full flex-col items-center justify-center gap-5">
        {cardGroups.map((cardgroup: CardGroupType, index: number) => (
          <div
            className="flex w-full flex-col items-center justify-center gap-5"
            key={index}
          >
            {cardgroup.title !== undefined ? (
              <Heading variant="h3" className="text-center">
                {t(cardgroup.title)}
              </Heading>
            ) : null}
            {renderCards(cardgroup.cards)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardView;
