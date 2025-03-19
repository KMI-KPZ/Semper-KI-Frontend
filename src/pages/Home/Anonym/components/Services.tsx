import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, Text } from "@component-library/index";
import HomeHeader from "./Header";
import MatchingIMG from "@images/home_service_matching.png";
import BenchmarkingIMG from "@images/home_service_benchmarking.png";
import QuestionnaireIMG from "@images/home_service_questionnaire.png";
import ResilienceIMG from "@images/home_service_resilience.png";

interface HomeServicesProps {}

interface HomeServiceItem {
  id: number;
  type: "questionnaire" | "matching" | "benchmarking" | "resilience";
  image: string;
}

const HomeServices: React.FC<HomeServicesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const items: HomeServiceItem[] = [
    {
      id: 0,
      type: "matching",
      image: MatchingIMG,
    },
    {
      id: 1,
      type: "questionnaire",
      image: QuestionnaireIMG,
    },
    {
      id: 2,
      type: "benchmarking",
      image: BenchmarkingIMG,
    },
    {
      id: 3,
      type: "resilience",
      image: ResilienceIMG,
    },
  ];
  const [currentItem, setCurrentItem] = React.useState<HomeServiceItem>(
    items[0]
  );

  return (
    <Container width="full" className="" items="start" direction="col">
      <HomeHeader variant="h2" title={t("Home.Anonym.Services.heading")} />
      <Container width="full" direction="col">
        <Container
          width="full"
          justify="start"
          className="items-center justify-center gap-10 md:items-start md:justify-start "
          items="start"
        >
          <img src={currentItem.image} className="object-cover md:w-3/5 " />
          <Container direction="col" items="start" className="md:w-2/5">
            <Heading
              variant="h3"
              className="text-white transition-all duration-300 "
            >
              {t(`Home.Anonym.Services.items.${currentItem.type}.heading`)}
            </Heading>
            <Text>
              {t(`Home.Anonym.Services.items.${currentItem.type}.text`)}
            </Text>
          </Container>
        </Container>
        <Container width="full" direction="row">
          {items.map((item, index) => (
            <a
              href="#"
              tabIndex={0}
              key={index}
              className="h-10 flex-1 hover:cursor-pointer"
              style={{
                backgroundImage:
                  currentItem.id === item.id
                    ? "radial-gradient(#21fefe  2px, transparent 1px)"
                    : "radial-gradient(#729C9C  2px, transparent 1px)",
                backgroundSize: "10px 10px",
              }}
              onClick={(e) => {
                e.preventDefault();
                setCurrentItem(item);
              }}
            />
          ))}
        </Container>
      </Container>
    </Container>
  );
};

export default HomeServices;
