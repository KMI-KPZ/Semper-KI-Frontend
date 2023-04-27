import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useCart from "../../../hooks/useCart";
import { IProcessItem } from "../../../interface/Interface";
import Button from "../../General/Button";
import ManufacturerItem from "./ManufacturerItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface Props {}

interface State {
  manufacturerIDs: string[];
  error: boolean;
}

const ManufacturerView: React.FC<Props> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const { cart, error, status, uploadCart } = useCart();
  const [state, setState] = useState<State>({
    manufacturerIDs: cart.map(() => ""),
    error: false,
  });
  const { error: checkError, manufacturerIDs } = state;
  const { t } = useTranslation();
  const toggelManufacturerByIndex = (
    _itemIndex: number,
    manufacturerID: string
  ) => {
    setState((prevState) => ({
      ...prevState,
      manufacturerIDs: [
        ...prevState.manufacturerIDs.filter(
          (manufacturerID, itemIndex) => itemIndex < _itemIndex
        ),
        manufacturerID,
        ...prevState.manufacturerIDs.filter(
          (manufacturerID, itemIndex) => itemIndex > _itemIndex
        ),
      ],
    }));
  };

  const checkAllItems = (): boolean => {
    return (
      manufacturerIDs.filter((manufacturerIndex) => manufacturerIndex !== "")
        .length === manufacturerIDs.length && cart.length > 0
    );
  };

  const hydrateProcessItems = (): IProcessItem[] => {
    return cart.map((processItem, index) => ({
      ...processItem,
      manufacturerID: manufacturerIDs[index],
    }));
  };

  const handleOnCLickCheck = () => {
    if (checkAllItems()) {
      uploadCart.mutate(hydrateProcessItems());
      navigate("/checkout");
    } else {
      setState((prevState) => ({ ...prevState, error: true }));
      setTimeout(
        () => setState((prevState) => ({ ...prevState, error: false })),
        5000
      );
    }
  };

  const handleOnClickCart = () => {
    navigate("/cart");
  };

  const handleOnClickAdd = () => {
    navigate("/process/model");
  };

  if (status === "loading")
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-center p-2 bg-white w-full">
          {t("General.request.loading")}
        </h1>
      </div>
    );
  if (status === "error" && error !== null)
    return (
      <div className="flex flex-col items-center justify-center w-full h-full">
        <h1 className="text-center p-2 bg-white w-full">
          {t("General.request.error")}: {error.message}
        </h1>
      </div>
    );

  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
        <h1 className="text-center p-2 w-full">
          {t("AfterProcess.Manufacturer.ManufacturerView.header")}
        </h1>
      </div>
      {checkError === true ? (
        <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
          <h2 className="text-red-500">
            {t(
              "AfterProcess.Manufacturer.ManufacturerView.noManufacturerSelected"
            )}
          </h2>
        </div>
      ) : null}
      <div className="w-full flex flex-col gap-5 justify-start items-center">
        {cart.length > 0 ? (
          cart.map((processItem, index) => (
            <ManufacturerItem
              processItem={processItem}
              key={index}
              itemIndex={index}
              manufacturerID={manufacturerIDs[index]}
              setManufacturerIndex={toggelManufacturerByIndex}
            />
          ))
        ) : (
          <h2>
            {t(
              "AfterProcess.Manufacturer.ManufacturerView.noManufacturerSelected"
            )}
          </h2>
        )}
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <Button
          onClick={handleOnClickCart}
          icon={<ArrowBackIcon />}
          iconPos="front"
        >
          {t("AfterProcess.Manufacturer.ManufacturerView.button.cart")}
        </Button>
        <Button
          onClick={handleOnCLickCheck}
          icon={<ArrowForwardIcon />}
          iconPos="back"
        >
          {t("AfterProcess.Manufacturer.ManufacturerView.button.checkOrder")}
        </Button>
      </div>
    </div>
  );
};

export default ManufacturerView;
