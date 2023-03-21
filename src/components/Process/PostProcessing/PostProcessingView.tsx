import React, { useEffect } from "react";
import { IPostProcessing, IProcess } from "../../../interface/Interface";
import { useTranslation } from "react-i18next";
import { EPostProcessingOption } from "../../../interface/enums";
import Catalog from "./Catalog";

interface Props {
  grid: boolean;
  processList: IProcess[];
  selectPostProcessing: (postProcessing: IPostProcessing) => void;
  setProgress(path: string): void;
}

const testData: IPostProcessing[] = [
  {
    title: "Number",
    checked: false,
    type: EPostProcessingOption.number,
    URI: require("/app/src/assets/images/Bubbles1_Trans.png"),
    value: "",
    valueList: [],
  },
  {
    title: "Text",
    checked: false,
    type: EPostProcessingOption.text,
    URI: require("/app/src/assets/images/Bubbles2_Trans.png"),
    value: "",
    valueList: [],
  },
  {
    title: "Selection",
    checked: false,
    type: EPostProcessingOption.selection,
    URI: require("/app/src/assets/images/Bubbles3_Trans.png"),
    value: "",
    valueList: ["wqert", "asd", "bnjuzmki,", "1234gternfgb"],
  },
  {
    title: "Number",
    checked: false,
    type: EPostProcessingOption.number,
    URI: require("/app/src/assets/images/Bubbles1_Trans.png"),
    value: "",
    valueList: [],
  },
  {
    title: "Text",
    checked: false,
    type: EPostProcessingOption.text,
    URI: require("/app/src/assets/images/Bubbles2_Trans.png"),
    value: "",
    valueList: [],
  },
  {
    title: "Selection",
    checked: false,
    type: EPostProcessingOption.selection,
    URI: require("/app/src/assets/images/Bubbles3_Trans.png"),
    value: "",
    valueList: ["wqert", "asd", "bnjuzmki,", "1234gternfgb"],
  },
  {
    title: "Number",
    checked: false,
    type: EPostProcessingOption.number,
    URI: require("/app/src/assets/images/Bubbles1_Trans.png"),
    value: "",
    valueList: [],
  },
  {
    title: "Text",
    checked: false,
    type: EPostProcessingOption.text,
    URI: require("/app/src/assets/images/Bubbles2_Trans.png"),
    value: "",
    valueList: [],
  },
  {
    title: "Selection",
    checked: false,
    type: EPostProcessingOption.selection,
    URI: require("/app/src/assets/images/Bubbles3_Trans.png"),
    value: "",
    valueList: ["wqert", "asd", "bnjuzmki,", "1234gternfgb"],
  },
];

export const PostProcessingView: React.FC<Props> = (props) => {
  const { setProgress, grid, processList, selectPostProcessing } = props;
  const { t } = useTranslation();
  useEffect(() => {
    setProgress("postprocessing");
  }, []);

  return (
    <div className="flex flex-col gap-y-5">
      <Catalog grid={grid} items={testData} selectItem={selectPostProcessing} />
    </div>
  );
};
