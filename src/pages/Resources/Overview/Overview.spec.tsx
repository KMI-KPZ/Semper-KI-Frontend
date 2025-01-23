import { render, screen } from "@test/render";
import ResourcesOverview from "./Overview";

describe("<ResourcesOverview>", () => {
  it("should render", () => {
    render(<ResourcesOverview />);
    expect(screen.getByText("Resources.Overview.header")).toBeInTheDocument();
    expect(screen.getByText("Resources.Overview.text")).toBeInTheDocument();
  });
});
