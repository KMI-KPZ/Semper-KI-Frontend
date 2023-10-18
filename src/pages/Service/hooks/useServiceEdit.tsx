import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useService, { ServiceType } from "./useService";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";

const useServiceEdit = () => {
  const { getService } = useService();
  const { service, projectQuery } = getService();
  const navigate = useNavigate();
  useEffect(() => {
    if (projectQuery.isFetched && !projectQuery.isRefetching) {
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
    }
  }, [projectQuery, service]);
};

export default useServiceEdit;
