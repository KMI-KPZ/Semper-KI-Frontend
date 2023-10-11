import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import DownloadIcon from "@mui/icons-material/Download";
import { Heading } from "@component-library/Typography";
import useFileView from "../../hooks/useFileView";
import { Divider } from "@component-library/Divider";
import { ProcessProps } from "@/pages/Projects/hooks/useProcess";
import useProcessFile from "../../hooks/useProcessFile";

interface Props {
  process: ProcessProps;
  projectCollectionID: string;
}

const ProjectFile: React.FC<Props> = (props) => {
  const { process: project } = props;
  const { t } = useTranslation();
  const [fileName, setFileName] = useState<string>("");
  const { processFileQuery } = useProcessFile({
    processID: project.processID,
    fileName,
  });
  useFileView(fileName, processFileQuery, setFileName);

  const handleOnClickButton = (fileName: string) => {
    setFileName(fileName);
  };

  const buttonQuery = fileName !== "" ? processFileQuery : undefined;

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex w-full items-center gap-3">
        <Heading variant="h3">{t("Projects.ProjectFileView.header")}:</Heading>
        <Divider className="mt-[0.3rem]" />
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row">
        {project.files.length > 0
          ? project.files.map((_fileName, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-slate-100 p-2"
              >
                <span className="p-2">{_fileName}</span>
                <Button
                  onClick={() => handleOnClickButton(_fileName)}
                  startIcon={<DownloadIcon />}
                  loading={buttonQuery?.isLoading}
                  title={t("Projects.ProjectFileView.button.download")}
                />
              </div>
            ))
          : t("Projects.ProjectFileView.empty")}
      </div>
    </div>
  );
};

export default ProjectFile;
