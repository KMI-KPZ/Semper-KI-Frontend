import { DefinedProcess } from "@/api/Process/Querys/useGetProcess";
import { DefinedProcessContext } from "@/contexts/DefinedProcessContext";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";

interface useDefinedProcessReturnProps {
  process: DefinedProcess;
}

const useDefinedProcess = (): useDefinedProcessReturnProps => {
  const { process } = useContext(DefinedProcessContext);
  return { process };
};

export default useDefinedProcess;
