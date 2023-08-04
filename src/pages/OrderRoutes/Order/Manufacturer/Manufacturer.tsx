import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@component-library/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { LoadingSuspense } from "@component-library/Loading";
import ProcessManufacturerItem from "./components/Item";
import { Heading } from "@component-library/Typography";
import { IProcessItem } from "../../SubOrder/Service/Manufacturing/types";

interface Props {}

interface State {
  manufacturerIDs: string[];
  error: boolean;
}

export interface IManufacturer {
  name: string;
  id: string;
}

const ProcessManufacturer: React.FC<Props> = (props) => {
  const {} = props;
  const navigate = useNavigate();
  const [state, setState] = useState<State>({
    manufacturerIDs: [].map(() => ""),
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
    return true;
    // return (
    //   manufacturerIDs.filter((manufacturerIndex) => manufacturerIndex !== "")
    //     .length === manufacturerIDs.length && cart.length > 0
    // );
  };

  const hydrateProcessItems = (): IProcessItem[] => {
    return [];
    // return cart.map((processItem, index) => ({
    //   ...processItem,
    //   manufacturerID: manufacturerIDs[index],
    // }));
  };

  const handleOnCLickCheck = () => {
    // if (checkAllItems()) {
    //   updateCart.mutate(hydrateProcessItems());
    //   navigate("/checkout");
    // } else {
    //   setState((prevState) => ({ ...prevState, error: true }));
    //   setTimeout(
    //     () => setState((prevState) => ({ ...prevState, error: false })),
    //     5000
    //   );
    // }
  };

  const handleOnClickCart = () => {
    navigate("/cart");
  };

  const handleOnClickAdd = () => {
    navigate("model");
  };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
        <Heading variant="h1">
          {t("AfterProcess.Manufacturer.ManufacturerView.header")}
        </Heading>
      </div>
      {checkError === true ? (
        <div className="flex w-full flex-col items-center justify-start gap-5 bg-white p-5">
          <Heading variant="h2">
            {t(
              "AfterProcess.Manufacturer.ManufacturerView.noManufacturerSelected"
            )}
          </Heading>
        </div>
      ) : null}
      <div className="flex w-full flex-col items-center justify-start gap-5">
        {true ? (
          [].map((processItem, index) => (
            <ProcessManufacturerItem
              processItem={processItem}
              key={index}
              itemIndex={index}
              manufacturerID={manufacturerIDs[index]}
              setManufacturerIndex={toggelManufacturerByIndex}
            />
          ))
        ) : (
          <Heading variant="h2">
            {t(
              "AfterProcess.Manufacturer.ManufacturerView.noManufacturerSelected"
            )}
          </Heading>
        )}
      </div>
      <div className="flex flex-col gap-5 md:flex-row">
        <Button
          onClick={handleOnClickCart}
          startIcon={<ArrowBackIcon />}
          title={t("AfterProcess.Manufacturer.ManufacturerView.button.cart")}
        />
        <Button
          onClick={handleOnCLickCheck}
          endIcon={<ArrowForwardIcon />}
          title={t(
            "AfterProcess.Manufacturer.ManufacturerView.button.checkOrder"
          )}
        />
      </div>
    </div>
  );
};

export default ProcessManufacturer;
