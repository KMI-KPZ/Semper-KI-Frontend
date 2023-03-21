import React, { useEffect } from "react";
import { IPostProcessing } from "../../../interface/Interface";
import { useTranslation } from "react-i18next";
import Catalog from "./Catalog";

interface Props {
  grid: boolean;
  postprocessings: IPostProcessing[];
  selectPostProcessing: (postProcessing: IPostProcessing) => void;
  setProgress(path: string): void;
}

export const PostProcessingView: React.FC<Props> = (props) => {
  const { setProgress, grid, postprocessings, selectPostProcessing } = props;
  const { t } = useTranslation();
  useEffect(() => {
    setProgress("postprocessing");
  }, []);

  return (
    <div className="flex flex-col gap-y-5">
      <Catalog
        grid={grid}
        items={postprocessings}
        selectItem={selectPostProcessing}
      />
    </div>
  );
};
