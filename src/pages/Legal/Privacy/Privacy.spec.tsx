import { render, screen } from "@test/render";
import Privacy from "./Privacy";

describe("<Privacy>", () => {
  it("shoudl render without crashing", () => {
    render(<Privacy />);
    expect(screen.getByTestId("privacy")).toBeInTheDocument();
  });
  it("should have correct default Text", () => {
    render(<Privacy />);
    expect(
      screen.getByText(/Informationen zur Datenverarbeitung für die Webseite/)
    ).toBeInTheDocument();
    expect(screen.getByText("Datenschutzerklärung")).toBeInTheDocument();
  });
});
