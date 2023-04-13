import { IProcessItem } from "@/interface/Interface";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "src/components/General/Button";
import useCart from "src/hooks/useCart";
import ManufacturerItem from "./ManufacturerItem";

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
        .length === manufacturerIDs.length
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

  return (
    <div className="flex flex-col items-center gap-5 w-full p-5">
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
        <h1 className="text-center p-2 w-full">Hersteller auswählen</h1>
      </div>
      {checkError === true ? (
        <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
          <h2 className="text-red-500">
            Bitte bei jedem Item einen Hersteller auswählen!
          </h2>
        </div>
      ) : null}
      <div className="bg-white w-full p-5 flex flex-col gap-5 justify-start items-center">
        {cart !== undefined ? (
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
          <h2>ein Fehler ist aufgetreten</h2>
        )}
      </div>
      <Button onClick={handleOnCLickCheck}>Überprüfen</Button>
    </div>
  );
};

export default ManufacturerView;
