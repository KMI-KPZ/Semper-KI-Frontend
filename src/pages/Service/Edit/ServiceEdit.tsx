import React from "react";
import { useTranslation } from "react-i18next";
import useService, { ServiceType } from "../hooks/useService";
import { useNavigate } from "react-router-dom";
import { LoadingAnimation } from "@component-library/index";
import useSerivceEdit from "../hooks/useSerivceEdit";

interface ServiceEditProps {}

const ServiceEdit: React.FC<ServiceEditProps> = (props) => {
  const {} = props;
  useSerivceEdit();
  return <LoadingAnimation />;
};

export default ServiceEdit;
