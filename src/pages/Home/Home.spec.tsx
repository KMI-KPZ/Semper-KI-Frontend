import { render, screen } from "@test/render";
import { Home } from "./Home";
import { UserType } from "@/hooks/useUser/types";

describe("<Home>", () => {
  it("should render", () => {
    render(<Home cartCount={0} userType={UserType.anonym} />);
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });
  it("should render homecards for anonym user", () => {
    render(<Home cartCount={0} userType={UserType.anonym} />);
    expect(screen.getByTestId("start-order-link")).toBeInTheDocument();
    expect(screen.getByTestId("home-search-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-guide-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-magazin-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-news-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-img-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-portfolio-card")).toBeInTheDocument();
  });
  it("should render homecards for anonym user with items in cart", () => {
    render(<Home cartCount={2} userType={UserType.anonym} />);
    expect(screen.getByTestId("home-order-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-search-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-guide-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-magazin-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-news-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-img-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-portfolio-card")).toBeInTheDocument();
  });
  it("should render homecards for client user", () => {
    render(<Home cartCount={0} userType={UserType.client} />);
    expect(screen.getByTestId("home-order-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-search-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-guide-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-magazin-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-news-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-img-card")).toBeInTheDocument();
    expect(screen.getByTestId("home-portfolio-card")).toBeInTheDocument();
  });
  it.skip("should render homecards for manufacturer user", () => {
    render(<Home cartCount={0} userType={UserType.manufacturer} />);
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
