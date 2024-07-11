import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  LoadingSuspense,
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
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";
import useModal from "@/hooks/useModal";

interface Props {
  filters: FilterItemProps[];
  postProcessings: PostProcessingProps[] | undefined;
  searchText: string;
}

export const ManufacturingPostProcessings: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { searchText, filters, postProcessings } = props;
  const { project } = useProject();
  const { process } = useManufacturingProcess();
  const navigate = useNavigate();
  const [selectedPostProcessing, setSelectedPostProcessing] = useState<
    PostProcessingProps[]
  >(postProcessings || []);
  const loadedPostProcessings = useGetPostProcessigns(filters);
  const setPostProcessing = useSetPostProcessing();
  const { deleteModal } = useModal();

  const handleOnClickButtonSave = () => {
    setPostProcessing.mutate(
      {
        projectID: project.projectID,
        processID: process.processID,
        postProcessings: selectedPostProcessing,
      },
      {
        onSuccess(data, variables, context) {
          deleteModal("ServiceRoutes");
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
    <Container direction="col" width="full">
      <Container width="full" direction="col">
        <Container direction="row" width="full" justify="between">
          <Heading variant="h2">
            {t("Service.Manufacturing.PostProcessing.PostProcessing.available")}
          </Heading>
          <Button
            variant="primary"
            onClick={handleOnClickButtonSave}
            title={t(
              "Service.Manufacturing.PostProcessing.PostProcessing.button.save"
            )}
          />
        </Container>
        <LoadingSuspense query={loadedPostProcessings}>
          {loadedPostProcessings.data !== undefined &&
          loadedPostProcessings.data.length > 0 ? (
            <Container width="full" wrap="wrap" direction="row" align="start">
              {loadedPostProcessings.data
                .filter(filterBySearch)
                // .sort(sortSelectedPostProcessingsFirst)
                .map((postProcessing: PostProcessingProps, index: number) => (
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
                ))}
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
  );
};
