import { render, screen } from "@test/render";
import ResourcesPostProcessings from "./PostProcessings";

describe("<ResourcesPostProcessings>", () => {
  it("should render", () => {
    render(<ResourcesPostProcessings />);
    expect(
      screen.getByText("Resources.PostProcessings.header")
    ).toBeInTheDocument();
  });
});
