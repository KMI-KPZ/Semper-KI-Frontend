import React, { useContext } from "react";
import { ServiceManufacturingContext } from "../Manufacturing";
import ProcessHeaderSearch from "./Search/Search";
import { ServiceManufacturingWizard } from "./Wizard/Wizard";
import { Heading } from "@component-library/index";
import { useLocation } from "react-router-dom";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { isProcessAtServiceStatus } from "@/pages/Projects/hooks/useGeneralProcess";

const ProcessHeader: React.FC = () => {
  const { process } = useProcess();
  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4  bg-white p-3">
        <ServiceManufacturingWizard />
        {isProcessAtServiceStatus(process) ? <ProcessHeaderSearch /> : null}
      </div>
    </div>
  );
};

export default ProcessHeader;
