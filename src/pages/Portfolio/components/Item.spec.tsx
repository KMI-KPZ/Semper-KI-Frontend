import { fireEvent, render, screen } from "@test/render";
import PortfolioItem from "./Item";

describe("<PortfolioItem>", () => {
  it("should render", () => {
    render(<PortfolioItem portfolioItem="provide-accompany" preOpen />);
    expect(screen.getByTestId("portfolio-item")).toBeInTheDocument();
  });
  it("should render open with preOpen true", () => {
    render(<PortfolioItem portfolioItem="provide-accompany" preOpen />);
    expect(
      screen.getByText("Portfolio.PortfolioItem.provide-accompany.text")
    ).toBeInTheDocument();
  });
  it("should render closed with preOpen false", () => {
    render(<PortfolioItem portfolioItem="provide-accompany" preOpen={false} />);
    expect(
      screen.queryByText("Portfolio.PortfolioItem.item.text")
    ).not.toBeInTheDocument();
  });
  it("should open item when button is clicked", () => {
    render(<PortfolioItem portfolioItem="provide-accompany" preOpen={false} />);
    expect(
      screen.queryByText("Portfolio.PortfolioItem.provide-accompany.text")
    ).not.toBeInTheDocument();
    const button = screen.getByTestId("portfolio-item-button");
    fireEvent.click(button);
    expect(
      screen.getByText("Portfolio.PortfolioItem.provide-accompany.text")
    ).toBeInTheDocument();
  });
  it("should close item when button is clicked", () => {
    let scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
    render(<PortfolioItem portfolioItem="provide-accompany" preOpen />);
    expect(
      screen.getByText("Portfolio.PortfolioItem.provide-accompany.text")
    ).toBeInTheDocument();
    const button = screen.getByTestId("portfolio-item-button");
    fireEvent.click(button);
    expect(scrollIntoViewMock).toBeCalled();
    expect(
      screen.queryByText("Portfolio.PortfolioItem.item.text")
    ).not.toBeInTheDocument();
  });
});
