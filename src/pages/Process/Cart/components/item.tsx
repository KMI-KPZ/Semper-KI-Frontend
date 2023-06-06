import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ErrorIcon from "@mui/icons-material/Error";
import { useTranslation } from "react-i18next";
import ModelPlaceholderUrl from "@images/model_placeholder.png";
import { Button } from "@component-library/Button";
import { AppContext } from "@/pages/App";
import { getModelURI } from "@/services/utils";
import { IProcessItem } from "../..";
import { Heading } from "@component-library/Typography";

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
  const { t } = useTranslation();

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
    <ul className="flex w-full flex-col justify-between bg-white md:flex-row md:flex-wrap md:gap-4">
      <li className="flex w-full flex-col md:max-w-[250px]">
        <img
          className="h-30 max-h-[250px] w-full object-cover md:h-full"
          src={model === undefined ? ModelPlaceholderUrl : getModelURI(model)}
          alt="Model"
        />
      </li>
      <li className="flex w-full flex-col p-5 md:w-4/5">
        <ul className="flex w-full flex-col justify-center gap-2 bg-white md:h-full md:flex-row md:flex-wrap md:justify-around">
          <li
            onClick={handleOnClickModel}
            className="flex w-full flex-col px-4 py-2 shadow-md 
            transition-all duration-300 ease-in-out 
            hover:cursor-pointer hover:bg-slate-50 hover:shadow-inner md:w-fit "
          >
            {model !== undefined ? (
              <>
                <Heading variant="h2">{model.title}</Heading>
                <span>{model.tags}</span>
                <span>{model.certificate}</span>
                <span>{model.license}</span>
                <span>{model.date}</span>
              </>
            ) : (
              <>
                <Heading variant="h2">
                  {t("AfterProcess.Cart.CartItem.model")}{" "}
                  {model === undefined ? <ErrorIcon color="error" /> : null}
                </Heading>
                <span>---</span>
              </>
            )}
          </li>
          <li
            onClick={handleOnClickMaterial}
            className="flex w-full flex-col px-4 py-2 shadow-md 
            transition-all duration-300 ease-in-out 
            hover:cursor-pointer hover:bg-slate-50 hover:shadow-inner md:w-fit "
          >
            {material !== undefined ? (
              <>
                <Heading variant="h2">{material.title}</Heading>
                <span>{material.propList.join(", ")}</span>
              </>
            ) : (
              <>
                <Heading variant="h2">
                  {t("AfterProcess.Cart.CartItem.material")}{" "}
                  {material === undefined ? <ErrorIcon color="error" /> : null}
                </Heading>
                <span>---</span>
              </>
            )}
          </li>
          <li
            onClick={handleOnClickPostprocessing}
            className="flex w-full flex-col px-4 py-2 shadow-md 
            transition-all duration-300 ease-in-out 
            hover:cursor-pointer hover:bg-slate-50 hover:shadow-inner md:w-fit "
          >
            {postProcessings !== undefined ? (
              <>
                <Heading variant="h2">
                  {t("AfterProcess.Cart.CartItem.postProcessing", {
                    count: postProcessings.length,
                  })}
                </Heading>
                {postProcessings.map((postProcessing, index) => (
                  <span key={index}>
                    {postProcessing.title} {postProcessing.value}
                  </span>
                ))}
              </>
            ) : (
              <>
                <Heading variant="h2">
                  {t("AfterProcess.Cart.CartItem.postProcessing", { count: 2 })}{" "}
                  {postProcessings === undefined ? (
                    <ErrorIcon color="error" />
                  ) : null}
                </Heading>
                <span>---</span>
              </>
            )}
          </li>
          <li className="flex w-full flex-col items-center justify-end gap-5 px-5 py-3 md:w-fit">
            <div className="flex flex-row items-center justify-center gap-3">
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
