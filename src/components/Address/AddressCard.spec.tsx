import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom/extend-expect";
import AddressCard from "./AddressCard";
import { UserAddressProps } from "@/hooks/useUser";

// Mock HTMLDialogElement methods which aren't implemented in JSDOM
HTMLDialogElement.prototype.showModal = jest.fn();
HTMLDialogElement.prototype.close = jest.fn();

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("@/api/User/Mutations/useUpdateUser", () => () => ({
  mutate: jest.fn(),
}));

jest.mock("@/api/Organization/Mutations/useUpdateOrganization", () => () => ({
  mutate: jest.fn(),
}));

const mockAddress: UserAddressProps = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  company: "Company",
  street: "Street",
  houseNumber: 123,
  zipcode: "12345",
  city: "City",
  country: "Country",
  standard: true,
  coordinates: [1, 1],
};

const handleOnClickCard = jest.fn();

describe("AddressCard", () => {
  it("renders correctly", () => {
    render(
      <MemoryRouter>
        <AddressCard address={mockAddress} />
      </MemoryRouter>
    );

    expect(
      screen.getByText("components.Address.AddressCard.name")
    ).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Company")).toBeInTheDocument();
    expect(screen.getByText("Street 123")).toBeInTheDocument();
    expect(screen.getByText("12345 City")).toBeInTheDocument();
    expect(screen.getByText("Country")).toBeInTheDocument();
    expect(
      screen.getByText("components.Address.AddressCard.yes")
    ).toBeInTheDocument();
  });
});

describe("AddressCard", () => {
  it("handles edit button click", () => {
    render(
      <MemoryRouter>
        <AddressCard address={mockAddress} />
      </MemoryRouter>
    );

    const editButton = screen.getByText("general.button.edit");
    fireEvent.click(editButton);

    expect(
      screen.getByText("components.Address.AddressCard.name")
    ).toBeInTheDocument();
  });

  it("handles delete button click", () => {
    window.confirm = jest.fn(() => true);
    render(
      <MemoryRouter>
        <AddressCard address={mockAddress} />
      </MemoryRouter>
    );

    const deleteButton = screen.getByText("general.button.delete");
    fireEvent.click(deleteButton);

    expect(window.confirm).toHaveBeenCalledWith(
      "components.Address.AddressCard.confirmDelete"
    );
  });

  it("handles checkbox click", () => {
    render(
      <MemoryRouter>
        <AddressCard
          address={mockAddress}
          select={{ checked: false, handleOnClickCard }}
        />
      </MemoryRouter>
    );

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    expect(handleOnClickCard).toHaveBeenCalledWith(mockAddress);
  });
});
