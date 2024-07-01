
import { Process } from "@/api/Process/Querys/useGetProcess";
import { ProcessContext } from "@/contexts/ProcessContext";
import { useContext } from "react";

interface ReturnProps {
  process: Process;
}

const useProcess = (): ReturnProps => {
  const { process } = useContext(ProcessContext);
  console.log("useProcess: ");
  console.log(process)
  return {
    process
  };
};

export default useProcess;
