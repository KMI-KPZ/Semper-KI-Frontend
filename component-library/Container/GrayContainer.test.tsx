import { render } from "@testing-library/react";
import GrayContainer, { gradientStyle } from "./GrayContainer";
import "@testing-library/jest-dom";

describe("GrayContainer", () => {
  it("renders without crashing", () => {
    const { container } = render(<GrayContainer>Test</GrayContainer>);
    expect(container).toBeInTheDocument();
  });

  it("applies default className", () => {
    const { container } = render(<GrayContainer>Test</GrayContainer>);
    expect(container.firstChild).toHaveClass(
      "flex items-center flex-col justify-center w-full md:w-fit gap-0 rounded-md p-5"
    );
  });

  it("merges additional className", () => {
    const { container } = render(
      <GrayContainer className="additional-class">Test</GrayContainer>
    );
    expect(container.firstChild).toHaveClass(
      "flex items-center flex-col justify-center w-full md:w-fit gap-0 rounded-md p-5 additional-class"
    );
  });

  it("renders headerChildren when provided", () => {
    const { getByText } = render(
      <GrayContainer headerChildren={<div>Header</div>}>Test</GrayContainer>
    );
    expect(getByText("Header")).toBeInTheDocument();
  });

  it("renders children when open is true", () => {
    const { getByText } = render(
      <GrayContainer open={true}>Test</GrayContainer>
    );
    expect(getByText("Test")).toBeInTheDocument();
  });

  it("does not render children when open is false", () => {
    const { queryByText } = render(
      <GrayContainer open={false}>Test</GrayContainer>
    );
    expect(queryByText("Test")).toBeNull();
  });

  it("applies gradient style", () => {
    const { container } = render(<GrayContainer>Test</GrayContainer>);
    expect(container.firstChild).toHaveStyle(gradientStyle);
  });
});
