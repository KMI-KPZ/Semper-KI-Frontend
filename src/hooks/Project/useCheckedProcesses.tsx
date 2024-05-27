// import { ProjectContext } from "@/routeOutlets/ProjectOutlet";
// import React, { useContext, useState } from "react";
// import { useProject } from "./useProject";

// interface useCheckedProcessesReturnProps {
//   checkedProcesses: string[];
//   setCheckedProcesses: React.Dispatch<React.SetStateAction<string[]>>;
//   handleOnChangeCheckboxSelect: (
//     e: React.ChangeEvent<HTMLInputElement>,
//     processID: string
//   ) => void;
//   handleOnChangeCheckboxSelectAll: (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => void;
// }

// const useCheckedProcesses = (): useCheckedProcessesReturnProps => {
//   const { project } = useProject();
//   const { checkedProcesses, setCheckedProcesses } = useContext(ProjectContext);

//   const handleOnChangeCheckboxSelect = (
//     e: React.ChangeEvent<HTMLInputElement>,
//     processID: string
//   ) => {
//     const checked = e.target.checked;
//     if (checked) {
//       setCheckedProcesses([...checkedProcesses, processID]);
//     } else {
//       setCheckedProcesses(
//         checkedProcesses.filter(
//           (checkedProcess) => checkedProcess !== processID
//         )
//       );
//     }
//   };
//   const handleOnChangeCheckboxSelectAll = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const checked = e.target.checked;
//     if (project === undefined) return;
//     if (checked) {
//       setCheckedProcesses(
//         project.processes.map((process) => process.processID)
//       );
//     } else {
//       setCheckedProcesses([]);
//     }
//   };

//   return {
//     checkedProcesses,
//     setCheckedProcesses,
//     handleOnChangeCheckboxSelect,
//     handleOnChangeCheckboxSelectAll,
//   };
// };

// export default useCheckedProcesses;
