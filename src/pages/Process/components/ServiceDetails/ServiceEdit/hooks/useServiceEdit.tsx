import { useNavigate } from "react-router-dom";
import useProcess from "@/hooks/Process/useProcess";
import { useEffect } from "react";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

const useServiceEdit = () => {
  const { process } = useProcess();
  const navigate = useNavigate();
  useEffect(() => {
    if (process.serviceType === undefined) navigate("service");
    else
      switch (process.serviceType) {
        case ServiceType.ADDITIVE_MANUFACTURING:
          navigate("../manufacturing");
          break;
        case ServiceType.CREATE_MODEL:
          navigate("../modelling");
          break;
        case ServiceType.NONE:
          navigate("..");
          break;
      }
  }, [process]);
};

export default useServiceEdit;
