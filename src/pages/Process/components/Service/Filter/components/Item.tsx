import ProcessFilterSelection from "./Selection";
import ProcessFilterSliderSelection from "./SliderSelection";
import ProcessFilterSlider from "./Slider";
import ProcessFilterDatePicker from "./DatePicker";
import ProcessFilterTextInput from "./TextInput";
import ProcessFilterTextArea from "./TextArea";
import ProcessFilterColorPicker from "./ColorPicker";
import ProcessFilterNumberInput from "./NumberInput";
import ProcessFilterMultiSelection from "./MultiSelection";
import { FilterItemProps } from "../Filter";
import { Container, Heading } from "@component-library/index";
import { useTranslation } from "react-i18next";

interface Props {
  filterItem: FilterItemProps;
  setFilterItem(filterItem: FilterItemProps): void;
}

type FilterTitleType =
  | "costs"
  | "deliverTime"
  | "amount"
  | "categorys"
  | "boxSize"
  | "materialcategory"
  | "volume"
  | "materialCategory"
  | "proceeding"
  | "manufacturer"
  | "postProcessing"
  | "date"
  | "text"
  | "textarea"
  | "color"
  | "number"
  | "multiselection";

const ProcessFilterItem: React.FC<Props> = (props) => {
  const { filterItem, setFilterItem } = props;
  const { t } = useTranslation();

  const displayInput = () => {
    switch (filterItem.question.type) {
      case "SLIDER":
        return (
          <ProcessFilterSlider
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "SLIDERSELECTION":
        return (
          <ProcessFilterSliderSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "SELECTION":
        return (
          <ProcessFilterSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "MULTISELECTION":
        return (
          <ProcessFilterMultiSelection
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "DATE":
        return (
          <ProcessFilterDatePicker
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "TEXT":
        return (
          <ProcessFilterTextInput
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "TEXTAREA":
        return (
          <ProcessFilterTextArea
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "COLOR":
        return (
          <ProcessFilterColorPicker
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
      case "NUMBER":
        return (
          <ProcessFilterNumberInput
            filterItem={filterItem}
            setFilterItem={setFilterItem}
          />
        );
    }
  };

  const handleChangeCheckbox = () => {
    setFilterItem({
      ...filterItem,
      isChecked: !filterItem.isChecked,
    });
  };

  const translateTitle = (title: string) => {
    const titles: FilterTitleType[] = [
      "costs",
      "deliverTime",
      "amount",
      "categorys",
      "boxSize",
      "materialcategory",
      "volume",
      "materialCategory",
      "proceeding",
      "manufacturer",
      "postProcessing",
      "date",
      "text",
      "textarea",
      "color",
      "number",
      "multiselection",
    ];
    if (titles.includes(title as FilterTitleType)) {
      return t(`types.FilterCategoryType.${title as FilterTitleType}`);
    } else {
      return title;
    }
  };

  return (
    <Container
      direction="col"
      justify="start"
      width="full"
      align="start"
      gap={3}
    >
      <Container>
        <label className="flex flex-row items-center justify-center gap-5">
          <input
            type="checkbox"
            className="h-4 w-4"
            checked={filterItem.isChecked}
            onChange={handleChangeCheckbox}
          />
          <Heading variant="h3">
            {translateTitle(filterItem.question.title)}
          </Heading>
        </label>
      </Container>
      {filterItem.isChecked ? (
        <Container width="full">{displayInput()}</Container>
      ) : null}
    </Container>
  );
};

export default ProcessFilterItem;
