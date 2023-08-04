import ProcessFilterSelection from "./Selection";
import ProcessFilterSliderSelection from "./SliderSelection";
import ProcessFilterSlider from "./Slider";
import ProcessFilterDatePicker from "./DatePicker";
import ProcessFilterTextInput from "./TextInput";
import ProcessFilterTextArea from "./TextArea";
import ProcessFilterColorPicker from "./ColorPicker";
import ProcessFilterNumberInput from "./NumberInput";
import ProcessFilterMultiSelection from "./MultiSelection";
import { IFilterItem } from "../Filter";
import { Heading } from "@component-library/Typography";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const ProcessFilterItem: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;

  const displayInput = () => {
    switch (filterItem.question.type) {
      case "slider":
        return (
          <ProcessFilterSlider
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "sliderselection":
        return (
          <ProcessFilterSliderSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "selection":
        return (
          <ProcessFilterSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "multiselection":
        return (
          <ProcessFilterMultiSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "date":
        return (
          <ProcessFilterDatePicker
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "text":
        return (
          <ProcessFilterTextInput
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "textarea":
        return (
          <ProcessFilterTextArea
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "color":
        return (
          <ProcessFilterColorPicker
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "number":
        return (
          <ProcessFilterNumberInput
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      default:
        return <></>;
    }
  };

  const handleChangeCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterItem({
      ...filterItem,
      isChecked: !filterItem.isChecked,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-start gap-2 pl-2">
        <input
          type="checkbox"
          checked={filterItem.isChecked}
          onChange={handleChangeCheckbox}
        />
        <Heading variant="h3">{filterItem.question.title}</Heading>
      </div>
      <div className="flex justify-center">
        {filterItem.isChecked ? displayInput() : ""}
      </div>
    </div>
  );
};

export default ProcessFilterItem;
