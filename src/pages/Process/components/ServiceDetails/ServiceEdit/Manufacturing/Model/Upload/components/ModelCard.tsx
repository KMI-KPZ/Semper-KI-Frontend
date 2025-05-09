import ModelPreview from "@/pages/Test/STLViewer";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ManufacturingModelUploadData,
  ProcessModelUploadFormProps,
} from "../Upload";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  ModelLevelOfDetail,
  ProcessModel,
} from "@/api/Process/Querys/useGetProcess";
import { getFileSizeAsString } from "@/services/utils";

interface UploadModelCardProps {
  model: FieldArrayWithId<ProcessModelUploadFormProps, "models", "id">;
  index: number;
  register: UseFormRegister<ProcessModelUploadFormProps>;
  deleteModel: (index: number) => void;
  saveForAll: (index: number, key: keyof ManufacturingModelUploadData) => void;
  errors: FieldErrors<ProcessModelUploadFormProps>;
  existingModel?: ProcessModel;
  watch: UseFormWatch<ProcessModelUploadFormProps>;
}

const UploadModelCard: React.FC<UploadModelCardProps> = (props) => {
  const {
    index,
    model,
    register,
    deleteModel,
    saveForAll,
    errors,
    existingModel,
    watch,
  } = props;
  const { t } = useTranslation();
  const url =
    model.file !== undefined ? URL.createObjectURL(model.file) : undefined;

  const handleOnClickButtonDelete = () => {
    deleteModel(index);
  };

  const handleOnClickButtonSaveAll = (
    key: keyof ManufacturingModelUploadData
  ) => {
    saveForAll(index, key);
  };

  const modelErrors =
    errors.models === undefined ? undefined : errors.models[index];

  return (
    <Container
      className="w-fit min-w-[350px] max-w-[50%] gap-0 rounded-md border-2 bg-white"
      direction="col"
    >
      {url !== undefined ? (
        <ModelPreview
          file={url}
          className="h-40 w-fit rounded-b-none border-0"
          modelName={model.file ? model.file.name : existingModel?.fileName}
        />
      ) : null}
      {existingModel !== undefined ? (
        <img
          src={existingModel.imgPath}
          className="object-containe w-ful h-40 "
        />
      ) : null}
      <Divider />
      <Container direction="col" className="p-5">
        <Container width="full" className="relative">
          <Heading variant="h3">
            {existingModel !== undefined ? existingModel.fileName : null}
            {model.file !== undefined ? model.file.name : null}
          </Heading>
          <Button
            children={<DeleteIcon fontSize="medium" />}
            className="absolute right-0 top-0"
            variant="text"
            title={t("general.button.delete")}
            onClick={handleOnClickButtonDelete}
          />
        </Container>
        <table className="w-full table-auto border-separate border-spacing-x-5 border-spacing-y-2">
          <tbody>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.size`
              )}`}</th>
              <td>
                {existingModel !== undefined ? "xxx" : null}
                {model.file !== undefined
                  ? getFileSizeAsString(model.file.size)
                  : null}
              </td>
              <td></td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.date`
              )}`}</th>
              <td>{new Date().toLocaleDateString()}</td>
              <td></td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.certificate`
              )}`}</th>
              <td>
                <input
                  className={`flex w-full rounded-md border-2 p-2
            ${modelErrors?.certificates ? "border-red-500 bg-red-500" : ""}
          }`}
                  placeholder={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.certificatePH"
                  )}
                  {...register(`models.${index}.certificates`)}
                />
              </td>
              <td>
                <Button
                  variant="tertiary"
                  size="xs"
                  onClick={() => handleOnClickButtonSaveAll("certificates")}
                  title={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.button.saveAll"
                  )}
                  children={<ContentCopyIcon />}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.license`
              )}`}</th>
              <td>
                <select
                  {...register(`models.${index}.licenses`)}
                  className={`flex w-full rounded-md border-2 p-2 ${
                    modelErrors?.licenses ? "border-red-500 " : ""
                  }`}
                >
                  <option value="">
                    {t(
                      `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.noLicense`
                    )}
                  </option>
                  <option value="CC BY">CC BY</option>
                  <option value="CC BY-NC">CC BY-NC</option>
                  <option value="CC BY-ND">CC BY-ND</option>
                  <option value="CC BY-SA">CC BY-SA</option>
                  <option value="CC BY-NC-ND">CC BY-NC-ND</option>
                  <option value="CC BY-NC-SA">CC BY-NC-SA</option>
                </select>
              </td>
              <td>
                <Button
                  variant="tertiary"
                  size="xs"
                  onClick={() => handleOnClickButtonSaveAll("licenses")}
                  title={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.button.saveAll"
                  )}
                  children={<ContentCopyIcon />}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left ">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.tags`
              )}`}</th>
              <td>
                <input
                  className={`flex w-full rounded-md border-2 p-2
            ${modelErrors?.tags ? "border-red-500 bg-red-500" : ""}}`}
                  placeholder={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.tagsPH"
                  )}
                  {...register(`models.${index}.tags`)}
                />
              </td>
              <td>
                <Button
                  variant="tertiary"
                  size="xs"
                  onClick={() => handleOnClickButtonSaveAll("tags")}
                  title={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.button.saveAll"
                  )}
                  children={<ContentCopyIcon />}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.quantity`
              )}`}</th>
              <td>
                <input
                  type="number"
                  className={`flex w-full rounded-md border-2 p-2 text-center
            ${modelErrors?.quantity ? "border-red-500 bg-red-500" : ""}}`}
                  {...register(`models.${index}.quantity`, {
                    valueAsNumber: true,
                  })}
                />
              </td>
              <td>
                <Button
                  variant="tertiary"
                  size="xs"
                  onClick={() => handleOnClickButtonSaveAll("quantity")}
                  title={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.button.saveAll"
                  )}
                  children={<ContentCopyIcon />}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.levelOfDetail`
              )}`}</th>
              <td>
                <select
                  {...register(`models.${index}.levelOfDetail`, {
                    valueAsNumber: true,
                  })}
                  className={`flex w-full rounded-md border-2 p-2 ${
                    modelErrors?.levelOfDetail ? "border-red-500 " : ""
                  }`}
                >
                  <option value="" disabled>
                    {t(
                      `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.selectLevelOfDetail`
                    )}
                  </option>
                  <option value={ModelLevelOfDetail.LOW}>
                    {t(`enum.ModelLevelOfDetail.LOW`)}
                  </option>
                  <option value={ModelLevelOfDetail.MEDIUM}>
                    {t(`enum.ModelLevelOfDetail.MEDIUM`)}
                  </option>
                  <option value={ModelLevelOfDetail.HIGH}>
                    {t(`enum.ModelLevelOfDetail.HIGH`)}
                  </option>
                </select>
              </td>

              <td>
                <Button
                  variant="tertiary"
                  size="xs"
                  onClick={() => handleOnClickButtonSaveAll("levelOfDetail")}
                  title={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.button.saveAll"
                  )}
                  children={<ContentCopyIcon />}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left">{`${t(
                `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.scalingFactor`
              )}`}</th>
              <td>
                <Container direction="row">
                  <input
                    className={`flex w-full rounded-md border-2 p-2 text-center
                    ${
                      modelErrors?.scalingFactor
                        ? "border-red-500 bg-red-500"
                        : ""
                    }
                    }`}
                    type="number"
                    {...register(`models.${index}.scalingFactor`, {
                      valueAsNumber: true,
                    })}
                  />
                  <Text>%</Text>
                </Container>
              </td>
              <td>
                <Button
                  variant="tertiary"
                  size="xs"
                  onClick={() => handleOnClickButtonSaveAll("scalingFactor")}
                  title={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.button.saveAll"
                  )}
                  children={<ContentCopyIcon />}
                />
              </td>
            </tr>
            <tr>
              <th className="text-left">
                {`${t(
                  `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.fem`
                )}`}
              </th>
              <td>
                <Container direction="row">
                  <input
                    id={index + "femRequested"}
                    className={`h-4 w-4 hover:cursor-pointer
                    ${
                      modelErrors?.femRequested
                        ? "border-red-500 bg-red-500"
                        : ""
                    }
                    }`}
                    type="checkbox"
                    {...register(`models.${index}.femRequested`)}
                  />
                  <label
                    htmlFor={index + "femRequested"}
                    className="hover:cursor-pointer"
                  >
                    {t(
                      `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.femLabel`
                    )}
                  </label>
                </Container>
              </td>
              <td>
                <Button
                  variant="tertiary"
                  size="xs"
                  onClick={() => handleOnClickButtonSaveAll("femRequested")}
                  title={t(
                    "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.button.saveAll"
                  )}
                  children={<ContentCopyIcon />}
                />
              </td>
            </tr>
            <tr>
              <td colSpan={3}>
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.femHint"
                )}
              </td>
            </tr>
            {watch(`models.${index}.femRequested`) ? (
              <>
                <tr>
                  <th className="text-left align-text-top">{`${t(
                    `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.fem_testType`
                  )}`}</th>
                  <td>
                    <Container direction="col" items="start" className="gap-2">
                      <Container direction="row">
                        <input
                          id={index + "fem_testType_elongation"}
                          className={`h-4 w-4 hover:cursor-pointer
                          ${
                            modelErrors?.testType
                              ? "border-red-500 bg-red-500"
                              : ""
                          }
                    }`}
                          type="radio"
                          value={"elongation"}
                          {...register(`models.${index}.testType`)}
                        />
                        <label
                          htmlFor={index + "fem_testType_elongation"}
                          className="hover:cursor-pointer"
                        >
                          {t(
                            `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.elongation`
                          )}
                        </label>
                      </Container>
                      <Container direction="row">
                        <input
                          id={index + "fem_testType_compression"}
                          className={`h-4 w-4 hover:cursor-pointer
                    ${modelErrors?.testType ? "border-red-500 bg-red-500" : ""}
                    }`}
                          type="radio"
                          value={"compression"}
                          {...register(`models.${index}.testType`)}
                        />
                        <label
                          htmlFor={index + "fem_testType_compression"}
                          className="hover:cursor-pointer"
                        >
                          {t(
                            `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.compression`
                          )}
                        </label>
                      </Container>
                    </Container>
                  </td>
                  <td>
                    <Button
                      variant="tertiary"
                      size="xs"
                      onClick={() => handleOnClickButtonSaveAll("testType")}
                      title={t(
                        "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.button.saveAll"
                      )}
                      children={<ContentCopyIcon />}
                    />
                  </td>
                </tr>
                <tr>
                  <th className="text-left">{`${t(
                    `Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.fem_pressure`
                  )}`}</th>
                  <td>
                    <Container direction="row">
                      <input
                        className={`flex w-full rounded-md border-2 p-2 text-center
                    ${modelErrors?.pressure ? "border-red-500 bg-red-500" : ""}
                    }`}
                        type="number"
                        {...register(`models.${index}.pressure`, {
                          valueAsNumber: true,
                        })}
                      />
                      <Text>MPa</Text>
                    </Container>
                  </td>
                  <td>
                    <Button
                      variant="tertiary"
                      size="xs"
                      onClick={() => handleOnClickButtonSaveAll("pressure")}
                      title={t(
                        "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.button.saveAll"
                      )}
                      children={<ContentCopyIcon />}
                    />
                  </td>
                </tr>
              </>
            ) : null}
            <tr>
              <td colSpan={3} className="pt-2 ">
                {t(
                  "Process.components.Service.ServiceEdit.Manufacturing.Model.Upload.components.Card.mandatory"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </Container>
    </Container>
  );
};

export default UploadModelCard;
