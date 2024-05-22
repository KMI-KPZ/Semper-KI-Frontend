import { UserAddressProps } from "@/hooks/useUser";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";

interface ProcessAddressProps {
  address: UserAddressProps;
}

const ProcessAddress: React.FC<ProcessAddressProps> = (props) => {
  const { address } = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-start  justify-start gap-5 ">
      <Container direction="auto" justify="between" width="full">
        <Heading variant="h2" className="grow">
          {t("Projects.Project.Process.components.Address.title")}
        </Heading>
        <Divider className="mt-[0.3rem]" />
      </Container>
      <Container direction="row" justify="start" className="flex-wrap">
        <Text className="min-w-[100px]">
          {t("Projects.Project.Process.components.Address.name")}:
        </Text>
        <Text>
          {address === undefined
            ? "---"
            : address.firstName + " " + address.lastName}
        </Text>
      </Container>
      <Container direction="row" justify="start" className="flex-wrap">
        <Text className="min-w-[100px]">
          {t("Projects.Project.Process.components.Address.company")}:
        </Text>
        <Text>
          {address === undefined
            ? "---"
            : address.company !== undefined && address.company !== ""
            ? address.company
            : "  ---"}
        </Text>
      </Container>
      <Container direction="row" justify="start" className="flex-wrap">
        <Text className="min-w-[100px]">
          {t("Projects.Project.Process.components.Address.address")}:
        </Text>
        <Text>
          {address === undefined
            ? "---"
            : address.street +
              " " +
              address.houseNumber +
              ", " +
              address.zipcode +
              " ," +
              address.city +
              " ," +
              address.country}
        </Text>
      </Container>
    </div>
  );
};

export default ProcessAddress;
