import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { EProcessStatusType } from "../../types";

interface Props {
  title: string;
  path: string;
  active: boolean;
}

const ServiceManufacturingWizardItem: React.FC<Props> = (props) => {
  const { title, path, active } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnClickCard = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate(path);
  };

  return (
    <div
      className={`flex flex-row items-center gap-3 p-2 text-black hover:cursor-pointer hover:bg-gray-300 ${
        active === true ? "bg-gray-100" : ""
      }`}
      onClick={handleOnClickCard}
    >
      <div className="flex flex-col">
        {t(title)}
        {active === true ? (
          <hr className="w-full border-b-2 border-b-black" />
        ) : null}
      </div>
      {/* <ProcessHeaderStatusIcon statusType={statusType} /> */}
    </div>
  );
};

export default ServiceManufacturingWizardItem;
