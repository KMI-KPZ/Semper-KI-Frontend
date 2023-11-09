import React, { useContext, useEffect } from "react";
import useService, { ServiceType } from "./useService";
import { useNavigate } from "react-router-dom";
import { ServiceContext } from "../context/ServiceContext";

const useServiceEdit = () => {
  const { service } = useContext(ServiceContext);
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
  }, [service]);
};

export default useServiceEdit;
