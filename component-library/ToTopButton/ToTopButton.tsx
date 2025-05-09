import React from "react";
import { Container } from "@component-library/index";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "react-i18next";

interface ToTopButtonProps {}

const ToTopButton: React.FC<ToTopButtonProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  const [scrolled, setScrolled] = React.useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    if (scrollTop > 50) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOnClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  };
  //   if (scrolled)
  return (
    <a
      className={`${
        scrolled ? "visible opacity-100" : "invisible opacity-0"
      }  flex items-center justify-center rounded-full duration-300 `}
      href="#"
      onClick={handleOnClick}
      title={t("component-library.ToTopButton.button.toTop")}
    >
      <Container className="rounded-full border-2 border-ultramarinblau-dark bg-white p-2 text-black duration-300 hover:bg-ultramarinblau hover:text-white md:p-3">
        <KeyboardArrowUpIcon className="" />
      </Container>
    </a>
  );
};

export default ToTopButton;
