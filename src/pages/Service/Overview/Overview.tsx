import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import ServiceOverviewItem from "./components/Item";
import { Heading } from "@component-library/Typography";
import { Button } from "@component-library/Button";
import { useProject } from "@/pages/Projects/hooks/useProject";
import useProcess, { ProcessProps } from "@/pages/Projects/hooks/useProcess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";

interface Props {}

const ServiceOverview: React.FC<Props> = (props) => {
  const {} = props;
  const [open, setOpen] = useState(true);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { projectQuery } = useContext(ProjectContext);
  const { createProcess } = useProcess();

  const addNewItem = () => {
    createProcess();
  };

  // const navigateToUpload = () => {
  //   selectProcess(-1);
  // };

  const selectItem = (index: number) => {
    // selectProcess(index);
  };

  return (
    <div className="flex h-fit w-full flex-col justify-start gap-5 bg-white p-5 md:w-fit md:min-w-fit md:max-w-sm">
      <div className="flex flex-col items-center justify-center gap-5 md:flex-row md:justify-between">
        <Heading variant="h2">{t("Service.Overview.Overview.title")}</Heading>
        <Button
          to=".."
          title={t("Service.Overview.Overview.button.overview")}
        />
      </div>
      <div className="flex w-full flex-col flex-wrap items-center justify-center gap-5">
        {open &&
        projectQuery.data !== undefined &&
        projectQuery.data.processes !== undefined &&
        projectQuery.data.processes.length > 0
          ? projectQuery.data.processes.map(
              (process: ProcessProps, index: number) => (
                <ServiceOverviewItem key={index} process={process} />
              )
            )
          : null}
        <Button
          variant="secondary"
          title={
            open
              ? t("Service.Overview.Overview.button.collapse")
              : t("Service.Overview.Overview.button.expand")
          }
          children={
            <ExpandMoreIcon
              className={`duration-300 ${open ? "rotate-180" : ""}`}
            />
          }
          onClick={() => setOpen(!open)}
          width="full"
        />
        <Button
          width="full"
          title={t("Service.Overview.Overview.button.new")}
          startIcon={<AddIcon />}
          onClick={addNewItem}
        />
      </div>
    </div>
  );
};

export default ServiceOverview;
