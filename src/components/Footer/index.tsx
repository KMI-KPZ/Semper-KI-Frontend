import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ReactComponent as MastodonIcon } from "@icons/Mastodon.svg";
import {
  URL_Contact,
  URL_Datenschutz,
  URL_Impressum,
  URL_Instagram,
  URL_Mastodon,
} from "@/config/constants";
import { Button } from "@component-library/Button";
import usePing from "@/hooks/usePing";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleOnClickContact = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/contact");
  };

  const { pingQuery } = usePing();

  const magazinIsUp = (): boolean => {
    const up =
      pingQuery.isFetched &&
      pingQuery.data !== undefined &&
      pingQuery.data.up === true;
    return up;
  };

  return (
    <footer className="w-full bg-white shadow-inner ">
      <ul className="flex flex-col items-center md:flex-row md:justify-around">
        <li className="p-2">
          <Button
            variant="light"
            title={t("Legal.imprint")}
            extern={magazinIsUp()}
            to={magazinIsUp() ? URL_Impressum : "/legal/imprint"}
          />
        </li>
        <li className="p-2">
          <Button
            variant="light"
            title={t("Legal.privacy")}
            extern={magazinIsUp()}
            to={magazinIsUp() ? URL_Datenschutz : "/legal/privacy"}
          />
        </li>
        <li className="p-2">
          <Button
            variant="light"
            title={t("Legal.contact")}
            extern={magazinIsUp()}
            to={magazinIsUp() ? URL_Contact : "/legal/contact"}
          />
        </li>
        <li className="flex flex-col items-center justify-center xs:flex-row xs:gap-2 xs:p-2">
          <div className="flex flex-row items-center justify-center gap-2">
            <Button
              title={t("Footer.Footer.instagram")}
              to={URL_Instagram}
              variant="light"
              extern
              children={<InstagramIcon />}
            />
            <Button
              title={t("Footer.Footer.mastodon")}
              to={URL_Mastodon}
              variant="light"
              extern
              children={<MastodonIcon />}
            />
          </div>
          <span className="whitespace-nowrap p-2 font-bold text-grau-400">
            © 2023 Semper-KI
          </span>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
