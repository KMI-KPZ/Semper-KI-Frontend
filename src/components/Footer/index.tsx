import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InstagramIcon from "@mui/icons-material/Instagram";
import { ReactComponent as MastodonIcon } from "@icons/Mastodon.svg";
import {
  URL_Contact,
  URL_Datenschutz,
  URL_Impressum,
  URL_Instagram,
  URL_LinkedIn,
  URL_Mastodon,
} from "@/config/constants";
import { Button, Modal } from "@component-library/index";
import usePing from "@/hooks/usePing";
import ContactForm from "../Form/ContactForm";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

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
      <Modal
        open={open}
        closeModal={() => setOpen(false)}
        modalKey="ContactForm"
      >
        <ContactForm closeEdit={() => setOpen(false)} />
      </Modal>
      <footer className="w-full bg-slate-800 text-white shadow-inner ">
        <ul className="flex flex-col items-center md:flex-row md:justify-around">
          <li className="p-2">
            <Button
              variant="tertiary"
              title={t("components.Footer.Footer.imprint")}
              extern={isMagazineUp()}
              to={isMagazineUp() ? URL_Impressum : "/legal/imprint"}
              className=" text-white  hover:bg-slate-700 "
            />
          </li>
          <li className="p-2">
            <Button
              variant="tertiary"
              title={t("components.Footer.Footer.privacy")}
              extern={isMagazineUp()}
              to={isMagazineUp() ? URL_Datenschutz : "/legal/privacy"}
              className="text-white hover:bg-slate-700 "
            />
          </li>
          <li className="p-2">
            <Button
              variant="tertiary"
              onClick={contactOnClick}
              title={t("components.Footer.Footer.contact")}
              className="text-white hover:bg-slate-700 "
            />
          </li>
          <li className="flex flex-col items-center justify-center xs:flex-row xs:gap-2 xs:p-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <Button
                title={t("components.Footer.Footer.instagram")}
                to={URL_LinkedIn}
                variant="tertiary"
                extern
                children={<LinkedInIcon />}
                className="text-white hover:bg-slate-700 "
              />
              <Button
                title={t("components.Footer.Footer.mastodon")}
                to={URL_Mastodon}
                variant="tertiary"
                extern
                children={<MastodonIcon />}
                className="text-white hover:bg-slate-700 "
              />
            </div>
            <span className="whitespace-nowrap p-2 font-bold">
              © 2023 Semper-KI
            </span>
          </li>
        </ul>
      </footer>
    </>
  );
};

export default Footer;
