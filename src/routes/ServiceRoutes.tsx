import { ProcessContext } from "@/contexts/ProcessContext";
import { ProjectContext } from "@/contexts/ProjectContext";
import { ServiceManufacturing } from "@/pages/Service/Manufacturing/Manufacturing";
import ServiceModeling from "@/pages/Service/Modelling/Modelling";
import Service from "@/pages/Service/Service";
import { ServiceContextProvider } from "@/pages/Service/context/ServiceContext";
import { Modal } from "@component-library/index";
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
      modalKey="ServiceRoutes"
      open={true}
      closeModal={closeModal}
      className="md:max-w-7xl"
    >
      <Routes>
        <Route element={<ServiceContextProvider />}>
          <Route index element={<Service />} />
          {/* <Route path="edit" element={<ServiceEdit />} /> */}
          <Route path="manufacturing/*" element={<ServiceManufacturing />} />
          <Route path="modeling/*" element={<ServiceModeling />} />
          <Route path="*" element={<Navigate to="." />} />
        </Route>
      </Routes>
      {/* <ServiceOverview /> */}
    </Modal>
    // </div>
  );
};

export default ServiceRoutes;
