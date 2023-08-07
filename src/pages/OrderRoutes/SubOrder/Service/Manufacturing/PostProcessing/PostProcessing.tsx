import React, { useEffect, useState } from "react";
import ProcessPostProcessCatalog from "./components/Catalog";
import { ServiceManufacturingState } from "../types";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/Loading";
import { IFilterItem } from "../Filter/Filter";
import { usePostProcessing as useManufacturingPostProcessing } from "./hooks/usePostProcessing";

interface Props {
  processState: ServiceManufacturingState;
  filters: IFilterItem[];
  postProcessings: IPostProcessing[] | undefined;
}

export interface IPostProcessing {
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

  const checkPostProcessing = (postProcessing: IPostProcessing) => {};
  const hydratePostProcessings = (
    initialPostProcessings: IPostProcessing[],
    checkedPostprocessings: IPostProcessing[] | undefined
  ): IPostProcessing[] => {
    let initialIdList: string[] = initialPostProcessings.map((item) => item.id);
    let filteredPostprocessings: IPostProcessing[] =
      checkedPostprocessings === undefined
        ? []
        : checkedPostprocessings.filter((item) =>
            initialIdList.includes(item.id)
          );
    let hydratedPostProcessings: IPostProcessing[] = [];
    initialPostProcessings.forEach((initialPostProcessing) => {
      let postprocessing: IPostProcessing = initialPostProcessing;
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
