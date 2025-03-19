import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, LoadingAnimation } from "@component-library/index";
import useCreateProject from "@/api/Project/Mutations/useCreateProject";
import { useParams } from "react-router-dom";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

interface DemoProps {}

const Demo: React.FC<DemoProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { serviceType } = useParams();

  const createProject = useCreateProject();
  const hasCalled = useRef(false); // Prevent duplicate calls

  const getServiceType = (): ServiceType | undefined => {
    if (serviceType !== undefined && serviceType !== null) {
      if (Number(serviceType) >= 0 && Number(serviceType) <= 8) {
        return Number(serviceType) as ServiceType;
      } else return undefined;
    }
    return undefined;
  };

  useEffect(() => {
    if (!createProject.isLoading && !hasCalled.current) {
      createProject.mutate({
        title: "Demo Project",
        servieType: getServiceType(),
      });
      hasCalled.current = true;
    }
  }, [createProject.isLoading]);

  return (
    <Container width="full" className="bg-white px-5 py-3" direction="col">
      <Heading variant="h1">{t("Demo.heading")}</Heading>
      <LoadingAnimation />
    </Container>
  );
};

export default Demo;
