import "./Wizard.scss";
import React from "react";
import WizardCard from "./WizardCard";
import { IProgress } from "../../../../interface/Interface";

import _wizardItems from "./WizardItems.json";
const wizardItems: IWizardItem[] = _wizardItems;

interface IWizardItem {
  title: string;
  links: string[];
}

interface Props {
  progress: IProgress;
}

export const Wizard: React.FC<Props> = ({ progress }) => {
  return (
    <div className="wizard">
      {wizardItems.map((wizardItem: IWizardItem, index: number) => (
        <WizardCard
          key={index}
          title={wizardItem.title}
          path={wizardItem.links[0]}
          active={wizardItem.links.includes(progress.link) ? true : false}
        />
      ))}
    </div>
  );
};
