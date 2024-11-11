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
      screen.getByText("Legal.Privacy.privacy-policy")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Legal.Privacy.data-processing-info")
    ).toBeInTheDocument();
  });
});
