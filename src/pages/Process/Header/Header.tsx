import React, { useContext } from "react";
import { ProcessContext } from "../Process";
import ProcessHeaderSearch from "./Search/Search";
import ProcessHeaderCart from "./Cart/Cart";
import { ProcessHeaderWizard } from "./Wizard/Wizard";
import { Heading } from "@component-library/Typography";

const ProcessHeader: React.FC = () => {
  const { processState } = useContext(ProcessContext);
  const { progress } = processState;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-2 bg-white p-2">
        <ProcessHeaderWizard processState={processState} />
        <Heading variant="h1" className="text-center">
          {progress.title}
        </Heading>
        <ProcessHeaderSearch />
      </div>
    </div>
  );
};

export default ProcessHeader;
