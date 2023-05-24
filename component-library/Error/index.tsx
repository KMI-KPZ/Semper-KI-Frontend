import React from "react";
import { useTranslation } from "react-i18next";
import { TError } from "../../src/interface/types";

interface Props {
  errors: TError[];
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
