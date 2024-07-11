import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ManufactoringProcessProps } from "../../api/Process/Querys/useGetProcess";
import { ManufacturingProcessContext } from "@/contexts/ManufacturingProcessContext";

interface useManufacturingProcessReturnProps {
  process: ManufactoringProcessProps;
}

const useManufacturingProcess = (): useManufacturingProcessReturnProps => {
  const { process } = useContext(ManufacturingProcessContext);

  return { process };
};

export default useManufacturingProcess;
