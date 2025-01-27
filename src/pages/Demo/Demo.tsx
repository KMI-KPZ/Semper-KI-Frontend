import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, LoadingAnimation } from "@component-library/index";
import useCreateProject from "@/api/Project/Mutations/useCreateProject";

interface DemoProps {}

const Demo: React.FC<DemoProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const createProject = useCreateProject();
  const hasCalled = useRef(false); // Prevent duplicate calls

  useEffect(() => {
    if (!createProject.isLoading && !hasCalled.current) {
      createProject.mutate("Demo Project");
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
