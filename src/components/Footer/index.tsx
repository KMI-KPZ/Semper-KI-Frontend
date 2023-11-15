import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ReactComponent as MastodonIcon } from "@icons/Mastodon.svg";
import ContactForm from "./ContactForm";
import {
  URL_Contact,
  URL_Datenschutz,
  URL_Impressum,
  URL_Instagram,
  URL_Mastodon,
} from "@/config/constants";
import { Button } from "@component-library/Button";
import Modal from "@component-library/Modal";
import usePing from "@/hooks/usePing";

interface Props {}

const Footer: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const { isMagazineUp } = usePing();

  const handleOnClickContact = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.preventDefault();
    navigate("/contact");
  };

  const contactOnClick = function () {
    setOpen((prevState) => !prevState);
  };

  return (
    <>
      <Modal open={open} closeModal={() => setOpen(false)} title="ContactForm">
        <ContactForm closeEdit={contactOnClick} />
      </Modal>
      <footer className="w-full bg-white shadow-inner ">
        <ul className="flex flex-col items-center md:flex-row md:justify-around">
          <li className="p-2">
            <Button
              variant="light"
              title={t("components.Footer.Footer.imprint")}
              extern={isMagazineUp()}
              to={isMagazineUp() ? URL_Impressum : "/legal/imprint"}
            />
          </li>
          <li className="p-2">
            <Button
              variant="light"
              title={t("components.Footer.Footer.privacy")}
              extern={isMagazineUp()}
              to={isMagazineUp() ? URL_Datenschutz : "/legal/privacy"}
            />
          </li>
          <li className="p-2">
            <Button
              variant="light"
              onClick={contactOnClick}
              title={t("components.Footer.Footer.contact")}
            />
          </li>
          <li className="flex flex-col items-center justify-center xs:flex-row xs:gap-2 xs:p-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <Button
                title={t("components.Footer.Footer.instagram")}
                to={URL_Instagram}
                variant="light"
                extern
                children={<InstagramIcon />}
              />
              <Button
                title={t("components.Footer.Footer.mastodon")}
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
    </>
  );
};

export default Footer;
