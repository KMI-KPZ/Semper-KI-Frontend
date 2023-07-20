import { render, screen, fireEvent } from "@test/render";
import {
  PrivateClientRoutes,
  PrivateAdminRoutes,
  PrivateManufacturerRoutes,
  PrivateRoutes,
} from "./PrivateRoutes";
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
  describe("<PrivateManufacturerRoutes>", () => {
    it("should render without crashing", () => {
      const user = new UserBuilder().withType(UserType.manufacturer).build();
      render(<PrivateManufacturerRoutes user={user} />);
      expect(true).toBeTruthy();
    });
    it("should render Login if user is not defined", () => {
      render(<PrivateManufacturerRoutes user={undefined} />);
      expect(screen.getByTestId("login")).toBeInTheDocument();
    });
    it("should render Outlet if user manufacturer", () => {
      const user = new UserBuilder().withType(UserType.manufacturer).build();
      render(<PrivateManufacturerRoutes user={user} />);
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
    it("should render Error if user is not manufacturer", () => {
      const user = new UserBuilder().withType(UserType.client).build();
      render(<PrivateManufacturerRoutes user={user} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
  });
  describe("<PrivateAdminRoutes>", () => {
    it("should render without crashing", () => {
      render(<PrivateAdminRoutes userType={UserType.admin} />);
      expect(true).toBeTruthy();
    });
    it("should render Error if user is not admin", () => {
      render(<PrivateAdminRoutes userType={UserType.client} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
    it("should render Error if user is not defined", () => {
      render(<PrivateAdminRoutes userType={undefined} />);
      expect(screen.getByTestId("error")).toBeInTheDocument();
    });
    it("should render Outlet if user is admin", () => {
      render(<PrivateAdminRoutes userType={UserType.admin} />);
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
  });
  describe("<PrivateRoutes>", () => {
    it("should render without crashing", () => {
      render(<PrivateRoutes />);
      expect(true).toBeTruthy();
    });
    it("should render Login if user is not defined", () => {
      render(<PrivateRoutes user={undefined} />);
      expect(screen.getByTestId("login")).toBeInTheDocument();
    });
    it("should render Outlet if user is defined", () => {
      const user = new UserBuilder().build();
      render(<PrivateRoutes user={user} />);
      expect(screen.getByTestId("outlet")).toBeInTheDocument();
    });
  });
});
