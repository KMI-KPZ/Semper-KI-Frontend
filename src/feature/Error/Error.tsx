import { useNavigate } from "react-router-dom";
import "../../variables.scss";
import { useTranslation } from "react-i18next";

interface Props {
  text?: string;
}

export const Error = ({ text }: Props) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div
      data-testid="Error"
      style={{
        width: "75%",
        textAlign: "center",
        fontSize: "2em",
        margin: "1em auto 1em auto",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "grey",
      }}
    >
      {text && <span data-testid="ErrorMessage">{text}</span>}
      <span data-testid="ErrorMessage">{t("error.text")}</span>
      <a
        data-testid="HomeButton"
        href="/"
        onClick={(e) => {
          e.preventDefault();
          navigate("/");
        }}
        style={{
          textDecoration: "none",
          fontSize: "1em",
          color: "inherit",
          border: "1px solid white",
          borderRadius: "20px",
          maxWidth: "350px",
          marginTop: "20px",
          padding: "20px",
        }}
      >
        {t("error.button")}
      </a>
    </div>
  );
};
