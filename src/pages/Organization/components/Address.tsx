import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Divider,
  Heading,
  Modal,
  Text,
} from "@component-library/index";
import AddressCard from "@/components/Address/AddressCard";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "@/components/Form/AddressForm";
import { Organization } from "@/api/Organization/Querys/useGetOrganization";

interface OrganizationAddressProps {
  organization: Organization;
}

const OrganizationAddress: React.FC<OrganizationAddressProps> = (props) => {
  const { organization } = props;
  const { t } = useTranslation();

  const [newAddress, setNewAddress] = useState(false);

  const handleOnClickButtonAddAddress = () => {
    setNewAddress(true);
  };

  const closeModalAddress = () => {
    setNewAddress(false);
  };

  return (
    <Container width="full" direction="col" className="p-5 shadow-card">
      <Heading variant="h2">{t("Profile.address.header")}</Heading>
      <Divider />
      {organization.details.addresses !== undefined &&
      organization.details.addresses.length > 0 ? (
        <Container width="full" justify="start" align="start" wrap="wrap">
          {organization.details.addresses.map((address, index) => (
            <AddressCard key={index} address={address} type="organization" />
          ))}
          <div
            className="hover-card flex flex-col items-center justify-center gap-5 p-10"
            tabIndex={0}
            onClick={handleOnClickButtonAddAddress}
          >
            <AddIcon />
            <Text>{t("Profile.button.addAddress")}</Text>
          </div>
        </Container>
      ) : (
        <Container width="full" direction="col">
          <Text>{t("Profile.address.noAddress")}</Text>
          <div
            className="hover-card flex w-full flex-col items-center justify-center gap-5 p-10"
            tabIndex={0}
            onClick={handleOnClickButtonAddAddress}
          >
            <AddIcon />
            <Text>{t("Profile.button.addAddress")}</Text>
          </div>
        </Container>
      )}

      <Modal
        open={newAddress}
        closeModal={closeModalAddress}
        modalKey="ProfileForm"
      >
        <AddressForm
          type="organization"
          closeModal={closeModalAddress}
          title={t("Profile.newAddressTitle")}
        />
      </Modal>
    </Container>
  );
};

export default OrganizationAddress;
