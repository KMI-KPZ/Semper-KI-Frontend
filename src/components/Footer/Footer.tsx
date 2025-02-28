import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as MastodonIcon } from "@icons/Mastodon.svg";
import { URL_LinkedIn, URL_Magazin, URL_Mastodon } from "@/config/constants";
import { Button, Modal } from "@component-library/index";
import ContactForm from "../Form/ContactForm";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import NewspaperIcon from "@mui/icons-material/Newspaper";

interface Props {}

const Footer: React.FC<Props> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);

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
      <footer className="z-20 w-full bg-slate-800 text-white shadow-inner">
        <ul className="flex flex-col items-center md:flex-row md:justify-around">
          <li className="p-2">
            <Button
              variant="tertiary"
              title={t("components.Footer.imprint")}
              to={"/legal/imprint"}
              className=" text-white  hover:bg-slate-700 "
            />
          </li>
          <li className="p-2">
            <Button
              variant="tertiary"
              title={t("components.Footer.privacy")}
              to={"/legal/privacy"}
              className="text-white hover:bg-slate-700 "
            />
          </li>
          <li className="p-2">
            <Button
              variant="tertiary"
              onClick={contactOnClick}
              title={t("components.Footer.contact")}
              className="text-white hover:bg-slate-700 "
            />
          </li>
          <li className="flex flex-col items-center justify-center xs:flex-row xs:gap-2 xs:p-2">
            <div className="flex flex-row items-center justify-center gap-2">
              <Button
                title={t("components.Footer.magazin")}
                to={URL_Magazin}
                variant="tertiary"
                target="_blank"
                extern
                children={<NewspaperIcon />}
                className="text-white hover:bg-slate-700 "
              />
              <Button
                title={t("components.Footer.instagram")}
                to={URL_LinkedIn}
                variant="tertiary"
                target="_blank"
                extern
                children={<LinkedInIcon />}
                className="text-white hover:bg-slate-700 "
              />
              <Button
                title={t("components.Footer.mastodon")}
                to={URL_Mastodon}
                target="_blank"
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
