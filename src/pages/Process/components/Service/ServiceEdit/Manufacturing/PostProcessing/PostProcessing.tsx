import React, { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  LoadingSuspense,
  Modal,
  Text,
} from "@component-library/index";
import ProcessPostProcessingCard from "./components/Card";
import useGetPostProcessigns, {
  PostProcessingProps,
} from "@/api/Service/AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import useSetPostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useSetPostProcessing";
import { useProject } from "@/hooks/Project/useProject";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";
import { useNavigate, useParams } from "react-router-dom";
import useModal from "@/hooks/useModal";
import ServiceSearch from "../Search/Search";
import { ManufacturingGroupContext } from "@/contexts/ManufacturingGroupContext";

interface Props {}

export const ManufacturingPostProcessings: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {} = props;
  const { project } = useProject();
  const { process } = useManufacturingProcess();
  const { projectID, processID } = useParams();
  const { deleteModal } = useModal();
  const loadedPostProcessings = useGetPostProcessigns();
  const setPostProcessing = useSetPostProcessing();
  const navigate = useNavigate();
  const { group, groupID } = useContext(ManufacturingGroupContext);

  const [selectedPostProcessing, setSelectedPostProcessing] = useState<
    PostProcessingProps[]
  >(group.postProcessings || []);
  const [searchText, setSearchText] = useState<string>("");

  const closeModal = () => {
    navigate(`/projects/${projectID}/${processID}`);
  };

  const handleOnClickButtonSave = () => {
    setPostProcessing.mutate(
      {
        groupID: groupID,
        projectID: project.projectID,
        processID: process.processID,
        postProcessings: selectedPostProcessing,
      },
      {
        onSuccess() {
          deleteModal("ServiceRouteManufacturingPostProcessings");
        },
      }
    );
  };

  const handleOnClickButtonSelect = (postProcessing: PostProcessingProps) => {
    setSelectedPostProcessing([...selectedPostProcessing, postProcessing]);
  };

  const handleOnClickButtonDeselect = (postProcessing: PostProcessingProps) => {
    setSelectedPostProcessing(
      selectedPostProcessing.filter((item) => item.id !== postProcessing.id)
    );
  };

  const filterBySearch = (postProcessing: PostProcessingProps): boolean => {
    if (searchText === "") {
      return true;
    }
    if (
      postProcessing.title.toLocaleLowerCase().includes(searchText) ||
      postProcessing.propList.filter(
        (prop) =>
          prop.name.toLocaleLowerCase().includes(searchText) ||
          prop.value.toString().toLocaleLowerCase().includes(searchText)
      ).length > 0
    ) {
      return true;
    }
    return false;
  };

  const isPostProcessingSelected = (postProcessing: PostProcessingProps) => {
    return (
      selectedPostProcessing.find((m) => m.id === postProcessing.id) !==
      undefined
    );
  };

  return (
    <Modal
      modalKey="ServiceRouteManufacturingPostProcessings"
      open={true}
      closeModal={closeModal}
      className=" "
    >
      <Container
        width="none"
        direction="col"
        justify="start"
        className="h-full w-screen max-w-6xl p-5 pt-14"
      >
        <ServiceSearch searchText={searchText} setSearchText={setSearchText} />
        <Container direction="col" width="full">
          <Container width="full" direction="col">
            <Container direction="row" width="full" justify="between">
              <Heading variant="h2">
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.PostProcessing.heading"
                )}
              </Heading>
            </Container>
            <LoadingSuspense query={loadedPostProcessings}>
              {loadedPostProcessings.data !== undefined &&
              loadedPostProcessings.data.length > 0 ? (
                <Container
                  width="full"
                  wrap="wrap"
                  direction="row"
                  align="start"
                >
                  {loadedPostProcessings.data
                    .filter(filterBySearch)
                    // .sort(sortSelectedPostProcessingsFirst)
                    .map(
                      (postProcessing: PostProcessingProps, index: number) => (
                        <ProcessPostProcessingCard
                          selected={isPostProcessingSelected(postProcessing)}
                          key={index}
                          item={postProcessing}
                          openItemView={() => {}}
                        >
                          <Container direction="row">
                            {isPostProcessingSelected(postProcessing) ? (
                              <Button
                                variant="primary"
                                onClick={() =>
                                  handleOnClickButtonDeselect(postProcessing)
                                }
                                title={t("general.button.deselect")}
                              />
                            ) : (
                              <Button
                                variant="secondary"
                                onClick={() =>
                                  handleOnClickButtonSelect(postProcessing)
                                }
                                title={t("general.button.select")}
                              />
                            )}
                          </Container>
                        </ProcessPostProcessingCard>
                      )
                    )}
                </Container>
              ) : (
                <Text className="w-full text-center">
                  {t(
                    "Process.components.Service.ServiceEdit.Manufacturing.PostProcessing.error.noPostProcessings"
                  )}
                </Text>
              )}
            </LoadingSuspense>
          </Container>
        </Container>
        <Button
          variant="primary"
          className="fixed bottom-5 z-10  w-fit self-center pr-5 md:sticky md:self-end"
          onClick={handleOnClickButtonSave}
          title={t("general.button.save")}
        />
      </Container>
    </Modal>
  );
};
