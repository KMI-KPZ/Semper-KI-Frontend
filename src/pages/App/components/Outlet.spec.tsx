import { render, screen, fireEvent } from "@test/render";
import { UserType } from "@/hooks/useUser/types";
import { UserBuilder } from "@test/userBuilder";
import { AdminOutlet, UserOutlet } from "./Outlet";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Outlet: () => <div data-testid="outlet" />,
}));

describe("PrivateRoutes", () => {
  describe("<UserRoutes>", () => {
    it("should render without crashing", () => {
      const user = new UserBuilder().withType(UserType.USER).build();
      render(<UserOutlet user={user} />);
      expect(true).toBeTruthy();
    });
    it("should render Login if user is not defined", () => {
      render(<UserOutlet user={undefined} />);
      expect(screen.getByTestId("login")).toBeInTheDocument();
    });
    it("should render Outlet if user client", () => {
      const user = new UserBuilder().withType(UserType.USER).build();
      render(<UserOutlet user={user} />);
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
    it("should render Error if user is not client", () => {
      const user = new UserBuilder().withType(UserType.ORGANIZATION).build();
      render(<UserOutlet user={user} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
  });
  describe("<PrivateAdminRoutes>", () => {
    it("should render without crashing", () => {
      const user = new UserBuilder().withType(UserType.ADMIN).build();
      render(<AdminOutlet user={user} />);
      expect(true).toBeTruthy();
    });
    it("should render Error if user is not admin", () => {
      const user = new UserBuilder().withType(UserType.USER).build();
      render(<AdminOutlet user={user} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
    it("should render Error if user is not defined", () => {
      render(<AdminOutlet user={undefined} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
    it("should render Outlet if user is admin", () => {
      const user = new UserBuilder().withType(UserType.ADMIN).build();
      render(<AdminOutlet user={user} />);
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
  });
});
