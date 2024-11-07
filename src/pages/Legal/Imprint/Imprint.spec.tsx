import { render, screen } from "@test/render";
import Imprint from "./Imprint";

describe("<Imprint>", () => {
  it("should render without crashing", () => {
    render(<Imprint />);
    expect(screen.getByTestId("imprint")).toBeTruthy();
  });
  it("should have correct default Text", () => {
    render(<Imprint />);
    expect(screen.getByText("Legal.Imprint.heading.main")).toBeInTheDocument();
    expect(screen.getByText("Legal.Imprint.heading.board")).toBeInTheDocument();
  });
});
