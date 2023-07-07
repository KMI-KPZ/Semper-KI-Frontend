import { render, screen } from "@test/render";
import ResourcesPostProcessings from "./ResourcesPostProcessings";

describe("<ResourcesPostProcessings>", () => {
  it("should render", () => {
    render(<ResourcesPostProcessings />);
    expect(
      screen.getByText("Resources.PostProcessings.header")
    ).toBeInTheDocument();
    expect(
      screen.getByTestId("resources-post-processings")
    ).toBeInTheDocument();
  });
});
