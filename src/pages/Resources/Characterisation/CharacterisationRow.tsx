import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";

import useCreateVerification from "@/api/Resources/Organization/Mutations/useCreateVerification";
import useUpdateVerification from "@/api/Resources/Organization/Mutations/useUpdateVerification";
import {
  CharacterisationItem,
  CharacterisationStatus,
} from "@/api/Resources/Organization/Querys/useGetVerification";
import logger from "@/hooks/useLogger";
import useDeleteVerification from "@/api/Resources/Organization/Mutations/useDeleteVerification";
import Hint from "@/components/Hint/Hint";

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
        return t("Resources.Characterisation.button.send");
      case CharacterisationStatus.VERIFIED:
        return t("general.button.delete");
      case CharacterisationStatus.SEND:
        return t("general.button.waiting");
    }
  };

  const handleOnButtonClickDelete = () => {
    deleteVerification.mutate({
      materialID: item.material.nodeID,
      printerID: item.printer.nodeID,
    });
  };

  return (
    <tr key={index}>
      <td className="text-center">
        <Container width="full" className="gap-1">
          <Text>{item.printer.name}</Text>
          <Hint title={item.printer.nodeID} />
        </Container>
      </td>
      <td className="text-center">
        <Container width="full" className="gap-1">
          <Text>{item.material.name}</Text>
          <Hint title={item.material.nodeID} />
        </Container>
      </td>
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
        <Container
          width="full"
          direction="col"
          justify="center"
          className="gap-2"
        >
          <Button
            title={getButtonTitle()}
            variant="primary"
            active={item.status !== CharacterisationStatus.SEND}
            size="xs"
            width="full"
            onClick={handleOnClickButton}
          />
          {item.status === CharacterisationStatus.REQUESTED ? (
            <>
              <Button
                title={t(
                  "Resources.Characterisation.button.downloadInstructions"
                )}
                size="xs"
                extern
                width="full"
                target="_blank"
                to="https://kiss.fra1.cdn.digitaloceanspaces.com/kiss/Charakterisierungsbauteil/Dummy.pdf"
              />
              <Button
                title={t("Resources.Characterisation.button.downloadModel")}
                size="xs"
                extern
                width="full"
                target="_blank"
                to="https://kiss.fra1.cdn.digitaloceanspaces.com/kiss/Charakterisierungsbauteil/Testkoerper_Kiss_v5.stl"
              />
            </>
          ) : null}
          {item.status === CharacterisationStatus.VERIFIED ? (
            <>
              <Button
                title={t("Resources.Characterisation.button.downloadDetails")}
                size="xs"
                width="full"
                onClick={handleOnButtonClickDownloadDetails}
                active={false}
              />
            </>
          ) : null}
          {item.status === CharacterisationStatus.VERIFIED ||
          item.status === CharacterisationStatus.SEND ? (
            <>
              <Button
                title={t("general.button.delete")}
                size="xs"
                width="full"
                onClick={handleOnButtonClickDelete}
              />
            </>
          ) : null}
        </Container>
      </td>
    </tr>
  );
};

export default CharacterisationRow;
