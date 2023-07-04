import { render, screen, fireEvent } from "@test/render";
import { PrivateClientRoutes } from "./PrivateRoutes";
import { UserType } from "@/hooks/useUser/types";
import { UserBuilder } from "@test/userBuilder";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div data-testid="outlet" />,
}));

describe("PrivateRoutes", () => {
  describe("<PrivateClientRoutes>", () => {
    it("should render without crashing", () => {
      const user = new UserBuilder().withType(UserType.client).build();
      render(<PrivateClientRoutes user={user} />);
      expect(true).toBeTruthy();
    });
    it("should render Login if user is not defined", () => {
      render(<PrivateClientRoutes user={undefined} />);
      expect(screen.getByTestId("login")).toBeInTheDocument();
    });
    it("should render Outlet if user client", () => {
      const user = new UserBuilder().withType(UserType.client).build();
      render(<PrivateClientRoutes user={user} />);
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
    it("should render Error if user is not client", () => {
      const user = new UserBuilder().withType(UserType.manufacturer).build();
      render(<PrivateClientRoutes user={user} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
  });
});
