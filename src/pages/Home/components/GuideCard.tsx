import React from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@component-library/Button";
import { Heading } from "@component-library/Typography";
import { UserType } from "@/hooks/useUser/types";
import { Divider } from "@component-library/Divider";

interface Props {
  className?: string;
  userType: UserType;
}

type GuideLinkData = {
  title: string;
  link: string;
  usertype: UserType[];
};
type GuideLinkDataGroup = {
  header: string;
  buttons: GuideLinkData[];
  usertype: UserType[];
};

const guideLinkGoups: GuideLinkDataGroup[] = [
  {
    header: "Home.HomeGuideCard.information.header",
    usertype: [UserType.anonym, UserType.client],
    buttons: [
      {
        title: "Home.HomeGuideCard.information.beginner",
        link: "/guide/beginner",
        usertype: [UserType.anonym, UserType.client],
      },
      {
        title: "Home.HomeGuideCard.information.advanced",
        link: "/guide/advanced",
        usertype: [UserType.anonym, UserType.client],
      },
      {
        title: "Home.HomeGuideCard.information.expert",
        link: "/guide/expert",
        usertype: [UserType.anonym, UserType.client],
      },
    ],
  },
  {
    header: "Home.HomeGuideCard.service.header",
    usertype: [UserType.anonym, UserType.client, UserType.manufacturer],
    buttons: [
      {
        title: "Home.HomeGuideCard.service.use-produce",
        link: "/guide/use-produce",
        usertype: [UserType.anonym, UserType.client],
      },
      {
        title: "Home.HomeGuideCard.service.use-design",
        link: "/guide/use-design",
        usertype: [UserType.anonym, UserType.client],
      },
      {
        title: "Home.HomeGuideCard.service.use-accompany",
        link: "/guide/use-accompany",
        usertype: [UserType.anonym, UserType.client],
      },
      {
        title: "Home.HomeGuideCard.service.provide-produce",
        link: "/guide/use-produce",
        usertype: [UserType.anonym, UserType.manufacturer],
      },
      {
        title: "Home.HomeGuideCard.service.provide-design",
        link: "/guide/use-design",
        usertype: [UserType.anonym, UserType.manufacturer],
      },
      {
        title: "Home.HomeGuideCard.service.provide-accompany",
        link: "/guide/use-accompany",
        usertype: [UserType.anonym, UserType.manufacturer],
      },
    ],
  },
];

const HomeGuideCard: React.FC<Props> = (props) => {
  const { className, userType } = props;
  const additionalClassNames = className ?? "";
  const { t } = useTranslation();

  const getDetailedGuideGroups = () =>
    guideLinkGoups
      .filter((linkGroup) => linkGroup.usertype.includes(userType))
      .map((linkGroup, linkGroupIndex) => (
        <React.Fragment key={linkGroupIndex}>
          <Divider />
          <Heading variant="h3">{t(linkGroup.header)}</Heading>
          {linkGroup.buttons
            .filter((link) => link.usertype.includes(userType))
            .map((link, linkIndex) => (
              <Button
                variant="outline"
                align="start"
                title={t(link.title)}
                to={link.link}
                key={linkIndex}
              />
            ))}
        </React.Fragment>
      ));
  const getGuideGroups = () =>
    guideLinkGoups
      .filter((linkGroup) => linkGroup.usertype.includes(userType))
      .map((linkGroup, linkGroupIndex) => (
        <React.Fragment key={linkGroupIndex}>
          <Divider />
          <Button
            variant="outline"
            size="xl"
            title={t(linkGroup.header)}
            to="/guide"
            key={linkGroupIndex}
            children={<Heading variant="h3">{t(linkGroup.header)}</Heading>}
          />
        </React.Fragment>
      ));

  return (
    <div
      className={`${additionalClassNames}  flex flex-col items-center justify-between gap-3 p-3`}
    >
      <div className="flex w-full flex-col items-center justify-start gap-3">
        <Heading variant="h2">{t("Home.HomeGuideCard.header")}</Heading>
        {userType === UserType.anonym
          ? getGuideGroups()
          : getDetailedGuideGroups()}
      </div>
      <div className="flex w-full flex-col items-center justify-center gap-3">
        <Divider />
        <Button title={t("Home.HomeGuideCard.button.all")} />
      </div>
    </div>
  );
};

export default HomeGuideCard;
