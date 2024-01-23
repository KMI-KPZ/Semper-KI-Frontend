import { useManufacturingModelDetailsQuerys } from "@/api/Service/Manufacturing/useManufacturingQuerys";
import useGeneralProcess from "@/pages/Projects/hooks/useGeneralProcess";
import {
  FilesDescriptionProps,
  ManufactoringProcessProps,
  ProcessProps,
} from "@/pages/Projects/hooks/useProcess";
import ModelPreview from "@/pages/Test/STLViewer";
import {
  Container,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";

interface ModelDetailsProps {
  process: ManufactoringProcessProps;
}

const ModelDetails: React.FC<ModelDetailsProps> = (props) => {
  const { process } = props;
  const { t } = useTranslation();
  const { downloadFile } = useGeneralProcess();
  const { modelDetailsQuery } = useManufacturingModelDetailsQuerys(
    process.processID
  );
  const [fileUrl, setFileUrl] = React.useState<string>("");

  useEffect(() => {
    if (
      process.serviceDetails.model !== undefined &&
      process.files.length > 0 &&
      process.files.find(
        (file) =>
          process.serviceDetails.model !== undefined &&
          file.id === process.serviceDetails.model.id
      ) !== undefined
    ) {
      downloadFile(
        {
          processID: process.processID,
          fileID: process.serviceDetails.model.id,
        },
        {
          onSuccess(data) {
            const url = window.URL.createObjectURL(data);
            setFileUrl(url);
          },
        }
      );
    }
  }, [process]);

  return (
    <Container direction="col" width="full">
      {fileUrl !== "" ? (
        <ModelPreview className="h-[300px] w-[500px]" file={fileUrl} />
      ) : (
        <LoadingAnimation />
      )}
      {modelDetailsQuery.isFetched && modelDetailsQuery.data !== undefined ? (
        <Container direction="col">
          <Heading variant="h1">
            {t(
              "Projects.Project.Process.ServicePreview.components.ModelDetails.title"
            )}
          </Heading>
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Projects.Project.Process.ServicePreview.components.ModelDetails.filename"
              )}
            </Text>
            <Text>{modelDetailsQuery.data.filename}</Text>
          </Container>
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Projects.Project.Process.ServicePreview.components.ModelDetails.filename"
              )}
            </Text>
            <Text>{modelDetailsQuery.data.filename}</Text>
          </Container>
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Projects.Project.Process.ServicePreview.components.ModelDetails.volume"
              )}
            </Text>
            <Text>{modelDetailsQuery.data.measurements.volume}</Text>
          </Container>
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Projects.Project.Process.ServicePreview.components.ModelDetails.surfaceArea"
              )}
            </Text>
            <Text>{modelDetailsQuery.data.measurements.surfaceArea}</Text>
          </Container>
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Projects.Project.Process.ServicePreview.components.ModelDetails.mbbDimensions"
              )}
            </Text>
            <Text>{`${modelDetailsQuery.data.measurements.mbbDimensions._1}x${modelDetailsQuery.data.measurements.mbbDimensions._2}x${modelDetailsQuery.data.measurements.mbbDimensions._3}`}</Text>
          </Container>
          <Container direction="row" justify="between" width="full">
            <Text>
              {t(
                "Projects.Project.Process.ServicePreview.components.ModelDetails.mbbVolume"
              )}
            </Text>
            <Text>{modelDetailsQuery.data.measurements.mbbVolume}</Text>
          </Container>
        </Container>
      ) : null}
    </Container>
  );
};

export default ModelDetails;
