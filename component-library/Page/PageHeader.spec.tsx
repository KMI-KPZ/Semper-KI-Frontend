import { render } from "@test/render";
import { PageHeader } from "./PageHeader";

describe("PageHeader", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <PageHeader>
        <h1>Page Title</h1>
      </PageHeader>
    );

    expect(getByText("Page Title")).toBeInTheDocument();
  });
});
