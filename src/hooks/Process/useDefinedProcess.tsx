import { DefinedProcess } from "@/api/Process/Querys/useGetProcess";
import { DefinedProcessContext } from "@/contexts/DefinedProcessContext";
import { useContext } from "react";

interface useDefinedProcessReturnProps {
  process: DefinedProcess;
}

const useDefinedProcess = (): useDefinedProcessReturnProps => {
  const { process } = useContext(DefinedProcessContext);
  return { process };
};

export default useDefinedProcess;
