import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { IManufacturer } from "../../../interface/Interface";
import React, { useState } from "react";

import "../../../styles.scss";
import "../ProcessView.scss";
import "./Manufacturer.scss";
import { useTranslation } from "react-i18next";
import { useFetch } from "../../../hooks/useFetch";
import Search from "../../../components/Process/Search/Search";
import { isNumber } from "../../../services/utils";
import { ManufacturerCatalogCard } from "./ManufacturerCatalogCard";

type ManufacturerAttribut =
  | "manufacturerId"
  | "name"
  | "propList"
  | "certificateList"
  | "distance"
  | "productionTime"
  | "deliverTime"
  | "location";

interface Props {
  setProgressState: (progressStateIndex: number) => void;
  selectManufacturer: (manufacturer: IManufacturer) => void;
}

interface State {
  filter: string;
  grid: boolean;
}

export const ManufacturerCatalog = ({
  setProgressState,
  selectManufacturer,
}: Props) => {
  const { t } = useTranslation();
  const {
    data: manufacturerList,
    isLoading: manufacturerIsLoading,
    error: manufacturerLoadingError,
  } = useFetch<IManufacturer>({
    url: "http://localhost:3030/manufacturerList",
  });
  const [filter, setFilter] = useState<number>(0);
  const [state, setState] = useState<State>({ filter: "", grid: true });

  const handleClickGrid = (grid: boolean) => {
    setState((prevState) => ({ ...prevState, grid: grid }));
  };

  const getFilterClassName = (index: number): string => {
    return `filter-text ${filter === index ? "active" : ""}`;
  };

  const handleClickFilter = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ): void => {
    e.preventDefault();
    setFilter(index);
    console.log("handelClickFilter", index);
  };

  const sortManufacturers = (
    manufacturerList: IManufacturer[],
    attribut: ManufacturerAttribut
  ): IManufacturer[] => {
    return manufacturerList.sort((man1: IManufacturer, man2: IManufacturer) => {
      if (!attribut || !man1 || !man2 || !man1[attribut] || !man2[attribut])
        return 0;
      if (
        typeof man1[attribut] === "string" &&
        typeof man1[attribut] === "string"
      ) {
        return man2[attribut]! > man1[attribut]! ? 1 : -1;
      }
      if (isNumber(man1[attribut]) && isNumber(man2[attribut])) {
        return Number(man2[attribut]!) - Number(man1[attribut]!);
      }
      return 0;
    });
  };

  const renderManufacturerList = () => {
    let newManufacturerList: IManufacturer[] = manufacturerList.slice(0, 5);
    switch (filter) {
      case 0:
        newManufacturerList = sortManufacturers(newManufacturerList, "name");
        break;
      case 1:
        newManufacturerList = sortManufacturers(
          newManufacturerList,
          "deliverTime"
        );
        break;
      case 2:
        newManufacturerList = newManufacturerList.sort(
          (man1: IManufacturer, man2: IManufacturer) => {
            if (
              man1.deliverTime !== undefined &&
              man2.deliverTime !== undefined &&
              man1.productionTime !== undefined &&
              man2.productionTime !== undefined
            ) {
              return (
                man1.deliverTime +
                man1.productionTime -
                (man2.deliverTime + man2.productionTime)
              );
            } else return 0;
          }
        );
        break;
      case 3:
        break;
      default:
        break;
    }

    return newManufacturerList.map(
      (manufacturer: IManufacturer, index: number) => (
        <ManufacturerCatalogCard
          key={index}
          manufacturer={manufacturer}
          setProgressState={setProgressState}
          selectManufacturer={selectManufacturer}
        />
      )
    );
  };

  return (
    <div className="process-content-container">
      <div className="catalog-container">
        <Search
          grid={state.grid}
          handleClickGrid={handleClickGrid}
          headline={t("manufacturer.catalog.headline")}
          placeholder={t("manufacturer.catalog.search-placeholder")}
        />
        {manufacturerLoadingError && (
          <div>
            {t("manufacturer.catalog.loading-error")}
            <br />
            {t("manufacturer.catalog.error-name")}:{" "}
            {manufacturerLoadingError.message}
          </div>
        )}
        {(manufacturerIsLoading || !manufacturerList) &&
          !manufacturerLoadingError && (
            <div>{t("manufacturer.catalog.loading-manufacturer")}</div>
          )}
        {!manufacturerIsLoading &&
          manufacturerList &&
          !manufacturerLoadingError && (
            <div className="manufacturer-cards">{renderManufacturerList()}</div>
          )}
      </div>
    </div>
  );
};
