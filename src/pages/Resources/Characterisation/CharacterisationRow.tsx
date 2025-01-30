import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";

import useCreateVerification from "@/api/Resources/Organization/Mutations/useCreateVerification";
import useUpdateVerification from "@/api/Resources/Organization/Mutations/useUpdateVerification";
import {
  CharacterisationItem,
  CharacterisationStatus,
} from "@/api/Resources/Organization/Querys/useGetVerification";
import logger from "@/hooks/useLogger";
import useDeleteVerification from "@/api/Resources/Organization/Mutations/useDeleteVerification";

interface CharacterisationRowProps {
  index: number;
  item: CharacterisationItem;
}

const CharacterisationRow: React.FC<CharacterisationRowProps> = (props) => {
  const { index, item } = props;
  const { t } = useTranslation();
  const createVerification = useCreateVerification();
  const updateVerification = useUpdateVerification();
  const deleteVerification = useDeleteVerification();

  const handleOnClickButton = () => {
    switch (item.status) {
      case CharacterisationStatus.UNVERIFIED:
        createVerification.mutate({
          materialID: item.material.nodeID,
          printerID: item.printer.nodeID,
          status: CharacterisationStatus.REQUESTED,
        });
        break;
      case CharacterisationStatus.REQUESTED:
      case CharacterisationStatus.SEND:
        updateVerification.mutate({
          materialID: item.material.nodeID,
          printerID: item.printer.nodeID,
          status: CharacterisationStatus.SEND,
        });
        break;
      case CharacterisationStatus.VERIFIED:
        deleteVerification.mutate({
          materialID: item.material.nodeID,
          printerID: item.printer.nodeID,
        });
        break;
    }
  };

  const handleOnButtonClickDownloadDetails = () => {
    logger("download Verification Details");
  };

  const getButtonTitle = () => {
    switch (item.status) {
      case CharacterisationStatus.UNVERIFIED:
        return t("Resources.Characterisation.button.verify");
      case CharacterisationStatus.REQUESTED:
      case CharacterisationStatus.SEND:
        return t("Resources.Characterisation.button.send");
      case CharacterisationStatus.VERIFIED:
        return t("general.button.delete");
    }
  };

  return (
    <tr key={index}>
      <td className="text-center">{item.printer.name}</td>
      <td className="text-center">{item.material.name}</td>
      <td className="text-center">
        {t(
          `enum.CharacterisationStatus.${
            CharacterisationStatus[
              item.status
            ] as keyof typeof CharacterisationStatus
          }`
        )}
      </td>
      <td className="text-center">
        <Container width="full" direction="row" justify="center">
          <Button
            title={getButtonTitle()}
            variant="primary"
            size="sm"
            onClick={handleOnClickButton}
          />
          {item.status === CharacterisationStatus.REQUESTED ? (
            <>
              <Button
                title={t(
                  "Resources.Characterisation.button.downloadInstructions"
                )}
                size="sm"
                extern
                target="_blank"
                to="https://kiss.fra1.cdn.digitaloceanspaces.com/kiss/Charakterisierungsbauteil/Dummy.pdf"
              />
              <Button
                title={t("Resources.Characterisation.button.downloadModel")}
                size="sm"
                extern
                target="_blank"
                to="https://kiss.fra1.cdn.digitaloceanspaces.com/kiss/Charakterisierungsbauteil/Testkoerper_Kiss_v5.stl"
              />
            </>
          ) : null}
          {item.status === CharacterisationStatus.VERIFIED ? (
            <>
              <Button
                title={t("Resources.Characterisation.button.downloadDetails")}
                size="sm"
                onClick={handleOnButtonClickDownloadDetails}
                active={false}
              />
            </>
          ) : null}
        </Container>
      </td>
    </tr>
  );
};

export default CharacterisationRow;
