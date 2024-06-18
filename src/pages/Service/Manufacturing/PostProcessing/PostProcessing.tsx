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
  const { searchText, filters, postProcessings } = props;
  const postProcessingsQuery = useGetPostProcessigns(filters);
  const { updatedService } = useService();
  const { process } = useManufacturingProcess();
  const { project } = useProject();
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

  const checkPostProcessing = (postProcessing: PostProcessingProps) => {
    let newPostProcessings: PostProcessingProps[] = [];
    if (postProcessings === undefined) {
      newPostProcessings.push({ ...postProcessing, checked: true });
    } else {
      const isPostProcessingAlreadyChecked: boolean =
        postProcessings.find((item) => item.id === postProcessing.id) !==
        undefined;
      if (isPostProcessingAlreadyChecked) {
        newPostProcessings = postProcessings.filter(
          (item) => item.id !== postProcessing.id
        );
      } else {
        newPostProcessings = [
          ...postProcessings,
          { ...postProcessing, checked: true },
        ];
      }
    }
    updatedService({ postProcessings: newPostProcessings });
  };

  const hydratePostProcessings = (
    initialPostProcessings: PostProcessingProps[],
    checkedPostprocessings: PostProcessingProps[] | undefined
  ): PostProcessingProps[] => {
    let initialIdList: string[] = initialPostProcessings.map((item) => item.id);
    let filteredPostprocessings: PostProcessingProps[] =
      checkedPostprocessings === undefined
        ? []
        : checkedPostprocessings.filter((item) =>
            initialIdList.includes(item.id)
          );
    let hydratedPostProcessings: PostProcessingProps[] = [];
    initialPostProcessings.forEach((initialPostProcessing) => {
      let postprocessing: PostProcessingProps = initialPostProcessing;
      filteredPostprocessings.forEach((filteredPostprocessing) => {
        if (initialPostProcessing.id === filteredPostprocessing.id)
          postprocessing = filteredPostprocessing;
      });
      hydratedPostProcessings.push(postprocessing);
    });
    return hydratedPostProcessings;
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
      {postProcessings !== undefined && postProcessings.length > 0 ? (
        <Container direction="col" width="full">
          <Heading variant="h2" className="w-full text-left">
            {t("Service.Manufacturing.PostProcessing.PostProcessing.selected")}
          </Heading>
          <Container width="full" wrap="wrap">
            {postProcessings.length > 0
              ? postProcessings
                  .filter((postProcessing, index) =>
                    filterBySearch(postProcessing)
                  )
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
                  })
              : null}
          </Container>
        </Container>
      ) : null}
      <Container width="full" direction="col">
        <Heading variant="h2" className="w-full text-left">
          {t("Service.Manufacturing.PostProcessing.PostProcessing.available")}
        </Heading>
        <LoadingSuspense query={postProcessingsQuery}>
          {postProcessingsQuery.data !== undefined &&
          postProcessingsQuery.data.length > 0 ? (
            <Container width="full" wrap="wrap" direction="row" align="start">
              {postProcessingsQuery.data
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
