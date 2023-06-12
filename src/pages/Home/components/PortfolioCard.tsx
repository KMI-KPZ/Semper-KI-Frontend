import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { UserSwitch } from "@/components/UserSwitch";
import { UserType } from "@/hooks/useUser/types";
import { Heading } from "@component-library/Typography";
import { Button } from "@component-library/Button";

interface Props {
  className?: string;
}

type LinkData = {
  title: string;
  link: string;
  usertype: UserType;
};

const links: LinkData[] = [
  {
    title: "Home.HomePortfolioCard.client.information",
    link: "/portfolio?name=use-information",
    usertype: UserType.client,
  },
  {
    title: "Home.HomePortfolioCard.client.produce",
    link: "/portfolio?name=use-produce",
    usertype: UserType.client,
  },
  {
    title: "Home.HomePortfolioCard.client.design",
    link: "/portfolio?name=use-design",
    usertype: UserType.client,
  },
  {
    title: "Home.HomePortfolioCard.client.accompany",
    link: "/portfolio?name=use-accompany",
    usertype: UserType.client,
  },
  {
    title: "Home.HomePortfolioCard.contractor.produce",
    link: "/portfolio?name=provide-produce",
    usertype: UserType.manufacturer,
  },
  {
    title: "Home.HomePortfolioCard.contractor.design",
    link: "/portfolio?name=provide-design",
    usertype: UserType.manufacturer,
  },
  {
    title: "Home.HomePortfolioCard.contractor.accompany",
    link: "/portfolio?name=provide-accompany",
    usertype: UserType.manufacturer,
  },
];

const HomePortfolioCard: React.FC<Props> = (props) => {
  const { className } = props;
  const additionalClassNames = className ?? "";
  const [userType, setUserType] = useState<UserType>(UserType.client);
  const { t } = useTranslation();

  const handleOnClickSwitch = (userType: UserType) => {
    setUserType(userType);
  };

  return (
    <div
      className={`${additionalClassNames}  flex flex-col items-center justify-between gap-5 p-3`}
    >
      <div className="flex w-full flex-col items-center gap-3 overflow-clip">
        <Heading variant="h2">{t("Home.HomePortfolioCard.header")}</Heading>
        <div className="w-full border-t-2" />
        <div
          className={`relative flex h-60 w-full flex-row gap-5 overflow-clip`}
        >
          <div
            className={`absolute flex w-full flex-col gap-1 overflow-clip duration-300 ${
              userType === UserType.client ? "-left-[200%]" : "left-0"
            }`}
          >
            {links
              .filter((link) => link.usertype === UserType.manufacturer)
              .map((link, linkIndex) => (
                <Button
                  variant="outline"
                  align="start"
                  width="auto"
                  title={`${t(link.title)}`}
                  to={link.link}
                  key={linkIndex}
                />
              ))}
          </div>
          <div
            className={`absolute flex w-full flex-col gap-2 overflow-clip duration-300 ${
              userType === UserType.client ? "left-0" : "left-[200%]"
            }`}
          >
            {links
              .filter((link) => link.usertype === UserType.client)
              .map((link, linkIndex) => (
                <Button
                  variant="outline"
                  align="start"
                  width="auto"
                  title={`${t(link.title)}`}
                  to={link.link}
                  key={linkIndex}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-center gap-2">
        <div className="w-full border-t-2" />
        <UserSwitch onClick={handleOnClickSwitch} userType={userType} />
      </div>
    </div>
  );
};

export default HomePortfolioCard;
