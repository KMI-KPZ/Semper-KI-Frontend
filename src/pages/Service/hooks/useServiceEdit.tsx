import React, { useContext, useEffect } from "react";
import useService, { ServiceType } from "./useService";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../context/ServiceContext";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";

const useServiceEdit = () => {
  const { service } = useContext(ServiceContext);
  const { projectQuery } = useContext(ProjectContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!projectQuery.isRefetching && projectQuery.isFetched)
      if (service === undefined) navigate("service");
      else
        switch (service.type) {
          case ServiceType.MANUFACTURING:
            navigate("../manufacturing");
            break;
          case ServiceType.MODELING:
            navigate("../modelling");
            break;
          case ServiceType.UNDEFINED:
            navigate("..");
            break;
        }
  }, [service, projectQuery]);
};

export default useServiceEdit;
