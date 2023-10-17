import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useService, { ServiceType } from "./useService";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";

const useServiceEdit = () => {
  const { getService } = useService();
  const service = getService();
  const navigate = useNavigate();
  useEffect(() => {
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
  }, []);
};

export default useServiceEdit;
