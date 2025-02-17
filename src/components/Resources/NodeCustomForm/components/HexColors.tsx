import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import {
  Control,
  Controller,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { NodeFormData } from "../../NodeForm";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import useGetRalColors from "@/api/Resources/Organization/Querys/useGetRalColors";
import { getContrastColor } from "@/services/utils";

interface NodeCustomFormHexColorsProps {
  control: Control<NodeFormData, any>;
  register: UseFormRegister<NodeFormData>;
  watch: UseFormWatch<NodeFormData>;
  setValue: UseFormSetValue<NodeFormData>;
}

const NodeCustomFormHexColors: React.FC<NodeCustomFormHexColorsProps> = (
  props
) => {
  const { control, register, watch, setValue } = props;
  const { t } = useTranslation();
  const ralColors = useGetRalColors(true);

  return (
    <Container width="full" direction="col" className="rounded-md border-2 p-2">
      <Container direction="row">
        <Text className="whitespace-nowrap">
          {t("components.Resources.NodeForm.ralColors")}
        </Text>
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-2"
          style={{
            background:
              watch("ralColor") !== undefined && watch("ralColor") !== "none"
                ? ralColors.data?.find(
                    (color) => color.RAL === watch("ralColor")
                  )?.Hex ?? "#FFFFFF"
                : "#FFFFFF",
          }}
        >
          {watch("ralColor") === "none" ? (
            <span className="text-4xl text-red-500">X</span>
          ) : null}
        </div>
        {ralColors.isLoading ? <LoadingAnimation /> : null}
        {ralColors.isFetched && ralColors.data !== undefined ? (
          <select
            className="w-full rounded-md border p-2"
            {...register("ralColor", {
              onChange: (_) => {
                setValue("hexColors", []);
              },
            })}
          >
            <option value="none" disabled>
              {t("components.Resources.NodeForm.noRalColor")}
            </option>
            {ralColors.data.map((color, index) => (
              <option
                key={index}
                value={color.RAL}
                style={{
                  background: color.Hex,
                  color: getContrastColor(color.Hex),
                }}
              >
                {`${color.RAL} ${color.RALName} (${color.Hex})`}
              </option>
            ))}
          </select>
        ) : null}
        {ralColors.isError ? (
          <Text className="text-red-500">
            {t("components.Resources.NodeForm.errorLoadingRalColors")}
          </Text>
        ) : null}
      </Container>
      <Container direction="row" width="full">
        <Divider />
        <Text className="whitespace-nowrap">
          {t("components.Resources.NodeForm.or")}
        </Text>
        <Divider />
      </Container>
      <Container width="full" direction="row">
        <Text>{t("components.Resources.NodeForm.hexColors")}</Text>
        <Controller
          name="hexColors"
          control={control}
          render={({ field: { onChange, value } }) => (
            <HexColorInput
              value={value}
              onChange={onChange}
              setValue={setValue}
            />
          )}
        />
      </Container>
    </Container>
  );
};

interface HexColorInputProps {
  value: string[] | undefined;
  onChange: (value: string[]) => void;
  setValue: UseFormSetValue<NodeFormData>;
}

const HexColorInput: React.FC<HexColorInputProps> = ({
  value = [],
  onChange,
  setValue,
}) => {
  const { t } = useTranslation();

  const addColor = () => {
    onChange([...value, "#000000"]);
    setValue("ralColor", "none");
  };

  const removeColor = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
    setValue("ralColor", "none");
  };

  const updateColor = (index: number, newColor: string) => {
    onChange(value.map((color, i) => (i === index ? newColor : color)));
    setValue("ralColor", "none");
  };

  return (
    <Container direction="row">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-2"
        style={{
          background:
            value.length === 0
              ? "#FFFFFF"
              : value.length === 1
              ? value[0]
              : `linear-gradient(to bottom, ${value.join(", ")})`,
        }}
      >
        {value.length === 0 ? (
          <span className="text-4xl text-red-500">X</span>
        ) : null}
      </div>
      <Container direction="col" className="gap-2 rounded-md border p-2">
        {value.map((color, index) => (
          <Container direction="row" key={index}>
            <input
              type="color"
              className="h-10 w-20 "
              value={color}
              onChange={(e) => updateColor(index, e.target.value)}
            />
            <input
              type="text"
              value={color}
              className="w-24 rounded-md border border-gray-300 p-2 text-center"
              onChange={(e) => updateColor(index, e.target.value)}
            />
            <Button
              title={t(`general.button.delete`)}
              size="xs"
              variant="text"
              onClick={() => removeColor(index)}
              children={<DeleteIcon />}
            />
          </Container>
        ))}

        <Button
          children={<AddIcon />}
          title={t(`general.button.add`)}
          variant="text"
          width="full"
          className="min-w-[240px]"
          size="xs"
          onClick={addColor}
        />
      </Container>
    </Container>
  );
};

export default NodeCustomFormHexColors;
