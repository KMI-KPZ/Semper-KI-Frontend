import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, LoadingAnimation } from "@component-library/index";
import useGetRequestInformation from "@/api/Resources/Organization/Querys/useGetRequestInformation";

interface RequestInformationProps {}

const RequestInformation: React.FC<RequestInformationProps> = (props) => {
  const {} = props;
  const requestInformation = useGetRequestInformation();
  const { t } = useTranslation();

  if (requestInformation.isLoading) return <LoadingAnimation />;
  if (requestInformation.data !== undefined)
    return (
      <Container width="full" direction="col">
        <Heading variant="h1">
          {t("Resources.components.RequestInformation.header")}
        </Heading>

        <Container width="full" direction="col"></Container>
      </Container>
    );
};

export default RequestInformation;
