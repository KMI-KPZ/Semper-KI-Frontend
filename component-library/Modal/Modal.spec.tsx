import { render, screen, fireEvent } from "@testing-library/react";
import { Modal } from "./Modal";

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate,
}));

describe.skip("Modal", () => {
  it("renders the modal with the provided title", () => {
    render(
      <Modal title="Test Modal" open={true}>
        LOL
      </Modal>
    );
    const modalTitle = screen.getByText("Test Modal");
    expect(modalTitle).toBeInTheDocument();
  });
  //   it("renders the modal with the provided children", () => {
  //     render(
  //       <Modal title="Test Modal" open={true}>
  //         <div>Modal Content</div>
  //       </Modal>
  //     );
  //     const modalContent = screen.getByText("Modal Content");
  //     expect(modalContent).toBeInTheDocument();
  //   });
  //   it("calls the closeModal function when the close button is clicked", () => {
  //     const closeModalMock = jest.fn();
  //     render(
  //       <Modal title="Test Modal" open={true} closeModal={closeModalMock} />
  //     );
  //     const closeButton = screen.getByTitle("Close");
  //     fireEvent.click(closeButton);
  //     expect(closeModalMock).toHaveBeenCalled();
  //   });
  //   it("does not render the modal when open is false", () => {
  //     render(<Modal title="Test Modal" open={false} />);
  //     const modal = screen.queryByRole("dialog");
  //     expect(modal).not.toBeInTheDocument();
  //   });
});
