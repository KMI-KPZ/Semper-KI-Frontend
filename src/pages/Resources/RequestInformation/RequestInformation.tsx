import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import useGetRequestInformation from "@/api/Resources/Organization/Querys/useGetRequestInformation";

interface RequestInformationProps {}

const RequestInformation: React.FC<RequestInformationProps> = (props) => {
  const {} = props;
  const requestInformation = useGetRequestInformation();
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">{t("Resources.RequestInformation.header")}</Heading>
      <Divider />

      <Container width="full" direction="row" className="justify-end">
        <Button
          size="sm"
          title={t("Resources.RequestInformation.button.new")}
          to="new"
        />
      </Container>
      {requestInformation.isLoading ? (
        <LoadingAnimation />
      ) : requestInformation.data === undefined ? (
        <Text>{t("Resources.RequestInformation.noItems")}</Text>
      ) : (
        <Container width="full" direction="col">
          {JSON.stringify(requestInformation.data)}
        </Container>
      )}
    </Container>
  );
};

export default RequestInformation;
