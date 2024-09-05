import { useTranslation } from "react-i18next";
import { Button } from "@component-library/index";

interface Props {
  text?: string;
}

export const Error: React.FC<Props> = (props) => {
  const { text } = props;
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
      <Button title={t("Error.button")} to="/" />
    </div>
  );
};
