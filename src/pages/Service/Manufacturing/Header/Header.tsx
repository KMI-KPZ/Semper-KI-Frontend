import React, { useContext } from "react";
import { ServiceManufacturingContext } from "../Manufacturing";
import ProcessHeaderSearch from "./Search/Search";
import { ServiceManufacturingWizard } from "./Wizard/Wizard";
import { Heading } from "@component-library/Typography";
import { useLocation } from "react-router-dom";

const ProcessHeader: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 bg-white p-2">
        <ServiceManufacturingWizard />
        <ProcessHeaderSearch />
      </div>
    </div>
  );
};

export default ProcessHeader;
