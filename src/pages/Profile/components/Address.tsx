import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Container,
  Divider,
  Heading,
  Modal,
  Text,
} from "@component-library/index";
import { AuthorizedUserProps } from "@/hooks/useUser";
import AddressCard from "@/components/Address/AddressCard";
import AddIcon from "@mui/icons-material/Add";
import AddressForm from "@/components/Form/AddressForm";

interface ProfileAddressProps {
  user: AuthorizedUserProps;
}

const ProfileAddress: React.FC<ProfileAddressProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  const [newAddress, setNewAddress] = useState(false);

  const handleOnClickButtonAddAddress = () => {
    setNewAddress(true);
  };

  const closeModalAddress = () => {
    setNewAddress(false);
  };

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">{t("Profile.address.header")}</Heading>
      <Divider />
      <Container width="full" justify="start" align="start" wrap="wrap">
        {user.details.addresses !== undefined &&
        user.details.addresses.length > 0 ? (
          user.details.addresses.map((address, index) => (
            <AddressCard key={index} address={address} />
          ))
        ) : (
          <Text>{t("Profile.address.noAddress")}</Text>
        )}
        <div
          className="hover-card flex flex-col items-center justify-center gap-5 p-10"
          tabIndex={0}
          onClick={handleOnClickButtonAddAddress}
        >
          <AddIcon />
          <Text>{t("Profile.button.addAddress")}</Text>
        </div>
      </Container>
      <Modal
        open={newAddress}
        closeModal={closeModalAddress}
        modalKey="ProfileForm"
      >
        <AddressForm
          closeModal={closeModalAddress}
          title={t("Profile.newAddressTitle")}
        />
      </Modal>
    </Container>
  );
};

export default ProfileAddress;
