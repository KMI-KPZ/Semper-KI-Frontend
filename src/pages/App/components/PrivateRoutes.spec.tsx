import { render, screen, fireEvent } from "@test/render";
import { UserType } from "@/hooks/useUser/types";
import { UserBuilder } from "@test/userBuilder";
import { AdminRoutes, UserRoutes } from "./PrivateRoutes";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div data-testid="outlet" />,
}));

describe("PrivateRoutes", () => {
  describe("<UserRoutes>", () => {
    it("should render without crashing", () => {
      const user = new UserBuilder().withType(UserType.USER).build();
      render(<UserRoutes user={user} />);
      expect(true).toBeTruthy();
    });
    it("should render Login if user is not defined", () => {
      render(<UserRoutes user={undefined} />);
      expect(screen.getByTestId("login")).toBeInTheDocument();
    });
    it("should render Outlet if user client", () => {
      const user = new UserBuilder().withType(UserType.USER).build();
      render(<UserRoutes user={user} />);
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
    it("should render Error if user is not client", () => {
      const user = new UserBuilder().withType(UserType.ORGANIZATION).build();
      render(<UserRoutes user={user} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
  });
  describe("<PrivateAdminRoutes>", () => {
    it("should render without crashing", () => {
      const user = new UserBuilder().withType(UserType.ADMIN).build();
      render(<AdminRoutes user={user} />);
      expect(true).toBeTruthy();
    });
    it("should render Error if user is not admin", () => {
      const user = new UserBuilder().withType(UserType.USER).build();
      render(<AdminRoutes user={user} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
    it("should render Error if user is not defined", () => {
      render(<AdminRoutes user={undefined} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
    it("should render Outlet if user is admin", () => {
      const user = new UserBuilder().withType(UserType.ADMIN).build();
      render(<AdminRoutes user={user} />);
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
  });
});
