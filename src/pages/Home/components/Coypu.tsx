import logger from "@/hooks/useLogger";
import { Button } from "@component-library/Button";
import Container from "@component-library/Container";
import { Heading, Text } from "@component-library/Typography";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import useCoypuQuerys from "@/api/Coypu/useCoypuQuerys";

interface CoypuProps {}

const Coypu: React.FC<CoypuProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { coypuQuery } = useCoypuQuerys();
  const [expanded, setExpanded] = useState<boolean>(false);

  const getCoypu = () => {};

  return (
    <Container direction="col" width="full">
      <Container className="bg-white p-5" gap={3} direction="col" width="full">
        <Heading variant="h2">{t("Home.components.Coypu.title")}</Heading>
        <Heading variant="h3">{t("Home.components.Coypu.title2")}</Heading>
      </Container>
      {coypuQuery.data !== undefined && coypuQuery.data.length > 0 ? (
        <ul className="flex h-fit w-full flex-row flex-wrap items-start justify-center gap-5">
          {coypuQuery.data
            .slice(0, expanded === false ? 9 : undefined)
            .map((coypu, index) => (
              <li
                className="flex grow basis-96 flex-col justify-between gap-5 bg-white p-3 shadow-md"
                key={index}
              >
                <Text variant="body">{coypu.date.toLocaleDateString()}</Text>
                <Text variant="body">{coypu.rawhtml}</Text>
                <Container justify="end" width="full">
                  <Button
                    target="_blank"
                    className="gap-2"
                    endIcon={<OpenInNewIcon />}
                    size="xs"
                    variant="secondary"
                    extern
                    to={coypu.url}
                    title={t(`Home.components.Coypu.button.link`)}
                  />
                </Container>
              </li>
            ))}
        </ul>
      ) : null}
      <Button
        className="w-full"
        variant="primary"
        startIcon={expanded === false ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        onClick={() => setExpanded(!expanded)}
        title={t(`Home.components.Coypu.button.${expanded ? "less" : "more"}`)}
      />
    </Container>
  );
};

export default Coypu;
