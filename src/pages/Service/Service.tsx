import React from "react";
import { useTranslation } from "react-i18next";
import ServiceSelect from "./Select/Select";

interface ServiceProps {}

const Service: React.FC<ServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col-reverse justify-between gap-5 md:flex-row">
      <ServiceSelect />
    </div>
  );
};

export default Service;
