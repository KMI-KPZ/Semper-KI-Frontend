import { ServiceManufacturing } from "@/pages/Service/Manufacturing/Manufacturing";
import ServiceModeling from "@/pages/Service/Modelling/Modelling";
import Service from "@/pages/Service/Service";
import { ServiceContextProvider } from "@/contexts/ServiceContext";
import { Modal } from "@component-library/index";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
} from "react-router-dom";
import { ServiceOutlet } from "@/routeOutlets/ServiceOutlet";

interface ServiceRoutesProps {}

const ServiceRoutes: React.FC<ServiceRoutesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projectID, processID } = useParams();

  const closeModal = () => {
    navigate(`/projects/${projectID}/${processID}`);
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
        <Route element={<ServiceOutlet />}>
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
