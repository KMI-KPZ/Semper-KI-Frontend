import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Text } from "@component-library/index";
import { OntoNode } from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import useDeleteOrgaNode from "@/api/Resources/Organization/Mutations/useDeleteOrgaNode";
import useUpdateOrgaNode from "@/api/Resources/Organization/Mutations/useUpdateOrgaNode";
import useGetRalColors from "@/api/Resources/Organization/Querys/useGetRalColors";

interface ResourceTableRowProps {
  index: number;
  node: OntoNode;
}

const ResourceTableRow: React.FC<ResourceTableRowProps> = (props) => {
  const { index, node } = props;
  const { t } = useTranslation();
  const updateOrgaNode = useUpdateOrgaNode();
  const deleteOrgaNode = useDeleteOrgaNode();
  const ralColors = useGetRalColors(node.nodeType === "color");

  const handleOnClickButtonDeleteNode = (node: OntoNode) => {
    if (node.nodeID === undefined) return;
    if (
      window.confirm(
        t("Resources.components.Table.confirmDelete", {
          name: node.name,
        })
      )
    ) {
      deleteOrgaNode.mutate({
        nodeID: node.nodeID,
      });
    }
  };

  const handleOnChangeInputActive = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: OntoNode
  ) => {
    if (item.nodeID === undefined) return;
    updateOrgaNode.mutate({
      nodeID: item.nodeID,
      active: e.target.checked,
    });
  };

  return (
    <tr key={index}>
      <td
        className={`border-t-2 p-3 text-center ${
          index % 2 === 1 ? "bg-gray-50" : "bg-white"
        }`}
      >
        {node.nodeType === "color" ? (
          <Container width="full">
            <Text>{node.name}</Text>
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md border-2"
              style={{
                background:
                  node.properties.find(
                    (property) => property.key === "colorHEX"
                  ) !== undefined
                    ? `linear-gradient(to bottom, ${
                        node.properties.find(
                          (property) => property.key === "colorHEX"
                        )?.value
                      })`
                    : node.properties.find(
                        (property) => property.key === "colorRAL"
                      ) !== undefined
                    ? ralColors.data?.find(
                        (color) =>
                          color.RAL ===
                          node.properties.find(
                            (property) => property.key === "colorRAL"
                          )?.value
                      )?.Hex
                    : "#FFFFFF",
              }}
            >
              {node.properties.find(
                (property) => property.key === "colorHEX"
              ) === undefined &&
              node.properties.find(
                (property) => property.key === "colorRAL"
              ) === undefined ? (
                <span className="text-4xl text-red-500">X</span>
              ) : null}
            </div>
          </Container>
        ) : (
          node.name
        )}
      </td>
      <td
        className={`border-t-2 p-3 text-center ${
          index % 2 === 1 ? "bg-gray-50" : "bg-white"
        }`}
      >
        <input
          type="checkbox"
          className="h-6 w-6"
          checked={node.active}
          onChange={(e) => handleOnChangeInputActive(e, node)}
        />
      </td>
      <td
        className={`border-t-2 p-3 text-center ${
          index % 2 === 1 ? "bg-gray-50" : "bg-white"
        }`}
      >
        <Container width="full" direction="row">
          <Button
            variant="text"
            title={t("general.button.details")}
            to={`${node.nodeID}`}
            className="whitespace-nowrap"
          />
          <Button
            variant="text"
            title={t("general.button.edit")}
            to={`${node.nodeID}/edit`}
            className="whitespace-nowrap"
          />
          <Button
            variant="text"
            title={t("general.button.delete")}
            onClick={() => handleOnClickButtonDeleteNode(node)}
            className="whitespace-nowrap"
          />
        </Container>
      </td>
    </tr>
  );
};

export default ResourceTableRow;
