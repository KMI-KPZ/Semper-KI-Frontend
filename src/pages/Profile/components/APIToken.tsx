import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  LoadingAnimation,
  Modal,
  Text,
} from "@component-library/index";
import useGetAPIToken from "@/api/Authentification/Querys/useGetAPIToken";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import useCreateAPIToken from "@/api/Authentification/Mutations/useCreateAPIToken";
import useDeleteAPIToken from "@/api/Authentification/Mutations/useDeleteAPIToken";
import LaunchIcon from "@mui/icons-material/Launch";

interface ProfileAPITokenProps {}

const ProfileAPIToken: React.FC<ProfileAPITokenProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const shortApiToken = useGetAPIToken();
  const createApiToken = useCreateAPIToken();
  const deleteApiToken = useDeleteAPIToken();

  const handleOnClickButtonCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };
  const handleOnClickButtonDelete = () => {
    deleteApiToken.mutate();
  };
  const handleOnClickButtonRecreate = () => {
    deleteApiToken.mutate(undefined, {
      onSuccess: () => createApiToken.mutate(),
    });
  };
  const handleOnClickButtonCreate = () => {
    createApiToken.mutate();
  };
  const handleOnClickInput = (event: React.MouseEvent<HTMLInputElement>) => {
    event.currentTarget.select();
  };

  const closeModal = () => {
    createApiToken.reset();
  };

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">{t("Profile.APIToken.heading")}</Heading>
      <Container width="full" direction="col" className="gap-3">
        <Text>{t("Profile.APIToken.subTitle")}</Text>
        <Text className="whitespace-pre-line text-center">
          {t("Profile.APIToken.subTitle2")}
        </Text>
      </Container>
      <Button
        title={t("Profile.APIToken.button.link")}
        variant="primary"
        size="sm"
        extern
        target="_blank"
        endIcon={<LaunchIcon />}
        to={process.env.VITE_HTTP_API_URL + "/public/api/schema/swagger-ui/"}
      />
      {shortApiToken.isLoading ? (
        <LoadingAnimation />
      ) : shortApiToken.data === undefined || shortApiToken.data === "" ? (
        <Container width="full">
          <Button
            size="sm"
            variant="secondary"
            onClick={handleOnClickButtonCreate}
            title={t("general.button.create")}
          />
        </Container>
      ) : (
        <Container width="full">
          <Text className="rounded-lg border-2 p-2">{shortApiToken.data}</Text>
          <Container direction="row" width="fit">
            <Button
              size="sm"
              variant="secondary"
              onClick={handleOnClickButtonRecreate}
              title={t("Profile.APIToken.button.reCreate")}
            />
            <Button
              size="sm"
              variant="secondary"
              onClick={handleOnClickButtonDelete}
              title={t("general.button.delete")}
            />
          </Container>
        </Container>
      )}
      <Modal
        modalKey="APIToken"
        open={createApiToken.isLoading || createApiToken.isSuccess}
        closeModal={closeModal}
      >
        <Container width="full" direction="col">
          <Heading variant="h2">{t("Profile.APIToken.heading")}</Heading>
          <Container width="full" direction="col" className="gap-3">
            <Text className="whitespace-pre-line text-center text-red-500">
              {t("Profile.APIToken.subTitle2")}
            </Text>
          </Container>
          {createApiToken.isLoading ||
          createApiToken.data === undefined ||
          createApiToken.data === "" ? (
            <LoadingAnimation />
          ) : (
            <Container width="full">
              <input
                readOnly
                onClick={handleOnClickInput}
                type="text"
                value={createApiToken.data}
                className="w-[430px] select-all rounded-md border-2 px-5 py-2 text-center"
              />
              <Button
                size="sm"
                variant="secondary"
                children={<ContentPasteIcon />}
                onClick={() => handleOnClickButtonCopy(createApiToken.data)}
                title={t("general.button.copy")}
              />
            </Container>
          )}
        </Container>
      </Modal>
    </Container>
  );
};

export default ProfileAPIToken;
