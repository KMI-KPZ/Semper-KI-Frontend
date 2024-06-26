import React from "react";
import ProcessPostProcessCatalog from "./components/Catalog";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Heading,
  LoadingSuspense,
  Text,
} from "@component-library/index";
import { FilterItemProps } from "../Filter/Filter";
import useService from "../../../../hooks/useService";
import useProcess from "@/hooks/Process/useProcess";
import ProcessPostProcessingCard from "./components/Card";
import useGetPostProcessigns, {
  PostProcessingProps,
} from "@/api/Service/AdditiveManufacturing/PostProcessing/Querys/useGetPostProcessigns";
import useSetPostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useSetPostProcessing";
import { useProject } from "@/hooks/Project/useProject";
import useDeletePostProcessing from "@/api/Service/AdditiveManufacturing/PostProcessing/Mutations/useDeletePostProcessing";
import useManufacturingProcess from "@/hooks/Process/useManufacturingProcess";

interface Props {
  filters: FilterItemProps[];
  postProcessings: PostProcessingProps[] | undefined;
  searchText: string;
}

export const ManufacturingPostProcessings: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const {
    searchText,
    filters,
    postProcessings: selectedPostProcessings,
  } = props;
  const { project } = useProject();
  const { process } = useManufacturingProcess();
  const postProcessings = useGetPostProcessigns(filters);
  const deletePostProcessing = useDeletePostProcessing();
  const setPostProcessing = useSetPostProcessing();

  const handleOnClickButtonSelect = (postProcessing: PostProcessingProps) => {
    setPostProcessing.mutate({
      projectID: project.projectID,
      processID: process.processID,
      postProcessing,
    });
  };

  const handleOnClickButtonDelete = (postProcessingID: string) => {
    deletePostProcessing.mutate({
      projectID: project.projectID,
      processID: process.processID,
      postProcessingID,
    });
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

  const filterSelectedPostProcessing = (
    postProcessing: PostProcessingProps
  ) => {
    return (
      process.serviceDetails.postProcessings?.find(
        (m) => m.id === postProcessing.id
      ) === undefined
    );
  };

  return (
    <Container direction="col" width="full">
      {/* {selectedPostProcessings !== undefined &&
      selectedPostProcessings.length > 0 ? (
        <Container direction="col" width="full">
          <Heading variant="h2" className="w-full text-left">
            {t("Service.Manufacturing.PostProcessing.PostProcessing.selected")}
          </Heading>
          <Container width="full" wrap="wrap">
            {selectedPostProcessings
              .filter(filterBySearch)
              .map((postProcessing: PostProcessingProps, index: number) => {
                return (
                  <ProcessPostProcessingCard
                    key={index}
                    item={postProcessing}
                    openItemView={() => {}}
                  >
                    <Container direction="row">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleOnClickButtonDelete(postProcessing.id)
                        }
                        title={t(
                          "Service.Manufacturing.PostProcessing.PostProcessing.button.delete"
                        )}
                      />
                    </Container>
                  </ProcessPostProcessingCard>
                );
              })}
          </Container>
        </Container>
      ) : null} */}
      <Container width="full" direction="col">
        <Heading variant="h2" className="w-full text-left">
          {t("Service.Manufacturing.PostProcessing.PostProcessing.available")}
        </Heading>
        <LoadingSuspense query={postProcessings}>
          {postProcessings.data !== undefined &&
          postProcessings.data.length > 0 ? (
            <Container width="full" wrap="wrap" direction="row" align="start">
              {postProcessings.data
                .filter(filterSelectedPostProcessing)
                .filter(filterBySearch)
                .map((postProcessing: PostProcessingProps, index: number) => (
                  <ProcessPostProcessingCard
                    key={index}
                    item={postProcessing}
                    openItemView={() => {}}
                  >
                    <Container direction="row">
                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleOnClickButtonSelect(postProcessing)
                        }
                        title={t(
                          "Service.Manufacturing.PostProcessing.PostProcessing.button.select"
                        )}
                      />
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
