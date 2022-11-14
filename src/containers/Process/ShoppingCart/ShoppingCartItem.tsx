import "./ShoppingCart.scss";
import React, { ReactNode } from "react";
import { DeleteForever } from "@mui/icons-material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import { useTranslation } from "react-i18next";
import { Process, Specification } from "../../../Interface";

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
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
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
    <div
      data-testid="item"
      className={`shoppingCartItem pointer ${isActiveProcess ? "active" : ""}`}
      onClick={handleClickProcess}
    >
      <div className="shoppingCardItemHeader">
        {process.model && !expanded && (
          <div data-testid="minimizeText" className="shoppingCardItem-text">
            {process.model.file.name}
          </div>
        )}
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
      {process.model && expanded && (
        <div className="Section">
          <div className="Header">
            <EditIcon
              data-testid="modelEditButton"
              className="iconButton"
              onClick={(e) => handleClickEdit(e, 0)}
            />
            {t("shopping-cart.item.model")}
          </div>
          <div
            data-testid="prop"
            className="Text"
            onClick={(e) => handleCLickProp(e, 0)}
          >
            {process.model.file.name}
          </div>
        </div>
      )}
      {process.material && expanded && (
        <div className="Section">
          <div className="Divider" />
          <div className="Header">
            <EditIcon
              data-testid="materialEditButton"
              className="iconButton"
              onClick={(e) => handleClickEdit(e, 1)}
            />
            {t("shopping-cart.item.material-procedure")}
          </div>
          <div
            data-testid="prop"
            className="Text"
            onClick={(e) => handleCLickProp(e, 1)}
          >
            {process.material.name}
          </div>
        </div>
      )}
      {process.manufacturer && expanded && (
        <div className="Section">
          <div className="Divider" />
          <div className="Header">
            <EditIcon
              data-testid="manufacturerEditButton"
              className="iconButton"
              onClick={(e) => handleClickEdit(e, 2)}
            />
            {t("shopping-cart.item.manufacturer")}
          </div>
          <div
            data-testid="prop"
            className="Text"
            onClick={(e) => handleCLickProp(e, 2)}
          >
            {process.manufacturer.name}
          </div>
        </div>
      )}
      {process.postProcessing && expanded && (
        <div className="Section">
          <div className="Divider" />
          <div className="Header">
            <EditIcon
              data-testid="postProcessingEditButton"
              className="iconButton"
              onClick={(e) => handleClickEdit(e, 3)}
            />
            {t("shopping-cart.item.post-processing")}
          </div>
          {process.postProcessing && process.postProcessing.specificationList && (
            <div
              data-testid="prop"
              className="Text"
              onClick={(e) => handleCLickProp(e, 3)}
            >
              {process.postProcessing.specificationList.map(
                (spec: Specification, index: number) => (
                  <div key={index}>
                    {spec.name} {spec.value} {spec.unit} + {spec.price}
                  </div>
                )
              )}
            </div>
          )}
        </div>
      )}
      {process.additive && expanded && (
        <div className="Section">
          <div className="Divider" />
          <div className="Header">
            <EditIcon
              data-testid="additivelEditButton"
              className="iconButton"
              onClick={(e) => handleClickEdit(e, 4)}
            />
            {t("shopping-cart.item.additive")}
          </div>
          <div
            data-testid="prop"
            className="Text"
            onClick={(e) => handleCLickProp(e, 4)}
          >
            <div>{process.additive.file}</div>
            <div>{process.additive.text}</div>
          </div>
        </div>
      )}
      {renderNextProcessAddButton()}
    </div>
  );
};
