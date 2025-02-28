import { fireEvent, render, screen } from "@test/render";
import ResourcesMenu from "./Menu";

describe("<ResourcesMenu>", () => {
  it("should render", () => {
    render(<ResourcesMenu />);
    expect(screen.getByTestId("resources-menu")).toBeInTheDocument();
  });
  it("should render menu items", () => {
    render(<ResourcesMenu />);
    expect(screen.getAllByTestId("resources-menu-item")).toHaveLength(10);
  });

  it("should have active button", () => {
    render(<ResourcesMenu />);
    const button = screen.getByText("Resources.components.Menu.printers");
    fireEvent.click(button);
    expect(screen.getByText("Resources.components.Menu.printers")).toHaveClass(
      "bg-blau-button border-blau-700"
    );
  });
});
