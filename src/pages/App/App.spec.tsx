import { render } from "@test/render";
import useUser from "@/hooks/useUser";
import { UserBuilder } from "@test/builder";
import { UserType } from "@/hooks/useUser";
import App from "./App";

describe.skip("<App>", () => {
  it.skip("should render without crashing", () => {
    // render(<App />);
    // expect(true).toBeTruthy();
  });
  it.skip("should render loading while isLoggedInResponse is false", () => {
    // const { getByTestId } = render(<App />);
    // expect(getByTestId("loadingSuspense")).toBeInTheDocument();
  });
  it.skip("should render app when isLoggedInResponse is true, user is defined and there are permissions", () => {
    // jest.mock("@/hooks/useUser", () => {
    //   return () => ({
    //     __esModule: true,
    //     ...useUser,
    //     isLoggedInResponse: true,
    //     isLoggedIn: true,
    //     user: new UserBuilder().withType(UserType.USER).build(),
    //   });
    // });
    // jest.mock("@/hooks/usePermissions", () => {
    //   return () => ({
    //     __esModule: true,
    //     permissionGates: [],
    //     permissions: [],
    //     reloadPermissions: jest.fn(),
    //   });
    // });
    // const { getByTestId } = render(<App />);
    // expect(getByTestId("app")).toBeInTheDocument();
  });
});
