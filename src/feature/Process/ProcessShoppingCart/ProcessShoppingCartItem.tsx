import React, { ReactNode } from "react";
import { DeleteForever } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import { Process, Specification } from "../../../interface/Interface";

interface Props {
  expanded: boolean;
  deleteShoppingCartItem: (index: number) => void;
  process: Process;
  isActiveProcess: boolean;
  selectProcess: (id: number) => void;
  setProgressState: (progressStateIndex: number) => void;
  setShoppingCardItemExpanded: (processId: number, expand: boolean) => void;
}

export const ShoppingCartItem = ({
  expanded,
  deleteShoppingCartItem,
  process,
  isActiveProcess,
  selectProcess,
  setProgressState,
  setShoppingCardItemExpanded,
}: Props) => {
  const { t } = useTranslation();

  const handleClickDelete = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    deleteShoppingCartItem(process.processId);
  };

  const handleClickEdit = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    progressStateIndex: number
  ) => {
    e.stopPropagation();
    selectProcess(process.processId);
    setProgressState(progressStateIndex);
  };

  const handleClickProcess = (
    e: React.MouseEvent<HTMLLIElement, MouseEvent>
  ) => {
    e.stopPropagation();
    selectProcess(process.processId);
  };

  const handleCLickProp = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    progressStateIndex: number
  ) => {
    e.stopPropagation();
    selectProcess(process.processId);
    setProgressState(progressStateIndex);
  };

  const handleClickNextAdd = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    progressStateIndex: number
  ) => {
    e.stopPropagation();
    selectProcess(process.processId);
    setProgressState(progressStateIndex);
  };

  const renderNextProcessAddButton = (): ReactNode => {
    let buttonName: string = "",
      stateIndex: number = 0;
    if (!process.model) {
      buttonName = t("shopping-cart.item.model");
      stateIndex = 0;
    } else if (!process.material) {
      buttonName = t("shopping-cart.item.material-procedure");
      stateIndex = 1;
    } else if (!process.manufacturer) {
      buttonName = t("shopping-cart.item.manufacturer");
      stateIndex = 2;
    } else if (!process.postProcessing) {
      buttonName = t("shopping-cart.item.post-processing");
      stateIndex = 3;
    } else if (!process.additive) {
      buttonName = t("shopping-cart.item.additive");
      stateIndex = 4;
    }

    return (
      <div
        className="addProgressButton"
        onClick={(e) => handleClickNextAdd(e, stateIndex)}
      >
        {t("shopping-cart.item.add", { buttonName })}
      </div>
    );
  };

  const handleHideClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setShoppingCardItemExpanded(process.processId, !expanded);
  };

  return (
    <li
      data-testid="item"
      className={`shoppingcart-item ${isActiveProcess ? "active" : ""}`}
      onClick={handleClickProcess}
    >
      <ul className="shoppingcard-item-list">
        <li className="shoppingcard-item-list-item header">
          <div
            data-testid="header-text"
            className="shoppingcard-item-header-text"
          >
            {t("shopping-cart.item.headline") + " "}
            {process.processId + 1}
          </div>
          <div className="shoppingcard-item-header-icons">
            {expanded ? (
              <KeyboardArrowUpIcon
                data-testid="minimizeButton"
                className="iconButton minimize"
                onClick={handleHideClick}
              />
            ) : (
              <KeyboardArrowDownIcon
                data-testid="maximizeButton"
                className="iconButton minimize"
                onClick={handleHideClick}
              />
            )}

            <DeleteForever
              data-testid="deleteButton"
              className="iconButton close"
              onClick={handleClickDelete}
            />
          </div>
        </li>

        {expanded && (
          <li className="shoppingcard-item-list-item">
            <hr className="divider small" />
          </li>
        )}
        {process.model && expanded && (
          <li className="shoppingcard-item-list-item">
            <div onClick={(e) => handleCLickProp(e, 0)}>
              {process.model.file.name}
            </div>
            <hr className="divider small" />
          </li>
        )}
        {process.material && expanded && (
          <li className="shoppingcard-item-list-item">
            <div onClick={(e) => handleCLickProp(e, 1)}>
              {process.material.name}
            </div>
            <hr className="divider small" />
          </li>
        )}
        {process.manufacturer && expanded && (
          <li className="shoppingcard-item-list-item">
            <div onClick={(e) => handleCLickProp(e, 2)}>
              {process.manufacturer.name}
            </div>
            <hr className="divider small" />
          </li>
        )}
        {process.postProcessing && expanded && (
          <li className="shoppingcard-item-list-item">
            {process.postProcessing &&
              process.postProcessing.specificationList && (
                <div onClick={(e) => handleCLickProp(e, 3)}>
                  {process.postProcessing.specificationList.map(
                    (spec: Specification, index: number) => (
                      <div key={index}>
                        {spec.name} {spec.value} {spec.unit} + {spec.price}
                      </div>
                    )
                  )}
                </div>
              )}
            <hr className="divider small" />
          </li>
        )}
        {process.additive && expanded && (
          <li className="shoppingcard-item-list-item">
            <div onClick={(e) => handleCLickProp(e, 4)}>
              <div>{process.additive.file}</div>
              <div>{process.additive.text}</div>
            </div>
            <hr className="divider small" />
          </li>
        )}
        {expanded && (
          <li className="shoppingcard-item-list-item">
            {renderNextProcessAddButton()}
          </li>
        )}
      </ul>
    </li>
  );
};
