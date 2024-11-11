import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Heading, Text } from "@component-library/index";
import HomeHeader from "./Header";
import YouTube from "react-youtube";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import HomeButton from "./Button";

interface HomeTutorialProps {}

interface TutorialItem {
  id: number;
  id2: number;
  title: string;
  description: string;
}

const HomeTutorial: React.FC<HomeTutorialProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const tutorialItems: TutorialItem[] = [
    {
      id: 1,
      id2: 1,
      title: t("Home.Anonym.Tutorial.items.0.heading"),
      description: t("Home.Anonym.Tutorial.items.0.text"),
    },
    {
      id: 3,
      id2: 2,
      title: t("Home.Anonym.Tutorial.items.2.heading"),
      description: t("Home.Anonym.Tutorial.items.2.text"),
    },
    {
      id: 2,
      id2: 3,
      title: t("Home.Anonym.Tutorial.items.1.heading"),
      description: t("Home.Anonym.Tutorial.items.1.text"),
    },
    {
      id: 4,
      id2: 4,
      title: t("Home.Anonym.Tutorial.items.3.heading"),
      description: t("Home.Anonym.Tutorial.items.3.text"),
    },
  ];

  const sortItemsID = (a: TutorialItem, b: TutorialItem) => {
    return a.id - b.id;
  };
  const sortItmesID2 = (a: TutorialItem, b: TutorialItem) => {
    return a.id2 - b.id2;
  };

  return (
    <Container width="full" className="gap-10" align="start" direction="col">
      <HomeHeader variant="h2" title={t("Home.Anonym.Tutorial.heading")} />
      <Text>{t("Home.Anonym.Tutorial.subTitle")}</Text>
      <Container width="full">
        <YouTube
          iframeClassName={`duraction-300 w-full md:max-w-[800px]  aspect-video`}
          videoId="8bHHlqdYds8"
          className={`flex h-full w-full items-center justify-center`}
        />
      </Container>
      <Container
        width="full"
        className="flex-nowrap gap-0 gap-y-10 p-5 md:hidden md:flex-wrap md:p-5"
        wrap="wrap"
      >
        {tutorialItems.sort(sortItemsID).map((item, index) => (
          <Container
            key={index}
            className={`relative px-10`}
            width="none"
            direction="col"
          >
            <Heading variant="h3" className="w-full hyphens-auto text-white">
              {item.title}
            </Heading>
            <Text>{item.description}</Text>
            <Text className="text-bold absolute left-0 top-0  text-2xl text-türkis ">
              {item.id}
            </Text>
          </Container>
        ))}
      </Container>
      <Container
        width="full"
        className="hidden flex-nowrap gap-0 gap-y-10 md:flex md:flex-wrap"
        wrap="wrap"
      >
        {tutorialItems.sort(sortItmesID2).map((item, index) => (
          <Container
            key={index}
            className={`relative w-1/2 px-10`}
            width="none"
            direction="col"
          >
            <Heading variant="h3" className="w-full hyphens-auto text-white">
              {item.title}
            </Heading>
            <Text>{item.description}</Text>
            <Text className="text-bold absolute left-0 top-0 block text-2xl text-türkis">
              {item.id}
            </Text>
          </Container>
        ))}
      </Container>
      <Container
        width="full"
        justify="center"
        className=" lg:pr-30 justify-center md:justify-end md:pr-20"
        direction="row"
      >
        <HomeButton
          text={t("Home.Anonym.Tutorial.button")}
          icon={<ContactSupportIcon />}
          to="/projects"
        />
      </Container>
    </Container>
  );
};

export default HomeTutorial;
