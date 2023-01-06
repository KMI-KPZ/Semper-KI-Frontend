import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IFilterItemOption, IFilterItem, IFilterAnswer } from "./Interface";
import "./Filter.scss";
import FilterItem from "./FilterItem";
import { Button, IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { IGuideAnswer } from "../../Guide/Interface";

import _filter from "./FilterQuestions.json";
const filter = _filter as IFilterItem[];

interface Props {
  guideAnswers: IGuideAnswer[];
  applyFilters(): void;
}

interface State {
  filter: IFilterItem[];
  filterAnswers: IFilterAnswer[];
}

const generateEmptyAnswers = (): IFilterAnswer[] => {
  let answers: IFilterAnswer[] = [];
  filter.forEach((filterItem: IFilterItem) => {
    filterItem.options.forEach((filterOption: IFilterItemOption) => {
      answers.push({
        categoryId: filterItem.id,
        filterId: filterOption.id,
        title: filterOption.title,
        value: { checked: false },
      });
    });
  });

  return answers;
};

const calcFilterWithGuideAnswers = (
  guideAnswers: IGuideAnswer[]
): IFilterAnswer[] => {
  let answers: IFilterAnswer[] = generateEmptyAnswers();

  guideAnswers.forEach((answer: IGuideAnswer, index: number) => {
    answers.forEach(
      (filterAnswer: IFilterAnswer, filterAnswerIndex: number) => {
        if (answer.filter === filterAnswer.title) {
          answers[filterAnswerIndex].value = answer.value;
          answers[filterAnswerIndex].value.checked = true;
        }
      }
    );
  });

  return answers;
};

const Filter: React.FC<Props> = ({ applyFilters, guideAnswers }) => {
  const [state, setState] = useState<State>({
    filter: filter,
    filterAnswers: calcFilterWithGuideAnswers(guideAnswers),
  });
  const { t } = useTranslation();

  const setFilterItems = (filter: IFilterItem[]) => {
    setState((prevState) => ({ ...prevState, filter }));
  };

  const setFilterAnswer = (newfilterAnswer: IFilterAnswer) => {
    setState((prevState) => ({
      ...prevState,
      filterAnswers: [
        ...prevState.filterAnswers.filter(
          (filterAnswer: IFilterAnswer) =>
            filterAnswer.categoryId < newfilterAnswer.categoryId
        ),
        ...prevState.filterAnswers.filter(
          (filterAnswer: IFilterAnswer) =>
            filterAnswer.categoryId === newfilterAnswer.categoryId &&
            filterAnswer.filterId < newfilterAnswer.filterId
        ),
        newfilterAnswer,
        ...prevState.filterAnswers.filter(
          (filterAnswer: IFilterAnswer) =>
            filterAnswer.categoryId === newfilterAnswer.categoryId &&
            filterAnswer.filterId > newfilterAnswer.filterId
        ),
        ...prevState.filterAnswers.filter(
          (filterAnswer: IFilterAnswer) =>
            filterAnswer.categoryId > newfilterAnswer.categoryId
        ),
      ],
    }));
  };

  const setFilterOpen = (filterItemId: number, open: boolean): void => {
    const newFilter: IFilterItem[] = [
      ...filter.filter((filter: IFilterItem) => filter.id < filterItemId),
      {
        ...filter.filter(
          (filter: IFilterItem) => filter.id === filterItemId
        )[0],
        open,
      },
      ...filter.filter((filter: IFilterItem) => filter.id > filterItemId),
    ];

    setFilterItems(newFilter);
  };

  const onClickReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, filterAnswers: [] }));
  };

  const onClickApply = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    applyFilters();
  };

  return (
    <div className="filter">
      <h2 className="filter-headline">{t("filter.headline")}</h2>
      <hr className="filter-hr large" />

      {filter.map((filter: IFilterItem, index: number) => (
        <FilterItem
          key={index}
          filter={filter}
          filterAnswers={state.filterAnswers}
          setFilterOpen={setFilterOpen}
          setFilterAnswer={setFilterAnswer}
        />
      ))}
      {
        <div className="filter-buttons">
          <Button variant="contained" onClick={onClickReset}>
            Reset
          </Button>
          <Button variant="contained" onClick={onClickApply}>
            Anwenden
          </Button>
        </div>
      }
    </div>
  );
};

export default Filter;
