import SettingsIcon from "@mui/icons-material/Settings";
import SearchIcon from "@mui/icons-material/Search";
import { Manufacturer } from "../../../Interface";
import React, { useState } from "react";

import "../../../styles.scss";
import "../../ProcessView.scss";
import "../Manufacturer.scss";
import { ManufacturerCatalogCard } from "./ManufacturerCatalogCard";
import { useFetch } from "../../../Hooks/useFetch";
import { useTranslation } from "react-i18next";
import { isNumber } from "../../../utils";

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
  selectManufacturer: (manufacturer: Manufacturer) => void;
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
  } = useFetch<Manufacturer>({ url: "http://localhost:3001/manufacturerList" });
  const [filter, setFilter] = useState<number>(0);

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
    manufacturerList: Manufacturer[],
    attribut: ManufacturerAttribut
  ): Manufacturer[] => {
    return manufacturerList.sort((man1: Manufacturer, man2: Manufacturer) => {
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
    let newManufacturerList: Manufacturer[] = manufacturerList.slice(0, 5);
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
          (man1: Manufacturer, man2: Manufacturer) => {
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
      (manufacturer: Manufacturer, index: number) => (
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
        <div className="user-input">
          <input
            type="text"
            className="input-field"
            placeholder={t("manufacturer.catalog.search-placeholder")}
          />
          <div className="settings button light">
            <SettingsIcon />
          </div>
          <div className="search button dark">
            <SearchIcon />
          </div>
        </div>
        <div className="filter">
          <div
            className={getFilterClassName(0)}
            onClick={(e) => handleClickFilter(e, 0)}
          >
            {t("manufacturer.catalog.filter.top-manufacturer")}
          </div>
          <div
            className={getFilterClassName(1)}
            onClick={(e) => handleClickFilter(e, 1)}
          >
            {t("manufacturer.catalog.filter.distance")}
          </div>
          <div
            className={getFilterClassName(2)}
            onClick={(e) => handleClickFilter(e, 2)}
          >
            {t("manufacturer.catalog.filter.time")}
          </div>
          <div
            className={getFilterClassName(3)}
            onClick={(e) => handleClickFilter(e, 3)}
          >
            {t("manufacturer.catalog.filter.price")}
          </div>
        </div>
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
