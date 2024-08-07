import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  LoadingSuspense,
  Modal,
  Text,
} from "@component-library/index";
import { FilterItemProps } from "../Filter/Filter";
import ProcessPostProcessingCard from "./components/Card";
import useGetPostProcessigns, {
  PostProcessingProps,
} from "@/api/Service/AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import useSetPostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useSetPostProcessing";
import { useProject } from "@/hooks/Project/useProject";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";
import { useNavigate, useParams } from "react-router-dom";
import logger from "@/hooks/useLogger";
import useModal from "@/hooks/useModal";
import ServiceSearch from "../Search/Search";

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

  const [selectedPostProcessing, setSelectedPostProcessing] = useState<
    PostProcessingProps[]
  >(process.serviceDetails.postProcessings || []);
  const [searchText, setSearchText] = useState<string>("");

  const closeModal = () => {
    navigate(`/projects/${projectID}/${processID}`);
  };

  const handleOnClickButtonSave = () => {
    setPostProcessing.mutate(
      {
        projectID: project.projectID,
        processID: process.processID,
        postProcessings: selectedPostProcessing,
      },
      {
        onSuccess(data, variables, context) {
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
      postProcessing.valueList.filter((value) =>
        value.toLocaleLowerCase().includes(searchText)
      ).length > 0
    ) {
      return true;
    }
    return false;
  };

  const sortSelectedPostProcessingsFirst = (
    a: PostProcessingProps,
    b: PostProcessingProps
  ) => {
    if (isPostProcessingSelected(a)) {
      return -1;
    }
    if (isPostProcessingSelected(b)) {
      return 1;
    }
    return 0;
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
                  "Service.Manufacturing.PostProcessing.PostProcessing.available"
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
                                title={t(
                                  "Service.Manufacturing.PostProcessing.PostProcessing.button.deselect"
                                )}
                              />
                            ) : (
                              <Button
                                variant="secondary"
                                onClick={() =>
                                  handleOnClickButtonSelect(postProcessing)
                                }
                                title={t(
                                  "Service.Manufacturing.PostProcessing.PostProcessing.button.select"
                                )}
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
                    "Service.Manufacturing.PostProcessing.PostProcessing.error.noPostProcessings"
                  )}
                </Text>
              )}
            </LoadingSuspense>
          </Container>
        </Container>
        <Container
          width="fit"
          direction="col"
          className="fixed bottom-10 z-10 rounded-xl border-2 bg-white px-5 py-3 md:sticky md:right-10"
        >
          <Button
            variant="primary"
            onClick={handleOnClickButtonSave}
            title={t(
              "Service.Manufacturing.PostProcessing.PostProcessing.button.save"
            )}
          />
        </Container>
      </Container>
    </Modal>
  );
};
