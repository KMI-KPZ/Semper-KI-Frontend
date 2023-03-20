import React from "react";
import WizardCard from "./WizardCard";
import { IProcess } from "../../../../interface/Interface";

import _wizardItems from "./WizardItems.json";
import { IProcessState } from "../../ProcessView";
import { EProcessStatusType } from "../../../../interface/enums";
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
  const { activeProcessList, processList, progress } = processState;
  const activeProcessIndex: number =
    activeProcessList.length > 0 ? activeProcessList[0] : -1;
  const activeProcess: IProcess =
    processList.length > 0 && activeProcessIndex !== -1
      ? processList[activeProcessIndex]
      : {};

  const getStatusByIndex = (index: number): EProcessStatusType => {
    switch (index) {
      case 0:
        return activeProcess.model === undefined ? 2 : 0;
      case 1:
        return activeProcess.material === undefined ? 2 : 0;
      case 2:
        return activeProcess.procedure === undefined ? 2 : 0;
      case 3:
        return activeProcess.postProcessing === undefined ? 2 : 0;
      default:
        return 2;
    }
  };

  return (
    <div className="flex flex-row justify-around items-center">
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
