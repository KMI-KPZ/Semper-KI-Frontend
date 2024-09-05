import { render, screen } from "@test/render";
import { Home } from "./Home";

describe.skip("<Home>", () => {
  it("should render", () => {
    render(<Home />);
    expect(screen.getByTestId("home-anonym")).toBeInTheDocument();
  });
  it("should render anonym Home for anonym user", () => {
    render(<Home />);
    expect(screen.getByTestId("home-anonym-header")).toBeInTheDocument();
    expect(screen.getByTestId("home-anonym-project")).toBeInTheDocument();
    expect(screen.getByTestId("home-anonym-orga")).toBeInTheDocument();
    expect(screen.getByTestId("home-anonym-individual")).toBeInTheDocument();
    expect(screen.getByTestId("home-anonym-magazin")).toBeInTheDocument();
  });
  it.todo("should render homecards for anonym user with items in cart");
  it("should render homecards for USER", () => {
    render(<Home />);
    expect(screen.getByTestId("home-authorized")).toBeInTheDocument();
  });
  it("should render homecards for manufacturer user", () => {
    render(<Home />);
    expect(screen.getByTestId("home-authorized")).toBeInTheDocument();
  });
  it.todo("should render homecards for admin user");
});
