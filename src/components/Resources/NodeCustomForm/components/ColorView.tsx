import React from "react";
import { Container } from "@component-library/index";
import { OntoNode } from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import CheckIcon from "@mui/icons-material/Check";
import useGetRalColors from "@/api/Resources/Organization/Querys/useGetRalColors";

interface ColorViewProps {
  colorNode: OntoNode;
  size?: "small" | "medium" | "large";
  button?: boolean;
  colorIsSelected?: boolean;
  handleOnClickButtonColor?: (colorNode: OntoNode) => void;
}

const ColorView: React.FC<ColorViewProps> = (props) => {
  const {
    colorNode,
    size = "medium",
    button = false,
    colorIsSelected = false,
    handleOnClickButtonColor = () => {},
  } = props;
  const ralColors = useGetRalColors(true);

  return (
    <div
      tabIndex={0}
      className={`flex shrink-0 items-center justify-center rounded-md border-2 duration-300
        ${
          size === "small"
            ? "h-12 w-8"
            : size === "medium"
            ? "h-10 w-10"
            : "h-14 w-14"
        }
      ${button ? "hover:cursor-pointer hover:border-2 hover:border-black" : ""} 
      ${colorIsSelected ? "border-2 border-black" : ""}`}
      onClick={() => handleOnClickButtonColor(colorNode)}
      style={{
        background:
          colorNode.properties.find(
            (property) => property.key === "colorHEX"
          ) !== undefined
            ? `linear-gradient(to bottom, ${
                colorNode.properties.find(
                  (property) => property.key === "colorHEX"
                )?.value
              })`
            : colorNode.properties.find(
                (property) => property.key === "colorRAL"
              ) !== undefined
            ? ralColors.data?.find(
                (color) =>
                  color.RAL ===
                  colorNode.properties.find(
                    (property) => property.key === "colorRAL"
                  )?.value
              )?.Hex
            : "#FFFFFF",
      }}
    >
      {colorIsSelected ? (
        <Container className="rounded-full border-2 border-black bg-white">
          <CheckIcon />
        </Container>
      ) : null}
    </div>
  );
};

export default ColorView;
