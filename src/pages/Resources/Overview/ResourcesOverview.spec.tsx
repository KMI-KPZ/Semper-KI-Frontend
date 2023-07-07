import { render, screen } from "@test/render";
import ResourcesOverview from "./ResourcesOverview";

describe("<ResourcesOverview>", () => {
  it("should render", () => {
    render(<ResourcesOverview />);
    expect(screen.getByText("Resources.Overview.header")).toBeInTheDocument();
    expect(screen.getByTestId("resources-overview")).toBeInTheDocument();
  });
});
