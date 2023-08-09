import { render, screen } from "@test/render";
import { Home } from "./Home";
import { UserType } from "@/hooks/useUser/types";
import { UserBuilder } from "@test/userBuilder";

describe("<Home>", () => {
  it("should render", () => {
    render(<Home user={undefined} />);
    expect(screen.getByTestId("home-anonym")).toBeInTheDocument();
  });
  it("should render anonym Home for anonym user", () => {
    render(<Home user={undefined} />);
    expect(screen.getByTestId("home-anonym-header")).toBeInTheDocument();
    expect(screen.getByTestId("home-anonym-order")).toBeInTheDocument();
    expect(screen.getByTestId("home-anonym-orga")).toBeInTheDocument();
    expect(screen.getByTestId("home-anonym-individual")).toBeInTheDocument();
    expect(screen.getByTestId("home-anonym-magazin")).toBeInTheDocument();
  });
  it.todo("should render homecards for anonym user with items in cart");
  it("should render homecards for USER", () => {
    const user = new UserBuilder().withType(UserType.USER).build();
    render(<Home user={user} />);
    expect(screen.getByTestId("home-order-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-search-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-guide-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-magazin-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-news-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-img-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-portfolio-card")).toBeInTheDocument();
  });
  it.skip("should render homecards for manufacturer user", () => {
    const user = new UserBuilder().withType(UserType.ORGANIZATION).build();
    render(<Home user={user} />);
    expect(screen.getByTestId("home-order-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-search-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-guide-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-magazin-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-news-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-img-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-resources-card")).toBeInTheDocument();
  });
  it.todo("should render homecards for admin user");
});
