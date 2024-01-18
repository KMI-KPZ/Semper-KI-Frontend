import { render } from "@test/render";
import { ErrorView } from "./Error";
import { ErrorType } from "@/types/general";

describe("ErrorView", () => {
  it("renders errors correctly", () => {
    const errors: ErrorType[] = ["empty", "incomplete"];
    const itemName = "item";

    const { getByText } = render(
      <ErrorView errors={errors} itemName={itemName} />
    );

    errors.forEach((error) => {
      const errorText = getByText(`component-library.Error.${error}`, {
        exact: false,
      });
      expect(errorText).toBeInTheDocument();
    });
  });
});
