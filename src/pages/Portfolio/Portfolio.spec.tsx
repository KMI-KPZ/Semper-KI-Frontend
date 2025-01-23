import { fireEvent, render, screen } from "@test/render";
import Portfolio from "./Portfolio";

describe("<Portfolio />", () => {
  it("should render", () => {
    render(<Portfolio />);
    expect(screen.getByText("Portfolio.header")).toBeInTheDocument();
    expect(screen.getByTestId("portfolio")).toBeInTheDocument();
  });
  it("should render portfolio items", () => {
    render(<Portfolio />);
    expect(screen.getAllByTestId("portfolio-item")).toHaveLength(7);
  });
  it("should scroll to top when button is clicked", () => {
    let scrollToMock = jest.fn();
    window.scrollTo = scrollToMock;
    render(<Portfolio />);
    const button = screen.getByTestId("portfolio-button");
    fireEvent.click(button);
    expect(scrollToMock).toBeCalled();
  });
});
