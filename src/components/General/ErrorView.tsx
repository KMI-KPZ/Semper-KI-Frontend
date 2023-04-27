import React from "react";
import { useTranslation } from "react-i18next";
import { TError } from "../../interface/types";

interface Props {
  errors: TError[];
  itemName: string;
}

const ErrorView: React.FC<Props> = (props) => {
  const { errors, itemName } = props;
  const { t } = useTranslation();

  return (
    <div className="flex felx-col gap-3">
      {errors.map((error, index) => (
        <h2 className="text-red-500 text-bold" key={index}>
          {t(`General.error.${error}`, {
            itemName,
          })}
        </h2>
      ))}
    </div>
  );
};

export default ErrorView;
