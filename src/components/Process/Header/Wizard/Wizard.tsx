import "./Wizard.scss";
import React from "react";
import WizardCard from "./WizardCard";

interface Props {}

export const Wizard: React.FC<Props> = ({}) => {
  return (
    <div className="wizard">
      <WizardCard title="wizard.model" path="/process/model" />
      <WizardCard title="wizard.material" path="/process/material" />
      <WizardCard title="wizard.procedure" path="/process/procedure" />
      <WizardCard title="wizard.manufacturer" path="/process/manufacturer" />
      <WizardCard
        title="wizard.post-processing"
        path="/process/postprocessing"
      />
      <WizardCard title="wizard.additive" path="/process/additive" />
    </div>
  );
};
