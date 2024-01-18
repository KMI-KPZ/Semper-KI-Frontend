import { ErrorType } from "@/types/general";
import React from "react";
import { Heading } from "..";
import { useTranslation } from "react-i18next";

interface Props {
  errors: ErrorType[];
  itemName: string;
}

export const ErrorView: React.FC<Props> = (props) => {
  const { errors, itemName: name } = props;
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      {errors.map((error, index) => (
        <Heading variant="h2" key={index}>
          {t(`component-library.Error.${error}`, { name })}
        </Heading>
      ))}
    </div>
  );
};
