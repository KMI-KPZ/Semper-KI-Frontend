import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container } from "@component-library/index";
import { MaterialProps } from "../Material";
import { Heading } from "@component-library/index";
import useProcess from "@/pages/Projects/hooks/useProcess";
import { isProcessAtServiceStatus } from "@/pages/Projects/hooks/useGeneralProcess";
import { useNavigate } from "react-router-dom";

interface Props {
  material: MaterialProps;
}

export const ProcessMaterialItem: React.FC<Props> = (props) => {
  const { material } = props;
  const { t } = useTranslation();
  const { process, updateProcess } = useProcess();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleOnClickButtonDeselect = () => {
    updateProcess({ deletions: { serviceDetails: ["material"] } });
    setLoading(true);
  };

  const handleOnClickButtonModel = () => {
    navigate("../model");
  };

  const handleOnClickButtonPostProcessing = () => {
    navigate("../postprocessing");
  };

  return (
    <div className="flex h-fit w-full flex-col items-center justify-start gap-5 bg-white p-5">
      <Heading variant="h2">{material.title}</Heading>
      <img className="w-full max-w-xs" src={material.URI} alt="Model" />
      <div className="model-view-tags">
        {material.propList.map((title: string, index: number) => (
          <div key={index} className="model-view-tag">
            {title}
          </div>
        ))}
      </div>

      <Container>
        <Button
          variant="primary"
          onClick={handleOnClickButtonModel}
          title={t(
            "Service.Manufacturing.Material.components.Item.button.model"
          )}
        />
        <Button
          loading={loading}
          onClick={handleOnClickButtonDeselect}
          title={t(
            "Service.Manufacturing.Material.components.Item.button.change"
          )}
        />
        <Button
          variant="primary"
          onClick={handleOnClickButtonPostProcessing}
          title={t(
            "Service.Manufacturing.Material.components.Item.button.postprocessing"
          )}
        />
      </Container>
    </div>
  );
};
