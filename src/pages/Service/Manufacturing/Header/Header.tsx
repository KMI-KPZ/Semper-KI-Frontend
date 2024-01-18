import React, { useContext } from "react";
import { ServiceManufacturingContext } from "../Manufacturing";
import ProcessHeaderSearch from "./Search/Search";
import { ServiceManufacturingWizard } from "./Wizard/Wizard";
import { Heading } from "@component-library/index";
import { useLocation } from "react-router-dom";

const ProcessHeader: React.FC = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4  bg-white p-3">
        <ServiceManufacturingWizard />
        <ProcessHeaderSearch />
      </div>
    </div>
  );
};

export default ProcessHeader;
