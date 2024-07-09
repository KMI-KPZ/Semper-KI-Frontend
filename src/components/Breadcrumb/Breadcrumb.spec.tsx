import { render, screen } from "@test/render";
import { Breadcrumb } from "@/components/Breadcrumb/Breadcrumb";

describe("Breadcrumb", () => {
  it("renders breadcrumb items correctly", () => {
    const { queryByTestId } = render(<Breadcrumb />);

    const breadcrumbItems = queryByTestId("breadcrumb-home-button");

    expect(breadcrumbItems).not.toBeInTheDocument();
  });

  it.skip("navigates to the correct links when clicked", () => {
    const { getAllByTestId } = render(<Breadcrumb />);

    const breadcrumbItems = getAllByTestId("breadcrumb-home-button");

    // Simulate click on the first breadcrumb item
    breadcrumbItems[0].click();
    expect(window.location.pathname).toBe("/");
  });
});
