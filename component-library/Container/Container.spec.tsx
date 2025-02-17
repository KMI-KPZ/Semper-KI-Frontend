import { render } from "@test/render";
import { Container } from "./Container";

describe("Container", () => {
  it("renders without crashing", () => {
    render(<Container />);
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <Container>
        <div>Child 1</div>
        <div>Child 2</div>
      </Container>
    );

    expect(getByText("Child 1")).toBeInTheDocument();
    expect(getByText("Child 2")).toBeInTheDocument();
  });

  it("applies custom className correctly", () => {
    const { container } = render(<Container className="custom-class" />);
    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("applies direction prop correctly", () => {
    const { container } = render(<Container direction="row" />);
    expect(container.firstChild).toHaveClass("flex-row");
  });

  it("applies justify prop correctly", () => {
    const { container } = render(<Container justify="start" />);
    expect(container.firstChild).toHaveClass("justify-start");
  });

  it("applies align prop correctly", () => {
    const { container } = render(<Container items="center" />);
    expect(container.firstChild).toHaveClass("items-center");
  });

  it("applies wrap prop correctly", () => {
    const { container } = render(<Container wrap="wrap-reverse" />);
    expect(container.firstChild).toHaveClass("flex-wrap-reverse");
  });

  it("applies width prop correctly", () => {
    const { container } = render(<Container width="fit" />);
    expect(container.firstChild).toHaveClass("w-fit");
  });

  it("applies height prop correctly", () => {
    const { container } = render(<Container height="fit" />);
    expect(container.firstChild).toHaveClass("h-fit");
  });

  it("applies gap prop correctly", () => {
    const { container } = render(<Container gap={3} />);
    expect(container.firstChild).toHaveClass("gap-3");
  });
});
