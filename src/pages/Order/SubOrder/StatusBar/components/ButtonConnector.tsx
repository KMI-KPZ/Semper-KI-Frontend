import { Button } from "@component-library/Button";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTranslation } from "react-i18next";
interface SubOrderButtonConnectorProps {}

const SubOrderButtonConnector: React.FC<SubOrderButtonConnectorProps> = (
  props
) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`h-14 border-l-2 border-orange-200 md:h-0 md:w-10 md:border-l-0 md:border-t-2`}
      />
      <Button title="Weiter" variant="icon" endIcon={<NavigateNextIcon />} />

      <div
        className={`h-14 border-l-2 border-slate-100 md:h-0 md:w-10 md:border-l-0 md:border-t-2`}
      />
    </>
  );
};

export default SubOrderButtonConnector;
