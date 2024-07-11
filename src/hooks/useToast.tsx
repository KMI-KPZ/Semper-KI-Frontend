import { Button } from "@component-library/index";
import { Text } from "@component-library/index";
import { toast as toastify_toast } from "react-toastify";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export const toast = (title: string, to?: string, onClick?: () => {}): void => {
  toastify_toast(
    <div className="flex flex-col items-center justify-center gap-5">
      <Text variant="body">{title}</Text>
      {to !== undefined ? (
        <Button
          variant="secondary"
          title={to}
          to={to}
          children={<ArrowForwardIcon />}
          onClick={onClick}
        />
      ) : null}
    </div>
  );
};
