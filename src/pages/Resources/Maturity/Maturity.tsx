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
import useGetMaturityLevel from "@/api/Resources/Organization/Querys/useGetMaturityLevel";
import useOrganization from "@/hooks/useOrganization";

interface ResourcesMaturityProps {}

const ResourcesMaturity: React.FC<ResourcesMaturityProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const getMaturityLevel = useGetMaturityLevel();
  const { organization } = useOrganization();

  const url: string = `${process.env.VITE_MATURITY}/assessment?id=${organization.hashedID}`;

  return (
    <Container direction="col" width="full" justify="start">
      <Container width="full" direction="row">
        <Heading variant="h2">{t("Resources.Maturity.header")}</Heading>
      </Container>
      <Divider />
      <Container width="full" className="rounded-md border-2 p-3">
        <Text className="text-center">
          {t(`Resources.Maturity.describtion`)}
        </Text>
      </Container>

      {getMaturityLevel.isLoading ? (
        <LoadingAnimation />
      ) : getMaturityLevel.data !== undefined &&
        getMaturityLevel.data.maturityLevel.length > 0 ? (
        <Container direction="col" className="rounded-md border-2 p-3">
          <Container direction="row" className="">
            <Text>{t("Resources.Maturity.level")}</Text>
            <Text>{getMaturityLevel.data.maturityLevel.length}</Text>
            <Button
              title={t("Resources.Maturity.button.recalculate")}
              size="sm"
              variant="primary"
              endIcon={<LaunchIcon />}
              extern
              target="_blank"
              to={url}
            />
          </Container>
          <Divider />
          <Heading variant="h3">{t("Resources.Maturity.header2")}</Heading>
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="p-2 text-left">
                  {t("Resources.Maturity.assessmentBlockId")}
                </th>
                <th className="p-2 text-left">
                  {t("Resources.Maturity.value")}
                </th>
                <th className="p-2 text-left">
                  {t("Resources.Maturity.blocks")}
                </th>
                <th className="p-2 text-left">
                  {t("Resources.Maturity.blocksValue")}
                </th>
                <th className="p-2 text-left">
                  {t("Resources.Maturity.recommendations")}
                </th>
              </tr>
            </thead>
            <tbody>
              {getMaturityLevel.data.maturityLevel.map((item, index) => (
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
                        <Text key={index}>{recommendation.label}</Text>
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
          <Text>{t("Resources.Maturity.level")}</Text>
          <Text>{t("Resources.Maturity.noLevel")}</Text>
          <Button
            title={t("Resources.Maturity.button.calculate")}
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

export default ResourcesMaturity;
