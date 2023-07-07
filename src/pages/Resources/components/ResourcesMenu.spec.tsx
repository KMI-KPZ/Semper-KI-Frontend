import { fireEvent, render, screen } from "@test/render";
import ResourcesMenu from "./ResourcesMenu";

describe("<ResourcesMenu>", () => {
  it("should render", () => {
    render(<ResourcesMenu />);
    expect(screen.getByTestId("resources-menu")).toBeInTheDocument();
  });
  it("should render menu items", () => {
    render(<ResourcesMenu />);
    expect(screen.getAllByTestId("resources-menu-item")).toHaveLength(4);
  });
  it("should have active button", () => {
    const button = screen.getByTitle("Resources.components.Menu.printers");
    fireEvent.click(button);
    expect(
      screen.getByTitle("> Resources.components.Menu.printers")
    ).toBeInTheDocument();
  });
});
