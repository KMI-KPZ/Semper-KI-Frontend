import "../ProcessView.scss";
import "./PostProcessing.scss";
import React from "react";
import { PostProcessing, ProcessState, Option } from "../../Interface";
import { PostProcessingOption } from "./PostProcessingOption";
import { useTranslation } from "react-i18next";

interface Props {
  state: ProcessState;
  setProgressState: (progressStateIndex: number) => void;
  selectPostProcessing: (postProcessing: PostProcessing) => void;
}

const testData: Option[] = [
  { name: "Bool-Option", checkInput: true },
  {
    name: "Bool-Auswahl-Folgeauswahl-Option",
    checkInput: true,
    selectionMenuList: [
      {
        name: "Auswahl",
        selectionList: [
          { name: "SelectOption 1", value: "1", price: 0, unit: "(E)" },
          { name: "SelectOption 2", value: "2", price: 0, unit: "(E)" },
          { name: "SelectOption 3", value: "3", price: 0, unit: "(E)" },
        ],
        followSelectionMenuList: [
          {
            name: "Folge-Auswahl",
            selectionList: [
              {
                name: "Folge SelectOption 1",
                value: "1",
                price: 0,
                unit: "(E)",
              },
              {
                name: "Folge SelectOption 2",
                value: "2",
                price: 0,
                unit: "(E)",
              },
              {
                name: "Folge SelectOption 3",
                value: "3",
                price: 0,
                unit: "(E)",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Bool-Auswahl-Nummereingabe-Option",
    checkInput: true,
    numberInput: true,
    selectionMenuList: [
      {
        name: "Auswahl",
        selectionList: [
          { name: "SelectOption 1", value: "1", price: 0, unit: "(E)" },
          { name: "SelectOption 2", value: "2", price: 0, unit: "(E)" },
          { name: "SelectOption 3", value: "3", price: 0, unit: "(E)" },
        ],
      },
      {
        name: "Auswahl 2",
        selectionList: [
          { name: "SelectOption 1", value: "1", price: 0, unit: "(E)" },
          { name: "SelectOption 2", value: "2", price: 0, unit: "(E)" },
          { name: "SelectOption 3", value: "3", price: 0, unit: "(E)" },
        ],
      },
    ],
  },
  { name: "Bool-Texteingabe-Option", stringInput: true },
];

export const PostProcessingView = ({
  setProgressState,
  state,
  selectPostProcessing,
}: Props) => {
  const { t } = useTranslation();

  const handleClickNext = () => {
    setProgressState(4);
  };

  return (
    <div className="process-content-container">
      <div className="post-processing-container">
        {testData.map((option: Option, index: number) => (
          <PostProcessingOption option={option} key={index} />
        ))}
        <div className="next-button dark" onClick={handleClickNext}>
          {t("post-processing.next")}
        </div>
      </div>
    </div>
  );
};
