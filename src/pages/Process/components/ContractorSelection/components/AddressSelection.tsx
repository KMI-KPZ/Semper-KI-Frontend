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
  const [create, setCreate] = useState<boolean>(false);

  const handleOnClickButtonSelect = (address: UserAddressProps) => {
    selectAddress(address);
    closeModal();
  };

  const handleOnClickButtonNew = () => {
    setCreate(true);
  };

  return (
    <Container width="full" className="h-full" direction="col">
      <Heading variant="h1">
        {t(
          "Process.components.ContractorSelection.components.AddressSelection.heading"
        )}
      </Heading>
      <Container width="full" direction="row" wrap="wrap">
        {user.details.addresses.map((address) => (
          <AddressCard address={address}>
            <Button
              title={t(
                "Process.components.ContractorSelection.components.AddressSelection.button.select"
              )}
              onClick={() => {
                handleOnClickButtonSelect(address);
              }}
            />
          </AddressCard>
        ))}
      </Container>
      <Container width="full">
        <Button
          title={t(
            "Process.components.ContractorSelection.components.AddressSelection.button.new"
          )}
          onClick={handleOnClickButtonNew}
        />
      </Container>
      <Modal
        modalKey="ProcessCreateNewAddress"
        open={create}
        closeModal={() => {
          setCreate(false);
        }}
      >
        <AddressForm
          closeModal={() => {
            setCreate(false);
          }}
        />
      </Modal>
    </Container>
  );
};

export default AddressSelection;
