import { IFilterItem } from "./Interface";
import FSelection from "./Components/FSelection";
import FSliderSelection from "./Components/FSliderSelection";
import FSlider from "./Components/FSlider";
import FDate from "./Components/FDate";
import FText from "./Components/FText";
import FTextArea from "./Components/FTextArea";
import FColor from "./Components/FColor";
import FNumber from "./Components/FNumber";
import FMultiSelection from "./Components/FMultiSelection";

interface Props {
  filterItem: IFilterItem;
  setFilterItem(filterItem: IFilterItem): void;
}

const FilterItem: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;

  const displayInput = () => {
    switch (filterItem.question.type) {
      case "slider":
        return (
          <FSlider filterItem={filterItem} setFilterItem={setFilterItem} />
        );
      case "sliderselection":
        return (
          <FSliderSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "selection":
        return (
          <FSelection filterItem={filterItem} setFilterItem={setFilterItem} />
        );
      case "multiselection":
        return (
          <FMultiSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "date":
        return <FDate filterItem={filterItem} setFilterItem={setFilterItem} />;
      case "text":
        return <FText filterItem={filterItem} setFilterItem={setFilterItem} />;
      case "textarea":
        return (
          <FTextArea filterItem={filterItem} setFilterItem={setFilterItem} />
        );
      case "color":
        return <FColor filterItem={filterItem} setFilterItem={setFilterItem} />;
      case "number":
        return (
          <FNumber filterItem={filterItem} setFilterItem={setFilterItem} />
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
        <h3>{filterItem.question.title}</h3>
      </div>
      <div className="flex justify-center">
        {filterItem.isChecked ? displayInput() : ""}
      </div>
    </div>
  );
};

export default FilterItem;
