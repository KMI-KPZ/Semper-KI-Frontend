import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";
import Service from "../Service/Service";
import ServiceOverview from "../Service/Overview/Overview";
import ServiceSelect from "../Service/Select/Select";
import { ServiceManufacturing } from "../Service/Manufacturing/Manufacturing";
import { ServiceType } from "../Service/hooks/useService";
import ServiceModeling from "../Service/Modelling/Modelling";
import { ServiceContextProvider } from "../Service/context/ServiceContext";
import ServiceEdit from "../Service/Edit/Edit";

interface ServiceRoutesProps {}

const ServiceRoutes: React.FC<ServiceRoutesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col-reverse justify-between gap-5 md:flex-row">
      <Routes>
        <Route element={<ServiceContextProvider />}>
          <Route index element={<ServiceSelect />} />
          <Route path="edit" element={<ServiceEdit />} />
          <Route path="manufacturing/*" element={<ServiceManufacturing />} />
          <Route
            path="modeling/*"
            element={<ServiceModeling type={ServiceType.MODELING} />}
          />
          <Route path="*" element={<Navigate to="." />} />
        </Route>
      </Routes>
      <ServiceOverview />
    </div>
  );
};

export default ServiceRoutes;
