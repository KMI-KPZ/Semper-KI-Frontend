import React, { useEffect, useState } from "react";
import ProcessPostProcessCatalog from "./components/Catalog";
import { ServiceManufacturingState } from "../types";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import { FilterItemProps } from "../Filter/Filter";
import { usePostProcessing as useManufacturingPostProcessing } from "./hooks/usePostProcessing";
import { useNavigate } from "react-router-dom";
import useSubOrder from "@/pages/Order/SubOrder/hooks/useSubOrder";
import logger from "@/hooks/useLogger";

interface Props {
  processState: ServiceManufacturingState;
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

export const ProcessPostProcessing: React.FC<Props> = (props) => {
  const { t } = useTranslation();
  const { processState, filters, postProcessings } = props;
  const { grid, searchText } = processState;
  const { postProcessingQuery } = useManufacturingPostProcessing(filters);
  const { updateSubOrder } = useSubOrder();

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
    updateSubOrder.mutate({
      changes: { service: { postProcessings: newPostProcessings } },
    });
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

  return (
    <LoadingSuspense query={postProcessingQuery}>
      {postProcessingQuery.data !== undefined ? (
        <div className="flex flex-col gap-y-5">
          <ProcessPostProcessCatalog
            grid={grid}
            searchText={searchText}
            items={hydratePostProcessings(
              postProcessingQuery.data,
              postProcessings
            )}
            checkItem={checkPostProcessing}
          />
        </div>
      ) : (
        t("Process.PostProcessing.PostProcessingView.empty")
      )}
    </LoadingSuspense>
  );
};
