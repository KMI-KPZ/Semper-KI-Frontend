import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import CardView, { ICardGroup } from "../CardView/CardView";
import PopUp from "../PopUp/PopUp";
import { IFilterItem } from "../Process/Filter/Interface";
import Guide from "./Guide";
import _GuideCards from "./GuideCards.json";
const GuideCards = _GuideCards as ICardGroup[];

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
    <div className="">
      <CardView title={t("Guide.GuideRoutes.header")} cardGroups={GuideCards} />
      <PopUp open={state.menuOpen} onOutsideClick={handleOutsideClick}>
        <Guide setFilter={setFilter} />
      </PopUp>
    </div>
  );
};

export default GuideRoutes;
