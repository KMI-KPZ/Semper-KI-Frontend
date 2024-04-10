import React, { useContext, useEffect, useState } from "react";
import ProcessPostProcessCatalog from "./components/Catalog";
import {
  ManufacturingServiceProps,
  ServiceManufacturingState,
} from "../types/types";
import { useTranslation } from "react-i18next";
import { LoadingSuspense } from "@component-library/index";
import { FilterItemProps } from "../Filter/Filter";
import { useNavigate } from "react-router-dom";
import logger from "@/hooks/useLogger";
import useProcess, { ProcessStatus } from "@/pages/Projects/hooks/useProcess";
import useService, { ServiceType } from "../../hooks/useService";
import { ProcessContext } from "@/pages/Projects/context/ProcessContext";
import { useManufacturingPostProcessingQuerys } from "@/api/Service/Manufacturing/useManufacturingQuerys";
import { isProcessAtServiceStatus } from "@/pages/Projects/hooks/useGeneralProcess";
import useModal from "@/hooks/useModal";

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
  const { process } = useProcess();
  // logger(process.serviceDetails);
  const { postProcessingQuery } = useManufacturingPostProcessingQuerys([
    ...filters,
    {
      id: 20,
      isChecked: false,
      isOpen: false,
      question: {
        isSelectable: false,
        title: "material",
        category: "MATERIAL",
        type: "TEXT",
        range: null,
        values: null,
        units: null,
      },
      answer: {
        unit: "id",
        value:
          process.serviceType === ServiceType.MANUFACTURING
            ? process.serviceDetails.material !== undefined
              ? process.serviceDetails.material.id
              : ""
            : "",
      },
    },
    {
      id: 21,
      isChecked: false,
      isOpen: false,
      question: {
        isSelectable: false,
        title: "postprocessings",
        category: "POSTPROCESSING",
        type: "TEXT",
        range: null,
        values: null,
        units: null,
      },
      answer: {
        unit: "ids",
        value:
          process.serviceType === ServiceType.MANUFACTURING
            ? process.serviceDetails.postProcessings !== undefined
              ? process.serviceDetails.postProcessings.map(
                  (postProcessing) => postProcessing.id
                )
              : []
            : [],
      },
    },
  ]);
  const { updatedService } = useService();

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
        t(
          "Service.Manufacturing.PostProcessing.PostProcessing.error.noPostProcessings"
        )
      )}
    </LoadingSuspense>
  ) : postProcessings !== undefined ? (
    <div className="flex max-h-[60vh] flex-col gap-y-5 overflow-x-auto overflow-y-scroll">
      <ProcessPostProcessCatalog
        grid={grid}
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
