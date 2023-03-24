import React from "react";
import { IProcessItem } from "../../interface/Interface";

interface Props {
  process: IProcessItem;
}

const ShoppingCartItem: React.FC<Props> = (props) => {
  const { process } = props;
  const { model, material, postProcessings } = process;
  return (
    <ul className="flex flex-col bg-white md:gap-4 md:flex-row w-full md:flex-wrap justify-between">
      <li className="flex flex-col w-full md:max-w-[250px]">
        <img
          className="h-30 md:h-full max-h-[250px] w-full object-cover"
          src={
            model === undefined
              ? require("../../assets/images/model_placeholder.png")
              : model.URI
          }
          alt="Model"
        />
      </li>
      <li className="flex flex-col w-4/5 p-2">
        <ul className="flex flex-col bg-white md:gap-4 md:flex-row w-full md:h-full md:flex-wrap md:justify-around justify-center">
          <li className="flex flex-col w-full md:w-fit p-2">
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
          <li className="flex flex-col w-full md:w-fit p-2">
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
          <li className="flex flex-col w-full md:w-fit p-2">
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

export default ShoppingCartItem;
