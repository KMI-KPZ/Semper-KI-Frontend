import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { IProcessItem } from "../../../interface/Interface";
import { getModelURI } from "../../../services/utils";
import { AppContext } from "../../App/App";
import Button from "../../General/Button";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";

interface Props {
  process: IProcessItem;
  index: number;
  deleteItem(index: number): void;
}

const CartItem: React.FC<Props> = (props) => {
  const { setAppState } = useContext(AppContext);
  const { process, index, deleteItem } = props;
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
  const handleOnClickEdit = () => {
    navigate("/process/model");
    selectProgressItem("model");
  };
  const handleOnClickDelete = () => {
    if (window.confirm("Item wirklich löschen?")) {
      deleteItem(index);
    }
  };

  return (
    <ul className="flex flex-col bg-white md:gap-4 md:flex-row w-full md:flex-wrap justify-between">
      <li className="flex flex-col w-full md:max-w-[250px]">
        <img
          className="h-30 md:h-full max-h-[250px] w-full object-cover"
          src={
            model === undefined
              ? require("../../../assets/images/model_placeholder.png")
              : getModelURI(model)
          }
          alt="Model"
        />
      </li>
      <li className="flex flex-col w-full md:w-4/5 p-5">
        <ul className="flex flex-col bg-white gap-2 md:flex-row w-full md:h-full md:flex-wrap md:justify-around justify-center">
          <li
            onClick={handleOnClickModel}
            className="flex flex-col w-full md:w-fit py-2 px-4 
            hover:cursor-pointer hover:bg-slate-50 hover:shadow-inner 
            shadow-md transition-all ease-in-out duration-300 "
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
                <h2>
                  Model{" "}
                  {model === undefined ? <ErrorIcon color="error" /> : null}
                </h2>
                <span>---</span>
              </>
            )}
          </li>
          <li
            onClick={handleOnClickMaterial}
            className="flex flex-col w-full md:w-fit py-2 px-4 
            hover:cursor-pointer hover:bg-slate-50 hover:shadow-inner 
            shadow-md transition-all ease-in-out duration-300 "
          >
            {material !== undefined ? (
              <>
                <h2>{material.title}</h2>
                <span>{material.propList.join(", ")}</span>
              </>
            ) : (
              <>
                <h2>
                  Material{" "}
                  {material === undefined ? <ErrorIcon color="error" /> : null}
                </h2>
                <span>---</span>
              </>
            )}
          </li>
          <li
            onClick={handleOnClickPostprocessing}
            className="flex flex-col w-full md:w-fit py-2 px-4 
            hover:cursor-pointer hover:bg-slate-50 hover:shadow-inner 
            shadow-md transition-all ease-in-out duration-300 "
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
                <h2>
                  Nachbearbeitungen{" "}
                  {postProcessings === undefined ? (
                    <ErrorIcon color="error" />
                  ) : null}
                </h2>
                <span>---</span>
              </>
            )}
          </li>
          <li className="flex flex-col items-center justify-end w-full md:w-fit py-3 px-5 gap-5">
            <div className="flex flex-row gap-3 justify-center items-center">
              <Button onClick={handleOnClickEdit} icon={<EditIcon />} />
              <Button onClick={handleOnClickDelete} icon={<DeleteIcon />} />
            </div>
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default CartItem;
