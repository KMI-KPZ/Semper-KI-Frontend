import React from "react";
import ProcessHeaderSearch from "./Search/Search";
import { ServiceManufacturingWizard } from "./Wizard/Wizard";
import useProcess, {
  isProcessAtServiceStatus,
} from "@/hooks/Process/useProcess";

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
