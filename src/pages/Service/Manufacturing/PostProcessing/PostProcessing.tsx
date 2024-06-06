import React from "react";
import ProcessPostProcessCatalog from "./components/Catalog";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/index";
import { FilterItemProps } from "../Filter/Filter";
import useService from "../../../../hooks/useService";
import useGetPostProcessigns from "@/api/Service/AdditiveManufacturing/Querys/useGetPostProcessigns";
import useProcess from "@/hooks/Process/useProcess";
import { ServiceManufacturingState } from "@/api/Service/Querys/useGetServices";
import { isProcessAtServiceStatus } from "@/api/Process/Querys/useGetProcess";

interface Props {
  searchText: string;
  filters: FilterItemProps[];
  postProcessings: PostProcessingProps[] | undefined;
}

export interface PostProcessingProps {
  id: string;
  title: string;
  checked: boolean;
  value: string;
  valueList: string[];
  type: EPostProcessingOptionType;
  URI: string;
}

export enum EPostProcessingOptionType {
  "selection",
  "number",
  "text",
}

export const ManufacturingPostProcessings: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { searchText, filters, postProcessings } = props;
  const postProcessingQuery = useGetPostProcessigns(filters);
  const { updatedService } = useService();
  const { process } = useProcess();

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

  return isProcessAtServiceStatus(process) ? (
    <LoadingSuspense query={postProcessingQuery}>
      {postProcessingQuery.data !== undefined ? (
        <div className="flex max-h-[60vh] flex-col gap-y-5 overflow-x-auto overflow-y-scroll">
          <ProcessPostProcessCatalog
            searchText={searchText}
            items={hydratePostProcessings(
              postProcessingQuery.data,
              postProcessings
            )}
            checkItem={checkPostProcessing}
          />
        </div>
      ) : (
        t(
          "Service.Manufacturing.PostProcessing.PostProcessing.error.noPostProcessings"
        )
      )}
    </LoadingSuspense>
  ) : postProcessings !== undefined ? (
    <div className="flex max-h-[60vh] flex-col gap-y-5 overflow-x-auto overflow-y-scroll">
      <ProcessPostProcessCatalog
        searchText={searchText}
        items={postProcessings}
        checkItem={checkPostProcessing}
      />
    </div>
  ) : (
    t(
      "Service.Manufacturing.PostProcessing.PostProcessing.error.noPostProcessingsSelected"
    )
  );
};
