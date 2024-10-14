import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import { adminNodeTypes } from "@/api/Resources/Organization/Querys/useGetOrgaNodes";
import { useLocation, useParams } from "react-router-dom";
import logger from "@/hooks/useLogger";

interface AdminResourcesButtonsProps {}

const AdminResourcesButtons: React.FC<AdminResourcesButtonsProps> = () => {
  const { nodeType } = useParams();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  logger(
    "AdminResourcesButtons",
    nodeType,
    pathname,
    pathname.includes("graph")
  );

  return (
    <Container width="full">
      {adminNodeTypes.map((_nodeType, index) => (
        <Button
          key={index}
          title={t(`types.OntoNodeType.${_nodeType}`)}
          size="sm"
          variant={_nodeType === nodeType ? "primary" : "secondary"}
          to={
            nodeType === undefined && !pathname.includes("graph")
              ? `${_nodeType}`
              : `../${_nodeType}`
          }
        />
      ))}
      <Button
        title={t(`Admin.Resources.Buttons.graph`)}
        size="sm"
        variant={pathname.includes("graph") ? "primary" : "secondary"}
        to={
          nodeType === undefined && !pathname.includes("graph")
            ? `graph`
            : `../graph`
        }
      />
    </Container>
  );
};

export default AdminResourcesButtons;
