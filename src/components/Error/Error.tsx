import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface Props {
  text?: string;
}

export const Error: React.FC<Props> = (props) => {
  const { text } = props;
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      data-testid="Error"
      className="flex flex-col items-center text-center bg-white p-5 gap-5"
    >
      {text && <span data-testid="ErrorMessage">{text}</span>}
      <span data-testid="ErrorMessage">{t("error.text")}</span>
      <a
        className="flex justify-center items-center p-3 shadow-lg hover:bg-gray-300 border"
        data-testid="HomeButton"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        {t("error.button")}
      </a>
    </div>
  );
};
