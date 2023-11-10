import React, { useContext, useEffect } from "react";
import useService, { ServiceType } from "./useService";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../context/ServiceContext";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";

const useServiceEdit = () => {
  const { service } = useContext(ServiceContext);
  const { queryIsRefetching } = useContext(ProjectContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!queryIsRefetching)
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
  }, [service, queryIsRefetching]);
};

export default useServiceEdit;
