import { Heading } from "@component-library/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import useGuideState from "./hooks/useGuideState";
import {
  FilterItemProps,
  FilterAnswerProps,
} from "../OrderRoutes/Service/Manufacturing/Filter/Filter";

export interface GuideProps {
  title: string;
  questions: GuideQuestionProps[];
}

export interface GuideQuestionProps {
  type: GuideQuestionType;
  filterId: number;
  title: string;
  options: GuideOptionProps[];
}

export enum GuideQuestionType {
  "selection",
  "multiSelection",
  "range",
}

export interface GuideOptionProps {
  checked: boolean;
  title?: string;
  icon?: string;
  answer: FilterAnswerProps;
}

export enum EGuideQuestionState {
  "question",
  "answer",
  "overview",
}

interface Props {
  setFilter(filter: FilterItemProps[]): void;
}

export interface GuideState {
  menuOpen: boolean;
}

const GuideRoutes: React.FC<Props> = (props) => {
  const { setFilter } = props;
  const [state, setState] = useState<GuideState>({ menuOpen: false });
  const navigate = useNavigate();
  const { path } = useParams();
  const handleOutsideClick = () => {
    setState((prevState) => ({ ...prevState, menuOpen: false }));
    navigate("/guide");
  };
  useGuideState(path, setState);

  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-start gap-5">
      <Heading variant="h1">{t("Guide.GuideRoutes.header")}</Heading>
      <div className="flex w-full flex-col items-start justify-center gap-5 md:flex-row">
        <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
          <Heading variant="h2">
            {t("Guide.GuideRoutes.information.header")}
          </Heading>
          <span>{t("Guide.GuideRoutes.information.explanation")}</span>
          <div className="w-full border-t-2" />
          <div className="flex flex-col items-start justify-start gap-3">
            <div>
              {"> "}
              {t("Guide.GuideRoutes.information.beginner")}
            </div>
            <div>
              {"> "}
              {t("Guide.GuideRoutes.information.advanced")}
            </div>
            <div>
              {"> "}
              {t("Guide.GuideRoutes.information.expert")}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
          <Heading variant="h2">
            {t("Guide.GuideRoutes.service.header")}
          </Heading>
          <span>{t("Guide.GuideRoutes.service.explanation")}</span>
          <div className="w-full border-t-2" />
          <div className="flex flex-col items-start justify-start gap-3">
            <div>
              {"> "}
              {t("Guide.GuideRoutes.service.use-produce")}
            </div>
            <div>
              {"> "}
              {t("Guide.GuideRoutes.service.use-design")}
            </div>
            <div>
              {"> "}
              {t("Guide.GuideRoutes.service.use-accompany")}
            </div>
            <div className="w-full border-t-2" />
            <div>
              {"> "}
              {t("Guide.GuideRoutes.service.provide-produce")}
            </div>
            <div>
              {"> "}
              {t("Guide.GuideRoutes.service.provide-design")}
            </div>
            <div>
              {"> "}
              {t("Guide.GuideRoutes.service.provide-accompany")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideRoutes;
