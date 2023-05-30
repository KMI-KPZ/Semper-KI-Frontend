import React from "react";
import WizardCard from "./components/card";
import _wizardItems from "./data/items.json";
import { IProcessItem, IProcessState } from "../..";
import { EProcessStatusType } from "..";
const wizardItems: IWizardItem[] = _wizardItems;

interface IWizardItem {
  title: string;
  links: string[];
}

interface Props {
  processState: IProcessState;
}

export const Wizard: React.FC<Props> = (props) => {
  const { processState } = props;
  const { activeItemIndex, items, progress } = processState;
  const activeProcess: IProcessItem = items[activeItemIndex];

  const getStatusByIndex = (index: number): EProcessStatusType => {
    switch (index) {
      case 0:
        return activeProcess.model === undefined ? 2 : 0;
      case 1:
        return activeProcess.material === undefined ? 2 : 0;
      case 2:
        return activeProcess.postProcessings === undefined ? 2 : 0;
      default:
        return 2;
    }
  };

  return (
    <div className="flex flex-col items-center justify-around gap-3 sm:flex-row sm:gap-0">
      {wizardItems.map((wizardItem: IWizardItem, index: number) => (
        <WizardCard
          statusType={getStatusByIndex(index)}
          key={index}
          title={wizardItem.title}
          path={wizardItem.links[0]}
          active={wizardItem.links.includes(progress.link) ? true : false}
        />
      ))}
    </div>
  );
};
