import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { twMerge } from "tailwind-merge";

interface CardProps {
  className?: string;
  onClick?(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void;
  hoverEffects?: boolean;
}

const Card: React.FC<PropsWithChildren<CardProps>> = (props) => {
  const { children, className, onClick, hoverEffects = true } = props;
  const { t } = useTranslation();

  return (
    <a
      href="#"
      className={twMerge(
        `
        flex 
        flex-col
        items-center
        justify-center
        gap-5
        rounded-xl 
        border-2 
        border-blau-button
        p-5
        shadow-card 
        
        `,
        hoverEffects
          ? `duration-300
        hover:cursor-pointer
        hover:shadow-button-inner-primary
        focus:shadow-button-inner-primary `
          : "",
        className
      )}
      onClick={onClick}
    >
      {children}
    </a>
  );
};

export default Card;
