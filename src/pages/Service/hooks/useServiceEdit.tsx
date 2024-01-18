import React, { useContext, useEffect } from "react";
import useService, { ServiceType } from "./useService";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../context/ServiceContext";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";
import { ProcessContext } from "@/pages/Projects/context/ProcessContext";

const useServiceEdit = () => {
  const { process } = useContext(ProcessContext);
  const { projectQuery } = useContext(ProjectContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!projectQuery.isRefetching && projectQuery.isFetched)
      if (process.serviceType === undefined) navigate("service");
      else
        switch (process.serviceType) {
          case ServiceType.MANUFACTURING:
            navigate("../manufacturing");
            break;
          case ServiceType.MODELING:
            navigate("../modelling");
            break;
          case ServiceType.NONE:
            navigate("..");
            break;
        }
  }, [process, projectQuery]);
};

export default useServiceEdit;
