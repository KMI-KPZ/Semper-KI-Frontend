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
      data-testid="error"
      className="flex flex-col items-center gap-5 bg-white p-5 text-center"
    >
      {text !== undefined ? (
        <span data-testid="ErrorMessage">{text}</span>
      ) : (
        <>
          <span data-testid="ErrorMessage">{t("Error.text")}</span>
          <span data-testid="ErrorMessage">{t("Error.text2")}</span>
        </>
      )}
      <a
        className="flex items-center justify-center border p-3 shadow-lg hover:bg-gray-300"
        data-testid="HomeButton"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        {t("Error.button")}
      </a>
    </div>
  );
};
