import React, { useState } from "react";
import { ProjectProps } from "../../hooks/useProject";

interface useCheckedProcessesReturnProps {
  checkedProcesses: string[];
  handleOnChangeCheckboxSelect: (
    e: React.ChangeEvent<HTMLInputElement>,
    processID: string
  ) => void;
  handleOnChangeCheckboxSelectAll: (
    e: React.ChangeEvent<HTMLInputElement>
  ) => void;
}

const useCheckedProcesses = (
  project: ProjectProps | undefined
): useCheckedProcessesReturnProps => {
  const [checkedProcesses, setCheckedProcesses] = useState<string[]>([]);

  const handleOnChangeCheckboxSelect = (
    e: React.ChangeEvent<HTMLInputElement>,
    processID: string
  ) => {
    const checked = e.target.checked;
    if (checked) {
      setCheckedProcesses([...checkedProcesses, processID]);
    } else {
      setCheckedProcesses(
        checkedProcesses.filter(
          (checkedProcess) => checkedProcess !== processID
        )
      );
    }
  };
  const handleOnChangeCheckboxSelectAll = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = e.target.checked;
    if (project === undefined) return;
    if (checked) {
      setCheckedProcesses(
        project.processes.map((process) => process.processID)
      );
    } else {
      setCheckedProcesses([]);
    }
  };

  return {
    checkedProcesses,
    handleOnChangeCheckboxSelect,
    handleOnChangeCheckboxSelectAll,
  };
};

export default useCheckedProcesses;
