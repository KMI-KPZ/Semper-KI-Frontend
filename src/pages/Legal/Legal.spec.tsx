import { render, screen } from "@test/render";
import Legal from "./Legal";

describe("<Legal>", () => {
  it("should render without crashing", () => {
    render(<Legal />);
    expect(screen.getByTestId("legal")).toBeInTheDocument();
  });
  it.todo("should render buttons when path is /legal");
  it.todo("should render legal when  path is /legal/imprint and ping is down");
  it.todo(
    "should render contact when  path is /legal/contact and ping is down"
  );
  it.todo(
    "should render privacy when  path is /legal/privacy and ping is down"
  );
});
