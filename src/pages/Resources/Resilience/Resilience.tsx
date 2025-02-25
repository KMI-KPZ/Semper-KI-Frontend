import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  LoadingAnimation,
  Text,
} from "@component-library/index";
import LaunchIcon from "@mui/icons-material/Launch";
import useGetResilienceScore from "@/api/Resources/Organization/Querys/useGetResilienceScore";
import useOrganization from "@/hooks/useOrganization";

interface ResourcesResilienceProps {}

const ResourcesResilience: React.FC<ResourcesResilienceProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organization } = useOrganization();

  const getResilienceScore = useGetResilienceScore();

  const url: string = `${process.env.VITE_RESILIENCE}/assessment?id=${organization.hashedID}`;

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Resilience.header")}</Heading>
      </Container>
      <Divider />
      <Container width="full" className="rounded-md border-2 p-3">
        <Text className="text-center">
          {t(`Resources.Resilience.describtion`)}
        </Text>
      </Container>

      {getResilienceScore.isLoading ? (
        <LoadingAnimation />
      ) : getResilienceScore.data !== undefined &&
        getResilienceScore.data.resilienceScore.length > 0 ? (
        <Container direction="col" className="rounded-md border-2 p-3">
          <Container direction="row" className="">
            <Text>{t("Resources.Resilience.level")}</Text>
            <Text>{getResilienceScore.data.resilienceScore.length}</Text>
            <Button
              title={t("Resources.Resilience.button.recalculate")}
              size="sm"
              variant="primary"
              endIcon={<LaunchIcon />}
              extern
              target="_blank"
              to={url}
            />
          </Container>
          <Divider />
          <Heading variant="h3">{t("Resources.Resilience.header2")}</Heading>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left">
                  {t("Resources.Resilience.assessmentBlockId")}
                </th>
                <th className="p-2 text-left">
                  {t("Resources.Resilience.value")}
                </th>
                <th className="p-2 text-left">
                  {t("Resources.Resilience.blocks")}
                </th>
                <th className="p-2 text-left">
                  {t("Resources.Resilience.blocksValue")}
                </th>
                <th className="p-2 text-left">
                  {t("Resources.Resilience.recommendations")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getResilienceScore.data.resilienceScore.map((item, index) => (
                <tr key={index}>
                  <td className="border-t-2 p-2 align-text-top">
                    {item.assessment_block_id}
                  </td>
                  <td className="border-t-2 p-2 align-text-top">
                    {item.value}
                  </td>
                  <td className="border-t-2 p-2 align-text-top">
                    <Container direction="col" items="start" className="gap-0">
                      {item.buildingBlocks.map((block, blockIndex) => (
                        <Container direction="row" key={blockIndex}>
                          <Text key={blockIndex}>{block.label}</Text>
                        </Container>
                      ))}
                    </Container>
                  </td>
                  <td className="border-t-2 p-2 align-text-top">
                    <Container
                      direction="col"
                      justify="start"
                      className="gap-0"
                    >
                      {item.buildingBlocks.map((block, blockIndex) => (
                        <Container direction="row" key={blockIndex}>
                          <Text key={blockIndex}>{block.value}</Text>
                        </Container>
                      ))}
                    </Container>
                  </td>
                  <td className="border-t-2 p-2 align-text-top">
                    <Container direction="col" className="gap-0" items="start">
                      {item.recommendations.map((recommendation, index) => (
                        <Text key={index}>{recommendation}</Text>
                      ))}
                    </Container>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      ) : (
        <Container direction="row" className="rounded-md border-2 p-3">
          <Text>{t("Resources.Resilience.level")}</Text>
          <Text>{t("Resources.Resilience.noLevel")}</Text>
          <Button
            title={t("Resources.Resilience.button.calculate")}
            size="sm"
            variant="primary"
            endIcon={<LaunchIcon />}
            extern
            target="_blank"
            to={url}
          />
        </Container>
      )}
    </Container>
  );
};

export default ResourcesResilience;
