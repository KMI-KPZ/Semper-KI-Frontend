import React from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

interface ServiceProps {}

const Service: React.FC<ServiceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { serviceName } = useParams();

  return <div className="">Service : {serviceName}</div>;
};

export default Service;
