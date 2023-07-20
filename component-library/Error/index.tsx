import { ErrorType } from "@/types/general";
import React from "react";
import { useTranslation } from "react-i18next";
import { Heading } from "..";

interface Props {
  errors: ErrorType[];
  itemName: string;
}

export const ErrorView: React.FC<Props> = (props) => {
  const { errors, itemName } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      {errors.map((error, index) => (
        <Heading variant="h2" key={index}>
          {t(`General.ErrorView.${error}`, {
            itemName,
          })}
        </Heading>
      ))}
    </div>
  );
};
