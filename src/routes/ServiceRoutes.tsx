import logger from "@/hooks/useLogger";
import { ServiceManufacturing } from "@/pages/Service/Manufacturing/Manufacturing";
import ServiceModeling from "@/pages/Service/Modelling/Modelling";
import Service from "@/pages/Service/Service";
import { DefinedProcessOutlet } from "@/routeOutlets/DefinedProcessOutlet";
import ManufacturingProcessOutlet from "@/routeOutlets/ManufacturingProcessOutlet";
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
    <Modal
      modalKey="ServiceRoutes"
      open={true}
      closeModal={closeModal}
      className=" bg-gray-100 md:max-w-7xl"
    >
      <Routes>
        <Route element={<DefinedProcessOutlet />}>
          <Route index element={<Service />} />
          <Route
            path="manufacturing/*"
            element={
              <ManufacturingProcessOutlet>
                <ServiceManufacturing />
              </ManufacturingProcessOutlet>
            }
          />
          <Route path="modeling/*" element={<ServiceModeling />} />
          <Route path="*" element={<Navigate to="." />} />
        </Route>
      </Routes>
    </Modal>
  );
};

export default ServiceRoutes;
