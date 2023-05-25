import { ErrorType } from "@/types/general";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  errors: ErrorType[];
  itemName: string;
}

export const ErrorView: React.FC<Props> = (props) => {
  const { errors, itemName } = props;
  const { t } = useTranslation();

  return (
    <div className="felx-col flex gap-3">
      {errors.map((error, index) => (
        <h2 className="text-bold text-red-500" key={index}>
          {t(`General.ErrorView.${error}`, {
            itemName,
          })}
        </h2>
      ))}
    </div>
  );
};
