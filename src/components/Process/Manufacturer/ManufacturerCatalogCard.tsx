import "./Manufacturer.scss";
import { IManufacturer } from "../../../interface/Interface";
import React from "react";
import { useTranslation } from "react-i18next";

interface Props {
  manufacturer: IManufacturer;
  selectManufacturer: (manufacturer: IManufacturer) => void;
}

export const ManufacturerCatalogCard: React.FC<Props> = (props) => {
  const { manufacturer, selectManufacturer } = props;
  const { t } = useTranslation();

  const handleAddClick = () => {
    selectManufacturer(manufacturer);
  };

  return (
    <div className="manufacturer-card">
      <img
        className="manufacturer-card-map"
        src={require("../../../assets/images/map_placeholder.png")}
        alt="Manufacturer"
      />
      <div className="manufacturer-card-column">
        <div className="manufacturer-card-headline">{manufacturer.name}</div>
        <div>
          {manufacturer.certificateList?.map(
            (certificate: string, index: number) => (
              <div className="manufacturer-card-text" key={index}>
                {certificate}
              </div>
            )
          )}
        </div>
        <div>
          {manufacturer.propList?.map((prop: string, index: number) => (
            <div className="manufacturer-card-text" key={index}>
              {prop}
            </div>
          ))}
        </div>
      </div>
      <div className="manufacturer-card-column">
        <div className="manufacturer-card-text">
          {t("manufacturer.catalog.card.distance")}
        </div>
        <div className="manufacturer-card-text-secondary">
          {manufacturer.distance ? manufacturer.distance : "000"} KM
        </div>
        <div className="manufacturer-card-text">
          {t("manufacturer.catalog.card.production-time")}
        </div>
        <div className="manufacturer-card-text-secondary">
          {manufacturer.productionTime ? manufacturer.productionTime : "000"}{" "}
          Tage
        </div>
        <div className="manufacturer-card-text">
          {t("manufacturer.catalog.card.deliver-time")}
        </div>
        <div className="manufacturer-card-text-secondary">
          {manufacturer.deliverTime ? manufacturer.deliverTime : "000"} Tage
        </div>
        <div className="manufacturer-card-text">
          {t("manufacturer.catalog.card.total-time")}
        </div>
        <div className="manufacturer-card-text-secondary">
          {manufacturer.productionTime && manufacturer.deliverTime
            ? manufacturer.productionTime + manufacturer.deliverTime
            : "000"}{" "}
          Tage
        </div>
      </div>
      <div className="manufacturer-card-column">
        <img
          className="firm-logo"
          src={require("../../../assets/images/firm_logo_placeholder.png")}
          alt="Firm Logo"
        />
        <div className="manufacturer-card-text">
          {t("manufacturer.catalog.card.price")}: <b>$$$</b>
        </div>
        <div className="manufacturer-card-button dark" onClick={handleAddClick}>
          {t("manufacturer.catalog.card.add")}
        </div>
      </div>
    </div>
  );
};
