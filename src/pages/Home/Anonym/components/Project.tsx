import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import React from "react";
import { useTranslation } from "react-i18next";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import HomeContainer from "../../components/Container";
import { useFlatProjects } from "@/pages/Projects/hooks/useFlatProjects";
import AddIcon from "@mui/icons-material/Add";
import { useProject } from "@/pages/Projects/hooks/useProject";

interface HomeAnonymProjectProps {}

const HomeAnonymProject: React.FC<HomeAnonymProjectProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { flatProjectsQuery } = useFlatProjects();
  const { createProject } = useProject();
  const handleOnClickButtonNew = () => {
    createProject.mutate();
  };

  return (
    <HomeContainer data-testid="home-anonym-project">
      <div className="flex w-full max-w-4xl flex-col items-center gap-5 md:flex-row md:justify-between md:gap-40">
        <div className="flex w-full flex-col items-start justify-center gap-5">
          <Heading variant="h2" className="text-7xl">
            {t("Home.Home.Anonym.Project.title")}
          </Heading>
          <Heading variant="subtitle" className="pl-5">
            {t("Home.Home.Anonym.Project.subTitle")}
          </Heading>
        </div>
        <div className="flex w-fit flex-col items-end gap-5">
          {flatProjectsQuery.data !== undefined &&
          flatProjectsQuery.data.length > 0 ? (
            <>
              <Button
                title={t("Home.Home.Anonym.Project.button.continue")}
                to="/projects"
                startIcon={<PlayArrowIcon fontSize="large" />}
              />
              <Button
                title={t("Home.Home.Anonym.Project.button.new")}
                onClick={handleOnClickButtonNew}
                startIcon={<AddIcon fontSize="large" />}
              />
            </>
          ) : (
            <Button
              onClick={handleOnClickButtonNew}
              title={t("Home.Home.Anonym.Project.button.demo")}
              startIcon={<PlayArrowIcon fontSize="large" />}
            />
          )}
        </div>
      </div>
    </HomeContainer>
  );
};

export default HomeAnonymProject;
