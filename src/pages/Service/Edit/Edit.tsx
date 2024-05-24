import React from "react";
import { LoadingAnimation } from "@component-library/index";
import useServiceEdit from "../hooks/useServiceEdit";

interface ServiceEditProps {}

const ServiceEdit: React.FC<ServiceEditProps> = (props) => {
  const {} = props;
  useServiceEdit();
  return <LoadingAnimation />;
};

export default ServiceEdit;
