import {
  IOption,
  ISelection,
  ISelectionMenu,
} from "../../../interface/Interface";

import "./PostProcessing.scss";
import { useTranslation } from "react-i18next";

interface Props {
  option: IOption;
}

export const PostProcessingOption: React.FC<Props> = (props) => {
  const { option } = props;
  const { t } = useTranslation();

  return (
    <div className="post-processing-option">
      {option.checkInput && (
        <input className="post-processing-option-checkbox" type="checkbox" />
      )}
      <div className="post-processing-option-headline">{option.name}</div>
      {option.numberInput && (
        <input className="post-processing-option-number" type="number" />
      )}
      {option.stringInput && (
        <textarea
          className="post-processing-option-text"
          placeholder={
            t("post-processing.option.text-area-placeholder") + option.name
          }
        />
      )}
      {option.selectionMenuList && (
        <>
          {option.selectionMenuList.map(
            (selectionMenu: ISelectionMenu, selectionMenuIndex: number) => {
              return (
                <select
                  className="post-processing-option-select"
                  key={selectionMenu.name + selectionMenuIndex}
                  defaultValue={"default"}
                >
                  <option
                    value="default"
                    className="post-processing-option-select-option"
                    disabled
                  >
                    {selectionMenu.name}
                  </option>
                  {selectionMenu.selectionList.map(
                    (selection: ISelection, selectionIndex: number) => (
                      <option
                        key={selectionIndex}
                        className="post-processing-option-select-option"
                        value={selection.value}
                      >
                        {selection.name} {selection.unit}{" "}
                        {selection.price ? "| " + selection.price + "€" : ""}
                      </option>
                    )
                  )}
                </select>
              );
            }
          )}
        </>
      )}
    </div>
  );
};
