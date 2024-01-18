import { render } from "@test/render";
import { Divider } from "./Divider";

describe("Divider", () => {
  it("renders a horizontal divider", () => {
    const { container } = render(<Divider type="horizontal" />);
    expect(container.firstChild).toHaveClass("w-full border-t-2");
  });

  it("renders a vertical divider", () => {
    const { container } = render(<Divider type="vertical" />);
    expect(container.firstChild).toHaveClass("h-full border-l-2");
  });

  it("renders an auto-horizontal divider", () => {
    const { container } = render(<Divider type="auto-horizontal" />);
    const [horizontalDivider, verticalDivider] = container.children;
    expect(horizontalDivider).toHaveClass("block w-full border-t-2 md:hidden");
    expect(verticalDivider).toHaveClass("hidden h-full border-l-2 md:block");
  });

  it("renders an auto-vertical divider", () => {
    const { container } = render(<Divider type="auto-vertical" />);
    const [horizontalDivider, verticalDivider] = container.children;
    expect(horizontalDivider).toHaveClass("hidden w-full border-t-2 md:block");
    expect(verticalDivider).toHaveClass("block h-full border-l-2 md:hidden");
  });
});
