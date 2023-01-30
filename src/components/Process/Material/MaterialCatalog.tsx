import "../../../styles.scss";
import "../ProcessView.scss";
import "./Material.scss";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetch } from "../../../hooks/useFetch";
import Search from "../Header/Search/Search";
import { MaterialCatalogCard } from "./MaterialCatalogCard";
import { IMaterial } from "../../../interface/Interface";
import Loading from "../../../components/Process/Loading/Loading";
import { ProcessContext } from "../ProcessView";

interface Props {
  selectMaterial: (material: IMaterial) => void;
  setProgress(path: string): void;
}

interface State {
  filter: string;
  grid: boolean;
}

export const MaterialCatalog = ({ selectMaterial, setProgress }: Props) => {
  const { t } = useTranslation();
  const { data, isLoading, error } = useFetch<IMaterial>({
    url: "http://127.0.0.1:3030/materialList",
  });
  const [state, setState] = useState<State>({ filter: "", grid: true });
  useEffect(() => {
    setProgress("material");
  }, []);

  return (
    <div className="material-cards">
      <Loading
        isLoading={isLoading}
        data={data}
        error={error}
        errorText={t("model.catalog.error-name")}
        loadingErrorText={t("model.catalog.loading-error")}
        loadingText={t("model.catalog.loading-models")}
        component={
          !isLoading &&
          data &&
          !error && (
            <div className="material-cards">
              {data.slice(0, 12).map((material: IMaterial, index: number) => (
                <MaterialCatalogCard
                  grid={state.grid}
                  selectMaterial={selectMaterial}
                  material={material}
                  key={index}
                />
              ))}
            </div>
          )
        }
      />
    </div>
  );
};
