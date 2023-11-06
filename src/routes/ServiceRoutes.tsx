import ServiceEdit from "@/pages/Service/Edit/Edit";
import { ServiceManufacturing } from "@/pages/Service/Manufacturing/Manufacturing";
import ServiceModeling from "@/pages/Service/Modelling/Modelling";
import ServiceSelect from "@/pages/Service/Select/Select";
import { ServiceContextProvider } from "@/pages/Service/context/ServiceContext";
import { ServiceType } from "@/pages/Service/hooks/useService";
import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes } from "react-router-dom";

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
      {/* <ServiceOverview /> */}
    </div>
  );
};

export default ServiceRoutes;
