import AddressCard from "@/components/Address/AddressCard";
import AddressForm from "@/components/Form/AddressForm";
import useAuthorizedUser from "@/hooks/useAuthorizedUser";
import { UserAddressProps } from "@/hooks/useUser";
import { Button, Container, Heading, Modal } from "@component-library/index";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface AddressSelectionProps {
  closeModal: () => void;
  selectAddress: (address: UserAddressProps) => void;
}

const AddressSelection: React.FC<AddressSelectionProps> = (props) => {
  const { closeModal, selectAddress } = props;
  const { t } = useTranslation();
  const { user } = useAuthorizedUser();
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editAddress, setEditAddress] = useState<UserAddressProps>();

  const handleOnClickButtonSelect = (address: UserAddressProps) => {
    selectAddress(address);
    closeModal();
  };

  const handleOnClickButtonNew = () => {
    setFormOpen(true);
  };

  const handleOnClickButtonEdit = (address: UserAddressProps) => {
    setFormOpen(true);
    setEditAddress(address);
  };

  const closeModalAndReset = () => {
    setFormOpen(false);
    setEditAddress(undefined);
  };

  return (
    <Container width="full" className="h-full" direction="col">
      <Heading variant="h1">
        {t(
          "Process.components.ContractorSelection.components.AddressSelection.heading"
        )}
      </Heading>
      <Container width="full" direction="row" wrap="wrap">
        {user.details.addresses !== undefined &&
        user.details.addresses.length > 0
          ? user.details.addresses.map((address, index) => (
              <AddressCard address={address} key={index}>
                <Button
                  size="sm"
                  variant="text"
                  title={t("general.button.edit")}
                  onClick={() => {
                    handleOnClickButtonEdit(address);
                  }}
                />
                <Button
                  size="sm"
                  title={t("general.button.select")}
                  onClick={() => {
                    handleOnClickButtonSelect(address);
                  }}
                />
              </AddressCard>
            ))
          : null}
      </Container>
      <Container width="full">
        <Button
          variant="primary"
          title={t(
            "Process.components.ContractorSelection.components.AddressSelection.button.new"
          )}
          onClick={handleOnClickButtonNew}
        />
      </Container>
      <Modal
        modalKey="ProcessCreateNewAddress"
        open={formOpen}
        closeModal={closeModalAndReset}
      >
        <AddressForm
          initialAddress={editAddress}
          closeModal={closeModalAndReset}
        />
      </Modal>
    </Container>
  );
};

export default AddressSelection;
