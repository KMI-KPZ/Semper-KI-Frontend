import { ProcessContext } from "@/pages/Projects/context/ProcessContext";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";
import ServiceEdit from "@/pages/Service/Edit/Edit";
import { ServiceManufacturing } from "@/pages/Service/Manufacturing/Manufacturing";
import ServiceModeling from "@/pages/Service/Modelling/Modelling";
import ServiceSelect from "@/pages/Service/Select/Select";
import { ServiceContextProvider } from "@/pages/Service/context/ServiceContext";
import { ServiceType } from "@/pages/Service/hooks/useService";
import Modal from "@component-library/Modal";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

interface ServiceRoutesProps {}

const ServiceRoutes: React.FC<ServiceRoutesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { project } = useContext(ProjectContext);
  const { process } = useContext(ProcessContext);

  const closeModal = () => {
    navigate(`/projects/${project.projectID}/${process.processID}`);
  };

  return (
    // <div className="flex w-full flex-col-reverse justify-between gap-5 md:flex-row">
    <Modal
      open={true}
      closeModal={closeModal}
      className="h-full w-full rounded-xl bg-white bg-opacity-80 p-10 md:max-w-7xl"
    >
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
    </Modal>
    // </div>
  );
};

export default ServiceRoutes;
