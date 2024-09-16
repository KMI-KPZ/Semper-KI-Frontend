import { render } from "@test/render";
import { Background } from "./Background";

describe("Background component", () => {
  it("should render without errors", () => {
    render(<Background />);
  });

  it("should render a div with the correct class", () => {
    const { container } = render(<Background />);
    const backgroundDiv = container.querySelector("div");
    expect(backgroundDiv).toHaveClass(
      "fixed left-0 top-0 -z-10 h-full min-h-[200px] w-full bg-ultramarinblau-dark"
    );
  });
});
