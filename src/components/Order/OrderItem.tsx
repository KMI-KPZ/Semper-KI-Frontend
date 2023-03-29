import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IProcessItem } from "../../interface/Interface";
import { getModelURI } from "../../services/utils";
import { AppContext } from "../App/App";

interface Props {
  process: IProcessItem;
  index: number;
}

const OrderItem: React.FC<Props> = (props) => {
  const { setAppState } = useContext(AppContext);
  const { process, index } = props;
  const navigate = useNavigate();
  const { model, material, postProcessings } = process;

  const selectProgressItem = (progress: string) => {
    setAppState((prevState) => ({
      ...prevState,
      selectedProgressItem: { index, progress },
    }));
  };

  const handleOnClickModel = () => {
    navigate("/process/model");
    selectProgressItem("model");
  };
  const handleOnClickMaterial = () => {
    navigate("/process/material");
    selectProgressItem("material");
  };
  const handleOnClickPostprocessing = () => {
    navigate("/process/postprocessing");
    selectProgressItem("postprocessing");
  };

  return (
    <ul className="flex flex-col bg-white md:gap-4 md:flex-row w-full md:flex-wrap justify-between">
      <li className="flex flex-col w-full md:max-w-[250px]">
        <img
          className="h-30 md:h-full max-h-[250px] w-full object-cover"
          src={
            model === undefined
              ? require("../../assets/images/model_placeholder.png")
              : getModelURI(model)
          }
          alt="Model"
        />
      </li>
      <li className="flex flex-col w-4/5 p-2">
        <ul className="flex flex-col bg-white md:gap-4 md:flex-row w-full md:h-full md:flex-wrap md:justify-around justify-center">
          <li
            onClick={handleOnClickModel}
            className={`flex flex-col w-full md:w-fit py-3 px-5 hover:bg-slate-200 hover:cursor-pointer
             ${model === undefined ? "bg-red-100" : ""}`}
          >
            {model !== undefined ? (
              <>
                <h2>{model.title}</h2>
                <span>{model.tags}</span>
                <span>{model.certificate}</span>
                <span>{model.license}</span>
                <span>{model.date}</span>
              </>
            ) : (
              <>
                <h2>Model-Name</h2>
                <span>---</span>
              </>
            )}
          </li>
          <li
            onClick={handleOnClickMaterial}
            className={`flex flex-col w-full md:w-fit py-3 px-5 hover:bg-slate-200 hover:cursor-pointer ${
              material === undefined ? "bg-red-100" : ""
            }`}
          >
            {material !== undefined ? (
              <>
                <h2>{material.title}</h2>
                <span>{material.propList.join(", ")}</span>
              </>
            ) : (
              <>
                <h2>Material-Name</h2>
                <span>---</span>
              </>
            )}
          </li>
          <li
            onClick={handleOnClickPostprocessing}
            className={`flex flex-col w-full md:w-fit py-3 px-5 hover:bg-slate-200 hover:cursor-pointer ${
              postProcessings === undefined ? "bg-red-100" : ""
            }`}
          >
            {postProcessings !== undefined ? (
              <>
                <h2>Nachbearbeitungen</h2>
                {postProcessings.map((postProcessing, index) => (
                  <span key={index}>
                    {postProcessing.title} {postProcessing.value}
                  </span>
                ))}
              </>
            ) : (
              <>
                <h2>Nachbearbeitungen</h2>
                <span>---</span>
              </>
            )}
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default OrderItem;
