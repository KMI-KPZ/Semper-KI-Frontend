import React, { useEffect, useState } from "react";
import { IPostProcessing } from "../../../interface/Interface";
import Catalog from "./Catalog";
import { IProcessState } from "../ProcessView";

interface Props {
  processState: IProcessState;
  postprocessings: IPostProcessing[];
  selectPostProcessings: (postProcessings: IPostProcessing[]) => void;
  setProgress(path: string): void;
}

export const PostProcessingView: React.FC<Props> = (props) => {
  const { setProgress, processState, postprocessings, selectPostProcessings } =
    props;
  const { grid, searchText, activeItemIndex, items } = processState;
  const _checkedPostprocessings: IPostProcessing[] | undefined =
    items[activeItemIndex].postProcessings;
  const checkedPostprocessings: IPostProcessing[] =
    _checkedPostprocessings === undefined ? [] : _checkedPostprocessings;
  useEffect(() => {
    setProgress("postprocessing");
  }, []);

  const checkPostProcessing = (postProcessing: IPostProcessing) => {
    const remove: boolean =
      checkedPostprocessings.filter(
        (checked) => checked.id === postProcessing.id
      ).length > 0;
    selectPostProcessings(
      remove === true
        ? checkedPostprocessings.filter(
            (checked) => checked.id !== postProcessing.id
          )
        : [...checkedPostprocessings, { ...postProcessing, checked: true }]
    );
  };
  const hydratePostProcessings = (
    initialPostProcessings: IPostProcessing[],
    checkedPostprocessings: IPostProcessing[]
  ): IPostProcessing[] => {
    let initialIdList: string[] = initialPostProcessings.map((item) => item.id);
    let filteredPostprocessings: IPostProcessing[] =
      checkedPostprocessings.filter((item) => initialIdList.includes(item.id));
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
    <div className="flex flex-col gap-y-5">
      <Catalog
        grid={grid}
        searchText={searchText}
        items={hydratePostProcessings(postprocessings, checkedPostprocessings)}
        checkItem={checkPostProcessing}
      />
    </div>
  );
};
