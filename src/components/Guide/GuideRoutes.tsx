import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import CardView, { CardGroupData } from "../CardView/CardView";
import PopUp from "../PopUp/PopUp";
import { IFilterItem } from "../Process/Filter/Interface";
import Guide from "./Guide";
import { GuideItems } from "../../data/GuideItems";

interface Props {
  setFilter(filter: IFilterItem[]): void;
}

interface State {
  menuOpen: boolean;
}

const GuideRoutes: React.FC<Props> = (props) => {
  const { setFilter } = props;
  const [state, setState] = useState<State>({ menuOpen: false });
  const navigate = useNavigate();
  const { path } = useParams();
  const handleOutsideClick = () => {
    setState((prevState) => ({ ...prevState, menuOpen: false }));
    navigate("/guide");
  };
  const { t } = useTranslation();

  useEffect(() => {
    if (path !== undefined) {
      setState((prevState) => ({ ...prevState, menuOpen: true }));
    }
  }, [path]);

  return (
    <div className="flex flex-col gap-5 items-center justify-start w-full">
      <h1 className="p-5 bg-white w-full text-center">
        {t("Guide.GuideRoutes.header")}
      </h1>
      <div className="flex flex-col md:flex-row gap-5 items-start justify-center w-full">
        <div className="flex flex-col gap-5 items-center justify-start bg-white p-5 w-full">
          <h2>{t("Guide.GuideRoutes.information.header")}</h2>
          <span>{t("Guide.GuideRoutes.information.explanation")}</span>
          <div className="border-t-2 w-full" />
          <div className="flex flex-col justify-start items-start gap-3">
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
        <div className="flex flex-col gap-5 items-center justify-start bg-white p-5 w-full">
          <h2>{t("Guide.GuideRoutes.service.header")}</h2>
          <span>{t("Guide.GuideRoutes.service.explanation")}</span>
          <div className="border-t-2 w-full" />
          <div className="flex flex-col justify-start items-start gap-3">
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
            <div className="border-t-2 w-full" />
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
